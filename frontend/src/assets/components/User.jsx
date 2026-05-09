import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/bulk?filter=` + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
                <div className="font-bold text-xl text-slate-800">
                    Users
                </div>
                <div className="w-full max-w-xs">
                    <input
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {users.map(user => <UserItem user={user} key={user._id} />)}
            </div>
        </div>
    );
}

function UserItem({user}) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
            <div className="flex items-center space-x-3">
                <div className="rounded-full h-12 w-12 bg-emerald-100 flex items-center justify-center border border-emerald-200 text-emerald-700 font-bold text-lg">
                    {user.firstName[0]}
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-slate-700">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-slate-400">
                        {user.username}
                    </div>
                </div>
            </div>

            <Button
                onClick={() => {
                    navigate("/send?id=" + user.username + "&name=" + user.firstName);
                }}
                label={"Send Money"}
                className="w-auto px-4 py-1.5"
            />
        </div>
    );
}