
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User, Transaction } = require('../db');
const { default: mongoose } = require('mongoose');
const zod = require("zod");

const router = express.Router();

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number().positive()
});

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { success } = transferBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const { amount, to } = req.body;
    const session = await mongoose.startSession();

    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account || account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toUser = await User.findOne({
            $or: [{ username: to }, { email: to }]
        });

        if (!toUser) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        const toAccount = await Account.findOne({ userId: toUser._id });

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Attempt transaction if supported, otherwise use atomic operations
        try {
            session.startTransaction();
            await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: toUser._id }, { $inc: { balance: amount } }).session(session);
            await Transaction.create([
                { userId: req.userId, toUserId: toUser._id, amount, type: 'transfer' },
                { userId: toUser._id, toUserId: req.userId, amount, type: 'receive' }
            ], { session });
            await session.commitTransaction();
        } catch (transactionError) {
            console.warn("Transaction not supported or failed, falling back to atomic updates:", transactionError.message);

            // Fallback: Atomic updates without session
            await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
            await Account.updateOne({ userId: toUser._id }, { $inc: { balance: amount } });
            await Transaction.create([
                { userId: req.userId, toUserId: toUser._id, amount, type: 'transfer' },
                { userId: toUser._id, toUserId: req.userId, amount, type: 'receive' }
            ]);
        }

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error('Transfer error:', error);
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        res.status(500).json({
            message: "Transfer failed due to server error"
        });
    } finally {
        session.endSession();
    }
});

router.get("/transactions", authMiddleware, async (req, res) => {
    const transactions = await Transaction.find({
        userId: req.userId
    }).sort({ timestamp: -1 });

    res.json({
        transactions
    });
});

module.exports = router;