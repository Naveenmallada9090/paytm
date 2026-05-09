import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Heading } from '../assets/components/heading';
import { SubHeading } from '../assets/components/SubHeading';
import { InputBox } from '../assets/components/InputBox';
import { Button } from '../assets/components/Button';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const recipientUsername = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");

    const handleTransfer = () => {
        console.log("recipientUsername:", recipientUsername, "amount:", amount);
        if (!recipientUsername) {
            alert("Recipient not found");
            return;
        }
        if (!amount) {
            alert("Amount is required");
            return;
        }
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
            alert("Amount must be a valid number");
            return;
        }
        if (numAmount <= 0) {
            alert("Amount must be positive");
            return;
        }
        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: recipientUsername,
            amount: numAmount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            alert("Transfer successful");
        })
        .catch((error) => {
            console.error(error);
            alert("Transfer failed: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center space-y-2">
                    <Heading label="Send Money" />
                    <SubHeading label="Transfer funds securely to your contact" />
                </div>

                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                        <span className="text-3xl font-bold text-white">
                            {name ? name[0].toUpperCase() : 'U'}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700">{name}</h3>
                </div>

                <div className="space-y-6">
                    <InputBox
                        label="Amount (in Rs)"
                        placeholder="0.00"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button label="Initiate Transfer" onClick={handleTransfer} />
                </div>
            </div>
        </div>
    );
}