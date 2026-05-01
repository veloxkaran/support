export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-500 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:shadow-lg focus:bg-blue-600 active:bg-blue-700 disabled:opacity-25 ${
                    disabled && "pointer-events-none"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
