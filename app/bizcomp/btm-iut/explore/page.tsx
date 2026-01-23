import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Zap, Droplets, ArrowRight } from 'lucide-react';

export default function ExplorePage() {
    const categories = [
        {
            title: "The Science of Defence",
            description: "How our Hairline Defence complex targets follicular strength at the root.",
            icon: <ShieldCheck className="w-8 h-8 text-[#59b345]" />,
        },
        {
            title: "Advanced Bio-Actives",
            description: "A deep dive into the potent ingredients that make our serum and oil industry-leading.",
            icon: <Zap className="w-8 h-8 text-[#59b345]" />,
        },
        {
            title: "Daily Hydration",
            description: "Why our shampoo and conditioner system is essential for maintaining a healthy scalp environment.",
            icon: <Droplets className="w-8 h-8 text-[#59b345]" />,
        }
    ];

    return (
        <main className="flex-1 bg-black text-white px-6 py-12 md:px-8">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <section className="text-left space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        Explore the <span className="text-[#59b345]">System</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium">
                        Go beyond the surface. Discover the engineering and expertise behind the most effective hairline protection system in Bangladesh.
                    </p>
                </section>

                {/* Categories Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-6 hover:bg-white/10 transition-all group">
                            <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5">
                                {cat.icon}
                            </div>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">{cat.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{cat.description}</p>
                            <button className="flex items-center gap-2 text-[#59b345] font-bold uppercase text-sm tracking-widest group-hover:gap-4 transition-all">
                                Learn More <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </section>

                {/* The Routine Section */}
                <section className="relative rounded-3xl overflow-hidden bg-[#59b345]/10 border border-[#59b345]/20 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                                Your 4-Step<br />Morning Defence
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    "Cleanse with Hairline Defence Shampoo",
                                    "Nourish with Hairline Defence Conditioner",
                                    "Protect with Hairline Defence Serum",
                                    "Lock-in with Hairline Defence Hair Oil"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-200 font-bold">
                                        <span className="bg-[#59b345] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/bizcomp/btm-iut/shop">
                                <button className="mt-4 bg-[#59b345] text-black font-black py-4 px-8 uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                                    Shop the Routine
                                </button>
                            </Link>
                        </div>
                        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                            <Image 
                                src="/bizcomp/Defense Through Habit-HERO.png" 
                                alt="Routine Display" 
                                fill 
                                className="object-cover grayscale opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}