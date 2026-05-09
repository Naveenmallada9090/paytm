
export function Button({label, onClick}) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2"
        >
            {label}
        </button>
    );
}