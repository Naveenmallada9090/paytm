import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../assets/components/BottomWarning"
import { Button } from "../assets/components/Button"
import { Heading } from "../assets/components/Heading"
import { InputBox } from "../assets/components/InputBox"
import { SubHeading } from "../assets/components/SubHeading"
import { Signup } from "./Signup";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 w-full max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                </div>
                <div className="space-y-4">
                    <InputBox
                        placeholder="harkirat@gmail.com"
                        label={"Email"}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputBox
                        placeholder="123456"
                        label={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="pt-2">
                    <Button label={"Sign in"} onClick={handleSignin} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
            </div>
        </div>
    );
}