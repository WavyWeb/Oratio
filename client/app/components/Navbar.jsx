"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { User, LogOut, ChevronRight, Settings } from "lucide-react";

// Reusable NavLink component
const NavLink = ({ children, icon, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-600 rounded-lg hover:bg-gray-50 hover:text-slate-900 transition-colors duration-200 group"
    >
        <span className="flex-shrink-0 p-1.5 rounded-lg bg-gray-100 group-hover:bg-amber-600/20 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
        </span>
        <span className="font-medium">{children}</span>
    </button>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem("username") || "User");
            setEmail(localStorage.getItem("email") || "");
        } else {
            setIsLoggedIn(false);
        }
    }, [pathname]);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
        }
        router.push('/login');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const scrollToSection = (id) => {
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
            }
        } else {
            router.push(`/#${id}`);
            setMenuOpen(false);
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileOpen && !event.target.closest('.profile-dropdown')) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileOpen]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || pathname !== '/' ? 'bg-white/95 backdrop-blur-md py-2 shadow-xl border-b border-gray-200' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <Image
                                    src="/logo1.png"
                                    alt="Oratio Logo"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-600 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
                                Oratio
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {pathname === '/' && !isLoggedIn && (
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <button
                                    onClick={() => scrollToSection("features")}
                                    className="text-gray-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Features
                                </button>
                                <button
                                    onClick={() => scrollToSection("how-it-works")}
                                    className="text-gray-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    How It Works
                                </button>
                                <button
                                    onClick={() => scrollToSection("testimonials")}
                                    className="text-gray-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Testimonials
                                </button>
                            </div>
                        </div>
                    )}

                    {isLoggedIn && (
                        <div className="hidden md:flex items-center space-x-8 ml-10">
                            <Link href="/dashboard" className={`text-sm font-medium transition-colors duration-200 ${pathname === '/dashboard' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'}`}>
                                Dashboard
                            </Link>
                            <Link href="/allreports" className={`text-sm font-medium transition-colors duration-200 ${pathname === '/allreports' ? 'text-slate-900' : 'text-gray-600 hover:text-slate-900'}`}>
                                Reports
                            </Link>
                        </div>
                    )}

                    <div className="hidden md:flex items-center space-x-6">
                        {isLoggedIn ? (
                            <div className="relative profile-dropdown">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-semibold shadow-lg">
                                        {username ? username.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-medium text-slate-800 max-w-[100px] truncate">{username}</p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-90' : ''}`} />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                                        <div className="p-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-slate-900">{username}</p>
                                            <p className="text-xs text-gray-500 truncate">{email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link href="/profile" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                                                <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-amber-400" />
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg group transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-300" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-6 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/30">
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-6 py-2 rounded-lg font-medium hover:from-amber-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/30">
                                        Get Started Free
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-slate-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!menuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed inset-0 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/logo1.png"
                                    alt="Oratio Logo"
                                    width={32}
                                    height={32}
                                    className="h-8 w-8"
                                />
                                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
                                    Oratio
                                </span>
                            </div>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-slate-900 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Login/Logout Buttons */}
                        {isLoggedIn ? (
                            <div className="w-full px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center space-x-3 mb-4 px-2">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-semibold">
                                        {username ? username.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{username}</p>
                                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{email}</p>
                                    </div>
                                </div>
                                <Link href="/dashboard" className="block text-gray-600 hover:text-slate-900 py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                <Link href="/allreports" className="block text-gray-600 hover:text-slate-900 py-2" onClick={() => setMenuOpen(false)}>Reports</Link>
                                <button
                                    onClick={handleLogout}
                                    className="mt-3 w-full text-center text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 border border-red-500/30 rounded-lg py-2"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="w-full px-4 py-3">
                                <Link href="/login" className="block w-full text-center bg-gradient-to-r from-amber-600 to-rose-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-amber-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 mb-3">
                                    Sign In
                                </Link>
                                <Link href="/signup" className="block w-full text-center border border-amber-500/50 text-amber-600 px-6 py-2.5 rounded-lg font-medium hover:bg-amber-500/10 transition-all duration-300">
                                    Get Started Free
                                </Link>
                            </div>
                        )}

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                            {pathname === '/' && !isLoggedIn && (
                                <>
                                    <NavLink onClick={() => scrollToSection("features")} icon="M13 10V3L4 14h7v7l9-11h-7z">
                                        Features
                                    </NavLink>
                                    <NavLink onClick={() => scrollToSection("how-it-works")} icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                        How It Works
                                    </NavLink>
                                    <NavLink onClick={() => scrollToSection("testimonials")} icon="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                        Testimonials
                                    </NavLink>
                                </>
                            )}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} Oratio. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
