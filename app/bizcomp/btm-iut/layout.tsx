"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, User, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BtmIutLayout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const products = [
        { name: 'Hairline defence serum', href: '/bizcomp/btm-iut/shop/serum' },
        { name: 'Hairline defence hair oil', href: '/bizcomp/btm-iut/shop/oil' },
        { name: 'Hairline defence shampoo', href: '/bizcomp/btm-iut/shop/shampoo' },
        { name: 'Hairline defence conditioner', href: '/bizcomp/btm-iut/shop/conditioner' }
    ];

    return (
        <div className={`min-h-screen w-full bg-black text-white flex flex-col font-sans overflow-x-hidden ${mobileMenuOpen ? 'h-screen overflow-hidden' : ''}`}>
            {/* Top Banner */}
            <div className="w-full text-center py-2 text-[10px] md:text-sm bg-black text-white font-bold tracking-widest border-b border-gray-900/50 z-[60]">
                FREE SHIPPING ON ORDERS OVER 2026 BDT
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center">
                    {/* LEFT: Mobile Menu Button (Visible only on mobile) */}
                    <div className="flex-1 md:hidden">
                        <button
                            className="p-2 -ml-2 text-white active:text-[#59b345] transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>

                    {/* LEFT: Desktop Links (Hidden on mobile) */}
                    <div className="hidden md:flex flex-1 items-center gap-8 h-full">
                        <div className="relative group h-full flex items-center">
                            <button className="uppercase text-sm font-bold tracking-wider hover:text-[#59b345] transition-colors duration-200 flex items-center gap-1 h-full">
                                Shop
                                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                            <div className="absolute top-full left-0 w-72 bg-black border border-white/10 shadow-[0_10px_40px_-10px_rgba(89,179,69,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="flex flex-col py-2">
                                    {products.map((product) => (
                                        <Link
                                            key={product.name}
                                            href={product.href}
                                            className="px-6 py-4 text-sm font-bold text-gray-300 hover:text-[#59b345] hover:bg-white/5 transition-all flex items-center justify-between group/item border-l-2 border-transparent hover:border-[#59b345]"
                                        >
                                            {product.name}
                                            <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#59b345]">→</span>
                                        </Link>
                                    ))}
                                    <Link 
                                        href="/bizcomp/btm-iut/shop"
                                        className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#59b345] hover:bg-[#59b345]/10 text-center"
                                    >
                                        View All Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/bizcomp/btm-iut/explore" className="uppercase text-sm font-bold tracking-wider hover:text-[#59b345] transition-colors">Explore</Link>
                        <Link href="/bizcomp/btm-iut/why-us" className="uppercase text-sm font-bold tracking-wider hover:text-[#59b345] transition-colors">Why Us</Link>
                    </div>

                    {/* CENTER: Logo (Always centered) */}
                    <div className="flex justify-center items-center">
                        <Link href="/bizcomp/btm-iut" className="relative w-28 h-8 md:w-32 md:h-12 block">
                            <Image
                                src="/bizcomp/btm-iut/Team Centaurs_BizMetrics26_Final.png"
                                alt="Centaur Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* RIGHT: User & Cart Icons */}
                    <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
                        <Link href="#" className="hidden md:block text-sm font-bold hover:text-[#59b345] transition-colors">
                            SIGN IN
                        </Link>
                        <button className="hover:text-[#59b345] transition-colors">
                            <User className="w-6 h-6" />
                        </button>
                        <button className="hover:text-[#59b345] transition-colors relative">
                            <ShoppingBag className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-[#59b345] text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Drawer Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex flex-col animate-in fade-in duration-300">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-4 h-16 shrink-0">
                            <div className="relative w-28 h-8 opacity-40">
                                <Image
                                    src="/bizcomp/btm-iut/Team Centaurs_BizMetrics26_Final.png"
                                    alt="Centaur Logo"
                                    fill
                                    className="object-contain grayscale"
                                />
                            </div>
                            <button 
                                onClick={() => setMobileMenuOpen(false)} 
                                className="p-2 text-white bg-white/10 rounded-full hover:bg-[#59b345] hover:text-black transition-all"
                                aria-label="Close menu"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Drawer Content - Full Screen Centered */}
                        <div className="flex-1 flex flex-col justify-center items-center px-8 text-center space-y-8">
                            {/* Main Navigation */}
                            <div className="flex flex-col gap-6 w-full">
                                <Link 
                                    href="/bizcomp/btm-iut/shop" 
                                    className="text-4xl font-black uppercase tracking-tighter hover:text-[#59b345] transition-colors flex items-center justify-center gap-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Shop <ArrowRight className="w-6 h-6" />
                                </Link>
                                <Link href="/bizcomp/btm-iut/explore" className="text-4xl font-black uppercase tracking-tighter hover:text-[#59b345] transition-colors" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
                                <Link href="/bizcomp/btm-iut/why-us" className="text-4xl font-black uppercase tracking-tighter hover:text-[#59b345] transition-colors" onClick={() => setMobileMenuOpen(false)}>Why Us</Link>
                                <Link href="/bizcomp/btm-iut/quiz" className="text-4xl font-black uppercase tracking-tighter text-[#59b345] animate-pulse" onClick={() => setMobileMenuOpen(false)}>Take Quiz</Link>
                            </div>

                            <div className="w-12 h-px bg-white/20" />

                            {/* Minimal Individual Products */}
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-xs">
                                {products.map((product) => (
                                    <Link 
                                        key={product.name} 
                                        href={product.href} 
                                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {product.name.replace('Hairline defence ', '')}
                                    </Link>
                                ))}
                            </div>

                            {/* Account Links */}
                            <div className="pt-8 flex gap-8">
                                <Link href="#" className="text-xs font-black uppercase tracking-widest text-gray-400" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                <Link href="#" className="text-xs font-black uppercase tracking-widest text-gray-400" onClick={() => setMobileMenuOpen(false)}>Account</Link>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="p-8 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Defence Through Habit</p>
                        </div>
                    </div>
                )}
            </nav>

            {children}
        </div>
    );
}