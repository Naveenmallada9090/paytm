import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heading } from "../assets/components/heading";
import { SubHeading } from "../assets/components/SubHeading";
import { InputBox } from "../assets/components/InputBox";
import { Button } from "../assets/components/Button";

export const ProfileSettings = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            await axios.put("https://paytm-1-wh6a.onrender.com/api/v1/user/", {
                firstName,
                lastName,
                password
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Profile updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Error updating profile: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 w-full max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <Heading label="Profile Settings" />
                    <SubHeading label="Update your personal information" />
                </div>
                <div className="space-y-4">
                    <InputBox
                        label="First Name"
                        placeholder="John"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                        label="Last Name"
                        placeholder="Doe"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox
                        label="New Password (Optional)"
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="pt-2 flex flex-col space-y-3">
                    <Button label="Save Changes" onClick={handleUpdate} />
                    <Button
                        label="Cancel"
                        onClick={() => navigate("/dashboard")}
                        className="bg-slate-200 text-slate-600 hover:bg-slate-300"
                    />
                </div>
            </div>
        </div>
    );
}