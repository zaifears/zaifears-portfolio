"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, RotateCcw, ShieldCheck, Zap, ShoppingCart } from 'lucide-react';

type Option = {
    label: string;
    emoji: string;
};

type Question = {
    id: number;
    part: string;
    question: string;
    options: Option[];
};

const questions: Question[] = [
    // PART 1: Your Hair Situation
    {
        id: 1,
        part: "Hair Situation",
        question: "How would you describe your hair density?",
        options: [
            { label: "Thick", emoji: "🦁" },
            { label: "Medium", emoji: "🧔" },
            { label: "Thin", emoji: "👴" },
            { label: "Not sure", emoji: "🤔" }
        ]
    },
    {
        id: 2,
        part: "Hair Situation",
        question: "How much hair fall do you notice?",
        options: [
            { label: "Very little", emoji: "✅" },
            { label: "Some hair fall", emoji: "⚠️" },
            { label: "A lot of hair fall", emoji: "📉" },
            { label: "Severe hair fall", emoji: "🚨" }
        ]
    },
    {
        id: 3,
        part: "Hair Situation",
        question: "Where do you notice hair thinning the most?",
        options: [
            { label: "Front hairline", emoji: "📏" },
            { label: "Crown (top)", emoji: "👑" },
            { label: "Overall thinning", emoji: "🌫️" },
            { label: "Not sure", emoji: "❓" }
        ]
    },
    {
        id: 4,
        part: "Hair Situation",
        question: "How does your scalp usually feel?",
        options: [
            { label: "Normal", emoji: "👌" },
            { label: "Oily", emoji: "💧" },
            { label: "Dry", emoji: "🏜️" },
            { label: "Itchy / flaky", emoji: "😣" }
        ]
    },
    {
        id: 5,
        part: "Hair Situation",
        question: "Do you have dandruff?",
        options: [
            { label: "No dandruff", emoji: "✨" },
            { label: "Mild dandruff", emoji: "❄️" },
            { label: "Heavy dandruff", emoji: "🌨️" },
            { label: "Comes and goes", emoji: "🔄" }
        ]
    },
    {
        id: 6,
        part: "Hair Situation",
        question: "How long have you noticed hair problems?",
        options: [
            { label: "Less than 6 months", emoji: "⏳" },
            { label: "6–12 months", emoji: "📅" },
            { label: "1–3 years", emoji: "🕰️" },
            { label: "More than 3 years", emoji: "👵" }
        ]
    },
    {
        id: 7,
        part: "Hair Situation",
        question: "Have you tried any hair products or treatments before?",
        options: [
            { label: "Yes, regularly", emoji: "🧪" },
            { label: "Tried a few", emoji: "🧴" },
            { label: "Tried once", emoji: "☝️" },
            { label: "Never tried", emoji: "❌" }
        ]
    },
    {
        id: 8,
        part: "Hair Situation",
        question: "What’s your main hair goal?",
        options: [
            { label: "Reduce hair fall", emoji: "🛡️" },
            { label: "Improve hair thickness", emoji: "💪" },
            { label: "Control dandruff", emoji: "🧼" },
            { label: "Maintain healthy hair", emoji: "🌟" }
        ]
    },
    // PART 2: Your Lifestyle
    {
        id: 9,
        part: "Lifestyle",
        question: "How active is your daily routine?",
        options: [
            { label: "Mostly indoors", emoji: "🏠" },
            { label: "Mix of indoor & outdoor", emoji: "🏢" },
            { label: "Mostly outdoors", emoji: "🏃" },
            { label: "Very active all day", emoji: "🔥" }
        ]
    },
    {
        id: 10,
        part: "Lifestyle",
        question: "How many hours are you usually outside in the sun?",
        options: [
            { label: "Less than 1 hour", emoji: "☁️" },
            { label: "1–3 hours", emoji: "☀️" },
            { label: "3–6 hours", emoji: "🕶️" },
            { label: "Almost all day", emoji: "🏜️" }
        ]
    },
    {
        id: 11,
        part: "Lifestyle",
        question: "What best describes your diet?",
        options: [
            { label: "Balanced", emoji: "🥗" },
            { label: "Mix of healthy & fast food", emoji: "🍕" },
            { label: "Mostly fast food", emoji: "🍔" },
            { label: "Not sure", emoji: "🤷" }
        ]
    },
    {
        id: 12,
        part: "Lifestyle",
        question: "How stressful is your daily life?",
        options: [
            { label: "Low stress", emoji: "🧘" },
            { label: "Moderate stress", emoji: "📈" },
            { label: "High stress", emoji: "🤯" },
            { label: "Very high stress", emoji: "🌋" }
        ]
    },
    {
        id: 13,
        part: "Lifestyle",
        question: "How many hours do you usually sleep?",
        options: [
            { label: "7–8 hours", emoji: "😴" },
            { label: "6–7 hours", emoji: "🌙" },
            { label: "5–6 hours", emoji: "☕" },
            { label: "Less than 5 hours", emoji: "😫" }
        ]
    }
];

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const progress = ((step + 1) / questions.length) * 100;
    const currentQuestion = questions[step];

    const handleOptionSelect = (option: string) => {
        const newAnswers = { ...answers, [currentQuestion.id]: option };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setTimeout(() => setStep(step + 1), 300);
        } else {
            setTimeout(() => setIsFinished(true), 500);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers({});
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <main className="flex-1 bg-black text-white p-6 md:p-12 overflow-y-auto animate-in fade-in zoom-in duration-500">
                <div className="max-w-2xl mx-auto flex flex-col items-center space-y-10">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#59b345]/10 text-[#59b345] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-[#59b345]/20">
                            <CheckCircle2 className="w-4 h-4" /> Analysis Complete
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Your Defence <span className="text-[#59b345]">System</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-md mx-auto">
                            Based on your {answers[4]} scalp and {answers[2]} hair fall, we recommend our comprehensive protection routine.
                        </p>
                    </div>

                    {/* Combo Recommendation Card */}
                    <div className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group">
                        <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center p-8">
                            <Image 
                                src="/bizcomp/btm-iut/combo.png" 
                                alt="Hairline Defence Combo Pack" 
                                fill 
                                className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute top-6 right-6">
                                <span className="bg-[#59b345] text-black font-black px-4 py-2 rounded-lg text-sm rotate-3 shadow-xl">
                                    BEST DEAL
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">Full Defence Combo</h3>
                                    <div className="flex gap-2">
                                        <span className="text-[#59b345] font-black text-2xl">4,200 BDT</span>
                                        <span className="text-gray-600 line-through text-lg font-bold">5,800 BDT</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Savings</p>
                                    <p className="text-[#59b345] font-black">27% OFF</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <ShieldCheck className="w-5 h-5 text-[#59b345]" />
                                    <p className="text-xs font-bold text-gray-300">Clinically Approved</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <Zap className="w-5 h-5 text-[#59b345]" />
                                    <p className="text-xs font-bold text-gray-300">Fast-Action Bio-actives</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Link href="/bizcomp/btm-iut/checkout" className="w-full">
                                    <button className="w-full bg-[#59b345] text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#4a9639] transition-all transform active:scale-95 shadow-[0_15px_30px_rgba(89,179,69,0.25)]">
                                        <ShoppingCart className="w-5 h-5" /> Add to Routine
                                    </button>
                                </Link>
                                <button 
                                    onClick={resetQuiz}
                                    className="w-full text-gray-500 font-black uppercase text-[10px] tracking-[0.3em] py-4 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-3 h-3" /> Retake Analysis
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-10"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-black text-white flex flex-col overflow-hidden">
            {/* Progress Bar Container */}
            <div className="w-full bg-white/5 h-1.5 sticky top-0 z-30">
                <div 
                    className="bg-[#59b345] h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(89,179,69,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="max-w-xl mx-auto w-full px-6 py-12 flex-1 flex flex-col">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#59b345] px-3 py-1 bg-[#59b345]/10 rounded-full border border-[#59b345]/20">
                        Part {currentQuestion.id <= 8 ? "01" : "02"}: {currentQuestion.part}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 tracking-widest">
                        {step + 1} / {questions.length}
                    </span>
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col justify-center space-y-10">
                    <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter">
                        {currentQuestion.question}
                    </h2>

                    <div className="grid grid-cols-1 gap-3">
                        {currentQuestion.options.map((opt) => {
                            const isSelected = answers[currentQuestion.id] === opt.label;
                            return (
                                <button
                                    key={opt.label}
                                    onClick={() => handleOptionSelect(opt.label)}
                                    className={`
                                        flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 group
                                        ${isSelected 
                                            ? 'bg-[#59b345] text-black border-[#59b345] scale-[1.02]' 
                                            : 'bg-white/5 border border-white/10 hover:border-[#59b345]/50 hover:bg-white/10'}
                                    `}
                                >
                                    <span className={`
                                        text-2xl transition-transform duration-500 group-hover:scale-125
                                        ${isSelected ? 'scale-110' : ''}
                                    `}>
                                        {opt.emoji}
                                    </span>
                                    <span className="font-bold text-lg tracking-tight">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                    <button
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className={`
                            flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest transition-colors
                            ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-white'}
                        `}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex gap-1.5">
                        {questions.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-6 bg-[#59b345]' : 'w-1 bg-white/10'}`} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}