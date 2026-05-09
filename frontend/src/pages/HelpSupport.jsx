import { useNavigate } from "react-router-dom";
import { Heading } from "../assets/components/heading";
import { Button } from "../assets/components/Button";

export const HelpSupport = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 w-full max-w-2xl text-center space-y-8">
                <div className="space-y-2">
                    <Heading label="Help & Support" />
                    <p className="text-slate-500">How can we help you today?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <h4 className="font-bold text-slate-800">Payment Issues</h4>
                        <p className="text-sm text-slate-500">Facing issues with transfers or balance updates? Our team is here to help.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <h4 className="font-bold text-slate-800">Account Security</h4>
                        <p className="text-sm text-slate-500">Need to change your password or secure your account? Check our guide.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <h4 className="font-bold text-slate-800">General Inquiry</h4>
                        <p className="text-sm text-slate-500">Have questions about the app? Contact our support team.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <h4 className="font-bold text-slate-800">Technical Support</h4>
                        <p className="text-sm text-slate-500">Reporting a bug or technical glitch in the application.</p>
                    </div>
                </div>

                <div className="pt-4">
                    <Button label="Contact Support Team" onClick={() => alert("Support ticket submitted! We will contact you soon.")} />
                    <Button
                        label="Back to Dashboard"
                        onClick={() => navigate("/dashboard")}
                        className="bg-slate-200 text-slate-600 hover:bg-slate-300"
                    />
                </div>
            </div>
        </div>
    );
}