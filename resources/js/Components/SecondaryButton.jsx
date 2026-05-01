export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-lg border border-blue-gray-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-gray-700 shadow-sm transition-all hover:bg-blue-gray-50 focus:outline-none disabled:opacity-25 ${
                    disabled && "pointer-events-none"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
