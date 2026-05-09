export const Balance = ({ value }) => {
    return (
        <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="font-medium text-slate-600 text-lg">
                Your Current Balance
            </div>
            <div className="font-bold text-emerald-700 text-2xl">
                Rs {value}
            </div>
        </div>
    );
}