import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head>
                <title>Hajir HR Support - Next-Gen Platform</title>
                <meta
                    name="description"
                    content="The ultimate multi-tenant ticketing platform for modern businesses."
                />
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                    body {
                        font-family: 'Outfit', sans-serif;
                        background-color: #020617; /* slate-950 */
                        color: #f8fafc; /* slate-50 */
                        overflow-x: hidden;
                    }
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                    }
                    .animated-gradient {
                        background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
                        background-size: 200% 200%;
                        animation: gradient-shift 5s ease infinite;
                    }
                    @keyframes gradient-shift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .glow {
                        box-shadow: 0 0 40px rgba(139, 92, 246, 0.2);
                    }
                    `}
                </style>
            </Head>

            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[150px] mix-blend-screen" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-600/10 blur-[120px] mix-blend-screen" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Navbar */}
                <header className="px-6 py-6 lg:px-12 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center glow">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-wide">
                            Hajir HR Support
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium text-sm"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="px-5 py-2.5 rounded-full hover:bg-white/5 transition-all font-medium text-sm"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                            v2.0 Beta is Live
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
                        Hajir HR Support that defies{" "}
                        <span className="text-transparent bg-clip-text animated-gradient">
                            Gravity
                        </span>
                        .
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
                        The ultra-fast, multi-tenant ticketing system built for
                        modern teams. Consolidate widgets, calls, and chats into
                        one beautiful dashboard.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {!auth.user && (
                            <Link
                                href={route("register")}
                                className="w-full sm:w-auto px-8 py-4 rounded-full animated-gradient text-white font-semibold text-lg hover:opacity-90 transition-all glow transform hover:scale-105"
                            >
                                Start Free Trial
                            </Link>
                        )}
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-medium text-lg transition-all"
                        >
                            Explore Features
                        </a>
                    </div>
                </main>

                {/* Features Grid */}
                <section
                    id="features"
                    className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Omnichannel Widgets",
                                desc: "Deploy interactive support widgets via a simple script tag. Connect live chat, calls, and standard tickets instantly.",
                                icon: (
                                    <svg
                                        className="w-6 h-6 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: "Real-time Voice",
                                desc: "WebRTC and Laravel Echo powered voice calls straight from the browser. Recordings automatically attached to tickets.",
                                icon: (
                                    <svg
                                        className="w-6 h-6 text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: "Multi-Tenant Architecture",
                                desc: "Securely siloed data for every organization using UUIDs and robust tenant scopes on a blazing fast Laravel Octane backend.",
                                icon: (
                                    <svg
                                        className="w-6 h-6 text-pink-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                ),
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500 glass-panel mt-auto">
                    <p>
                        &copy; {new Date().getFullYear()} Hajir HR Support.
                        All rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
