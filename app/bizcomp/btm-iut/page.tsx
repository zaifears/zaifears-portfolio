import Image from 'next/image';
import Link from 'next/link';

export default function BtmIutPage() {
    return (
        <main className="flex-1 relative w-full flex flex-col">
            {/* Hero Section */}
            <div className="relative w-full h-[85vh] md:h-[calc(100vh-120px)] min-h-[600px] overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/bizcomp/Defense Through Habit-HERO.png"
                    alt="Hero Background"
                    fill
                    className="object-cover object-center z-0 scale-105"
                    priority
                    quality={90}
                />
                
                {/* Dark Overlay Gradient - Responsive */}
                {/* Mobile: Bottom-to-top gradient for text clarity */}
                {/* Desktop: Left-to-right gradient for cinematic feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent z-10" />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 pb-12 md:relative md:h-full md:p-8 z-20 flex flex-col justify-end md:justify-center items-start max-w-7xl mx-auto">
                    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 w-full space-y-6">
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
                            NEW YEAR,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#59b345] to-white">
                                NEW YOU
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-2xl font-bold text-[#59b345] tracking-wide drop-shadow-md max-w-xs md:max-w-none uppercase">
                            GET A FREE ROUTINE UPGRADE — UP TO 53% OFF!
                        </p>

                        <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row pt-4">
                            <Link href="/bizcomp/btm-iut/shop" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-[#59b345] text-black text-base md:text-lg font-black py-4 px-10 hover:bg-[#4a9639] transition-all transform active:scale-95 uppercase tracking-widest shadow-[0_10px_30px_rgba(89,179,69,0.3)]">
                                    Get the Best Deal
                                </button>
                            </Link>
                            <Link href="/bizcomp/btm-iut/quiz" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto border-2 border-white text-white text-base md:text-lg font-bold py-4 px-10 hover:bg-white/10 backdrop-blur-sm transition-all active:scale-95 uppercase tracking-widest">
                                    Take Quiz
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}