import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heading } from "../assets/components/heading";
import { Button } from "../assets/components/Button";

export const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/transactions`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setTransactions(response.data.transactions);
        })
        .catch(e => console.error("Error fetching transactions:", e));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Heading label="Transaction History" />
                    <Button
                        label="Back to Dashboard"
                        onClick={() => navigate("/dashboard")}
                        className="w-auto px-4"
                    />
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                    {transactions.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                            No transactions found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-slate-500 text-sm border-b border-slate-100">
                                        <th className="pb-4 font-medium">Date</th>
                                        <th className="pb-4 font-medium">Type</th>
                                        <th className="pb-4 font-medium">Amount</th>
                                        <th className="pb-4 font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {transactions.map((t, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 text-slate-600 text-sm">
                                                {new Date(t.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.type === 'transfer' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    {t.type === 'transfer' ? 'Sent' : 'Received'}
                                                </span>
                                            </td>
                                            <td className={`py-4 font-semibold ${t.type === 'transfer' ? 'text-red-500' : 'text-emerald-600'}`}>
                                                {t.type === 'transfer' ? '-' : '+'} Rs {t.amount}
                                            </td>
                                            <td className="py-4 text-right text-slate-400 text-sm">
                                                Completed
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}