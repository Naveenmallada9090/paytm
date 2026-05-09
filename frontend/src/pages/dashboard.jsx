import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../assets/components/Appbar"
import { Balance } from "../assets/components/Balance"
import { Users} from "../assets/components/User"

export const Dashboard = () => {
    const [balance, setBalance] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setBalance(response.data.balance.toLocaleString());
        })
        .catch(e => console.error("Error fetching balance:", e));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Appbar />
            <div className="max-w-6xl mx-auto p-6 space-y-8">
                <div className="flex flex-col items-center justify-center pt-8">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                        <div className="mb-4">
                            <h2 className="text-slate-500 text-sm font-medium">Account Overview</h2>
                        </div>
                        <Balance value={balance} />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
                        <Users />
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4">
                        <h3 className="font-bold text-slate-800 text-lg">Quick Actions</h3>
                        <div className="space-y-2">
                            <div onClick={() => navigate("/transactions")} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm hover:bg-slate-100 cursor-pointer transition-colors">
                                View Transaction History
                            </div>
                            <div onClick={() => navigate("/profile")} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm hover:bg-slate-100 cursor-pointer transition-colors">
                                Profile Settings
                            </div>
                            <div onClick={() => navigate("/help")} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm hover:bg-slate-100 cursor-pointer transition-colors">
                                Help & Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}