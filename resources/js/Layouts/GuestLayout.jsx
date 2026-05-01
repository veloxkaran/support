import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Card, Typography } from "@material-tailwind/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-blue-gray-50/50 pt-6 sm:justify-center sm:pt-0">
            <div className="mb-10">
                <Link href="/" className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/40 flex items-center justify-center text-white">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <Typography
                        variant="h4"
                        color="blue-gray"
                        className="font-black uppercase tracking-tighter"
                    >
                        Customer Support
                    </Typography>
                </Link>
            </div>

            <Card className="w-full sm:max-w-md p-8 border border-blue-gray-100 shadow-sm">
                {children}
            </Card>
        </div>
    );
}
