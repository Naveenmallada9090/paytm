import { useState } from "react"
import { BottomWarning } from "../assets/components/BottomWarning"
import { Button } from "../assets/components/Button"
import { Heading } from "../assets/components/heading"
import { InputBox } from "../assets/components/InputBox"
import { SubHeading } from "../assets/components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 w-full max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                </div>
                <div className="space-y-4">
                    <InputBox onChange={e => {
                        setFirstName(e.target.value);
                    }} placeholder="John" label={"First Name"} />
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value);
                    }} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={e => {
                        setUsername(e.target.value);
                    }} placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                </div>
                <div className="pt-2">
                    <Button onClick={async () => {
                        const response = await axios.post("https://paytm-1-wh6a.onrender.com/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    );
}