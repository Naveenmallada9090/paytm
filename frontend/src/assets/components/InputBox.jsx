export function InputBox({label, placeholder, onChange}) {
    return (
        <div className="space-y-1">
            <div className="text-sm font-semibold text-slate-600 text-left py-1">
                {label}
            </div>
            <input
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
        </div>
    );
}