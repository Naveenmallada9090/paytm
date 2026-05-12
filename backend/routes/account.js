
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
    const session = await mongoose.startSession();

    try {
        const { success } = transferBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

        session.startTransaction();
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toUser = await User.findOne({ username: to }).session(session);

        if (!toUser) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        const toAccount = await Account.findOne({ userId: toUser._id }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: toUser._id }, { $inc: { balance: amount } }).session(session);

        // Create transaction records
        await Transaction.create([
            {
                userId: req.userId,
                toUserId: toUser._id,
                amount,
                type: 'transfer'
            },
            {
                userId: toUser._id,
                toUserId: req.userId,
                amount,
                type: 'receive'
            }
        ], { session });

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error('Transfer error:', error);
        await session.abortTransaction();
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