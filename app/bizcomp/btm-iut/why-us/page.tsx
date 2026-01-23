import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Award, Users, Package } from 'lucide-react';

export default function WhyUsPage() {
    const stats = [
        { label: "Satisfied Users", value: "15k+", icon: <Users className="w-6 h-6" /> },
        { label: "Clinical Success", value: "98%", icon: <Award className="w-6 h-6" /> },
        { label: "Natural Extracts", value: "12", icon: <Package className="w-6 h-6" /> },
    ];

    const pillars = [
        {
            title: "Engineered for Dhaka",
            text: "Formulated specifically to combat the unique environmental stressors, humidity, and hard water conditions found in Bangladesh.",
        },
        {
            title: "Pure Potency",
            text: "No fillers. No harmful sulfates. Just concentrated bio-actives that deliver visible results within 30 days of consistent use.",
        },
        {
            title: "Expertise First",
            text: "Developed in collaboration with leading trichologists to ensure every drop supports follicular health and hairline integrity.",
        }
    ];

    return (
        <main className="flex-1 bg-black text-white px-6 py-12 md:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-20">
                {/* Hero Section */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Better <span className="text-[#59b345]">Protection</span><br />By Design
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg">
                            We didn't just build a hair product. We built a defence system for the modern man who values long-term confidence over short-term fixes.
                        </p>
                    </div>
                    <div className="relative h-[300px] md:h-[500px] bg-white/5 rounded-3xl overflow-hidden border border-white/10 p-4">
                        <Image 
                            src="/bizcomp/Defense Through Habit-HERO.png" 
                            alt="Brand Identity" 
                            fill 
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-white/10 py-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-2">
                            <div className="text-[#59b345] mb-2">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</div>
                            <div className="text-gray-500 uppercase text-xs font-bold tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </section>

                {/* Value Pillars */}
                <section className="space-y-12">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center">Our Commitment</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-[#59b345]" />
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{pillar.title}</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    {pillar.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-r from-black to-[#59b345]/10 border border-[#59b345]/30 rounded-3xl p-8 md:p-16 text-center space-y-8">
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Ready to Defend?</h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Stop guessing and start protecting. Your future self will thank you for the routine you start today.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/bizcomp/btm-iut/shop">
                            <button className="w-full md:w-auto bg-[#59b345] text-black font-black py-5 px-12 uppercase tracking-widest hover:scale-105 transition-transform">
                                Shop All Products
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}