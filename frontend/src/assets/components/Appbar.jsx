export const Appbar = () => {
    return (
        <div className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div className="flex flex-col justify-center h-full">
                <span className="text-emerald-600 font-bold text-xl tracking-tight">PayTM App</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden sm:flex flex-col justify-center h-full text-slate-600 font-medium">
                    Hello
                </div>
                <div className="rounded-full h-10 w-10 bg-emerald-100 flex items-center justify-center border border-emerald-200">
                    <div className="flex flex-col justify-center h-full text-emerald-700 font-bold text-lg">
                        U
                    </div>
                </div>
            </div>
        </div>
    );
}