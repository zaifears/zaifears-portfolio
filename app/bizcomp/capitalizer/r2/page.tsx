"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { Plus, Trash2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Asset {
    name: string;
    value: number;
    color: string;
    returnRate: number;
    amount: number;
}

interface Portfolio {
    goal: string;
    timeframe: string;
    justification: string;
    expectedReturn: string;
    allocation: Asset[];
    target: number;
    monthlyFlow: number;
    additionalInfo?: string;
}

const BUCKET_KEYS = {
    emergency: "Bucket 1: Medical & Emergency",
    education: "Bucket 2: Education & Mid-Term",
    long: "Bucket 3: Long Horizon",
};

const INSURANCE_TAB = "Insurance";

const initialPortfolioData: Record<string, Portfolio> = {
    [BUCKET_KEYS.emergency]: {
        goal: "Emergency Buffer (stock only)",
        timeframe: "0 to 24 Months",
        justification: "Emergency bucket held as stock only with no ongoing cashflow.",
        expectedReturn: "3.50",
        allocation: [
            { name: "Cash / Savings (Emergency Reserve)", value: 100, color: "#1E3A8A", returnRate: 3.5, amount: 200000 }
        ],
        target: 200000,
        monthlyFlow: 0,
        additionalInfo: "Stocked at BDT 200,000 with zero monthly flow."
    },
    [BUCKET_KEYS.education]: {
        goal: "Mahira's Education (Scenario B)",
        timeframe: "2 to 5 Years",
        justification: "Mahira's education buffer (Scenario B worst-case) with staggered maturities and fixed-income dominance to reduce drawdown risk.",
        expectedReturn: "9.80",
        allocation: [
            { name: "Govt T-Bills / Bonds", value: 47.2, color: "#475569", returnRate: 7.0, amount: 500000 },
            { name: "FDR", value: 18.9, color: "#0F766E", returnRate: 9.0, amount: 200000 },
            { name: "Cash / Savings Buffer", value: 33.9, color: "#0D9488", returnRate: 3.5, amount: 360000 }
        ],
        target: 1060000,
        monthlyFlow: 15000,
        additionalInfo: "Flow: BDT 15,000/month as DPS split across two banks (BDT 7,500 each)."
    },
    [BUCKET_KEYS.long]: {
        goal: "Retirement & Rifat's Education",
        timeframe: "5 to 16+ Years",
        justification: "Long-horizon compounding bucket for Rifat's education and retirement runway with equity capped at 25% of the total portfolio.",
        expectedReturn: "11.40",
        allocation: [
            { name: "Family Sanchayapatra", value: 48.4, color: "#2563EB", returnRate: 11.93, amount: 600000 },
            { name: "Open-End Mutual Fund", value: 32.3, color: "#0369A1", returnRate: 12.0, amount: 400000 },
            { name: "Digital Gold", value: 19.3, color: "#D97706", returnRate: 6.0, amount: 240000 }
        ],
        target: 1240000,
        monthlyFlow: 12000,
        additionalInfo: "Flow: BDT 12,000/month allocated to long-horizon growth."
    }
};

const ASSET_COLOR_CLASSES: Record<string, { text: string; accent: string }> = {
    '#1E3A8A': { text: 'text-blue-900', accent: 'accent-blue-900' },
    '#2563EB': { text: 'text-blue-600', accent: 'accent-blue-600' },
    '#1D4ED8': { text: 'text-blue-700', accent: 'accent-blue-700' },
    '#0369A1': { text: 'text-sky-700', accent: 'accent-sky-700' },
    '#0F766E': { text: 'text-teal-700', accent: 'accent-teal-700' },
    '#0D9488': { text: 'text-teal-600', accent: 'accent-teal-600' },
    '#475569': { text: 'text-slate-600', accent: 'accent-slate-600' },
    '#D97706': { text: 'text-amber-600', accent: 'accent-amber-600' },
    '#334155': { text: 'text-slate-700', accent: 'accent-slate-700' },
    '#0F172A': { text: 'text-slate-900', accent: 'accent-slate-900' }
};

const EXTRA_COLORS = ['#334155', '#1E40AF', '#0369A1', '#0F766E', '#475569', '#64748B'];
const DEFAULT_ASSET_COLOR_CLASSES = { text: 'text-slate-800', accent: 'accent-blue-600' };
const getAssetColorClasses = (color: string) => ASSET_COLOR_CLASSES[color] ?? DEFAULT_ASSET_COLOR_CLASSES;

export default function App() {
    const [portfolios, setPortfolios] = useState(initialPortfolioData);
    const [activeTab, setActiveTab] = useState<string>(BUCKET_KEYS.emergency);
    const isInsuranceTab = activeTab === INSURANCE_TAB;
    const activePortfolioKey = isInsuranceTab ? BUCKET_KEYS.emergency : activeTab;
    
    const activePortfolio = portfolios[activePortfolioKey];

    const totalAllocatedAmount = useMemo(() => {
        return activePortfolio.allocation.reduce((sum, asset) => sum + asset.amount, 0);
    }, [activePortfolio.allocation]);

    const calculatedWeightedReturn = useMemo(() => {
        if (activePortfolio.allocation.length === 0) return "0.00";
        const weightedSum = activePortfolio.allocation.reduce((sum, asset) => {
            return sum + (asset.value / 100) * asset.returnRate;
        }, 0);
        return weightedSum.toFixed(2);
    }, [activePortfolio.allocation]);

    const calculatedProjection = useMemo(() => {
        const initial = totalAllocatedAmount;
        const annualRate = parseFloat(calculatedWeightedReturn) || 0;
        const monthlyRate = annualRate / 100 / 12;
        const monthlyFlow = Number(activePortfolio.monthlyFlow) || 0;
        
        const projection = [];
        const years = activePortfolioKey === BUCKET_KEYS.emergency ? 2 : activePortfolioKey === BUCKET_KEYS.education ? 5 : 16;
        
        for (let year = 0; year <= years; year++) {
            const months = year * 12;
            let value = 0;
            
            if (annualRate === 0) {
                value = initial + (monthlyFlow * months);
            } else {
                const principalFV = initial * Math.pow(1 + monthlyRate, months);
                const flowFV = monthlyFlow * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
                value = principalFV + flowFV;
            }
            projection.push([year, Math.round(value)]);
        }
        return projection;
    }, [totalAllocatedAmount, calculatedWeightedReturn, activePortfolio.monthlyFlow, activePortfolioKey]);


    const doughnutData = {
        labels: activePortfolio.allocation.map(a => a.name),
        datasets: [{
            data: activePortfolio.allocation.map(a => Math.max(a.value, 0.1)),
            backgroundColor: activePortfolio.allocation.map(a => a.color),
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 4
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { 
                    color: '#334155',
                    padding: 20,
                    font: { family: "'Inter', sans-serif", size: 12, weight: 500 },
                    usePointStyle: true,
                    boxWidth: 8,
                }
            },
            tooltip: {
                callbacks: { label: (context: any) => ` ${context.label}: ${context.raw.toFixed(1)}%` },
                titleFont: { size: 13, weight: 600, family: "'Inter', sans-serif" },
                bodyFont: { size: 13, weight: 400, family: "'Inter', sans-serif" },
                padding: 12,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#F8FAFC',
                cornerRadius: 4,
                displayColors: true
            }
        }
    };

    const lineData = {
        labels: calculatedProjection.map(p => `Year ${p[0]}`),
        datasets: [{
            label: 'Projected Value',
            data: calculatedProjection.map(p => p[1]),
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1E40AF',
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: 'white',
            borderWidth: 2
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: { 
                    color: '#64748B',
                    font: { size: 12, family: "'Inter', sans-serif" },
                    callback: (value: any) => '৳' + (Number(value) / 1000000).toFixed(1) + 'M' 
                },
                grid: { color: '#E2E8F0', drawBorder: false }
            },
            x: { 
                ticks: { color: '#64748B', font: { size: 12, family: "'Inter', sans-serif" } },
                grid: { display: false, drawBorder: false }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                titleFont: { size: 13, weight: 600, family: "'Inter', sans-serif" },
                bodyFont: { size: 13, weight: 400, family: "'Inter', sans-serif" },
                padding: 12,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#F8FAFC',
                bodyColor: '#F8FAFC',
                cornerRadius: 4,
                callbacks: { label: (context: any) => ` Value: ৳${context.raw.toLocaleString()}` }
            }
        }
    };

    const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPortfolios(prev => ({
            ...prev,
            [activePortfolioKey]: {
                ...prev[activePortfolioKey],
                [name]: name === 'monthlyFlow' || name === 'target' ? Number(value) : value
            }
        }));
    };

    const handleAllocationChange = (index: number, field: 'value' | 'returnRate' | 'amount' | 'name', newValue: number | string) => {
        setPortfolios(prev => {
            const currentPortfolio = prev[activePortfolioKey];
            let newAllocations = [...currentPortfolio.allocation];
            
            if (field === 'amount') {
                newAllocations[index] = { ...newAllocations[index], amount: newValue as number };
                const newTotalAmount = newAllocations.reduce((sum, a) => sum + a.amount, 0);
                
                newAllocations = newAllocations.map(a => ({
                    ...a,
                    value: newTotalAmount > 0 ? (a.amount / newTotalAmount) * 100 : 0
                }));
            } 
            else if (field === 'value') {
                newAllocations[index] = { ...newAllocations[index], value: newValue as number };
                
                const currentTotalAmount = newAllocations.reduce((sum, a) => sum + a.amount, 0);
                const newTotalPercent = newAllocations.reduce((sum, a) => sum + a.value, 0);
                
                newAllocations = newAllocations.map(a => {
                    const normalizedValue = newTotalPercent > 0 ? (a.value / newTotalPercent) * 100 : 0;
                    return {
                        ...a,
                        value: normalizedValue,
                        amount: (normalizedValue / 100) * currentTotalAmount
                    };
                });
            } 
            else {
                newAllocations[index] = { ...newAllocations[index], [field]: newValue } as any;
            }
            
            return {
                ...prev,
                [activePortfolioKey]: {
                    ...currentPortfolio,
                    allocation: newAllocations
                }
            };
        });
    };

    const handleAddAsset = () => {
        setPortfolios(prev => {
            const currentPortfolio = prev[activePortfolioKey];
            const newAllocations = [...currentPortfolio.allocation];
            const newColor = EXTRA_COLORS[newAllocations.length % EXTRA_COLORS.length];

            newAllocations.push({
                name: 'New Asset',
                value: 0,
                color: newColor,
                returnRate: 5.0,
                amount: 0
            });

            const newTotalAmount = newAllocations.reduce((sum, a) => sum + a.amount, 0);
            const normalized = newAllocations.map(a => ({
                ...a,
                value: newTotalAmount > 0 ? (a.amount / newTotalAmount) * 100 : (100 / newAllocations.length)
            }));

            return {
                ...prev,
                [activePortfolioKey]: {
                    ...currentPortfolio,
                    allocation: normalized
                }
            };
        });
    };

    const handleRemoveAsset = (indexToRemove: number) => {
        setPortfolios(prev => {
            const currentPortfolio = prev[activePortfolioKey];
            const newAllocations = currentPortfolio.allocation.filter((_, idx) => idx !== indexToRemove);
            
            const newTotalAmount = newAllocations.reduce((sum, a) => sum + a.amount, 0);
            const normalized = newAllocations.map(a => ({
                ...a,
                value: newTotalAmount > 0 ? (a.amount / newTotalAmount) * 100 : (newAllocations.length ? 100 / newAllocations.length : 0)
            }));

            return {
                ...prev,
                [activePortfolioKey]: {
                    ...currentPortfolio,
                    allocation: normalized
                }
            };
        });
    };

    const bucketSummaries = useMemo(() => {
        return Object.entries(portfolios).map(([key, bucket]) => {
            const total = bucket.allocation.reduce((sum, asset) => sum + asset.amount, 0);
            return {
                key,
                timeframe: bucket.timeframe,
                monthlyFlow: bucket.monthlyFlow,
                total,
                assets: bucket.allocation.map(asset => ({ name: asset.name, amount: asset.amount }))
            };
        });
    }, [portfolios]);

    const totalInvestable = useMemo(() => bucketSummaries.reduce((sum, bucket) => sum + bucket.total, 0), [bucketSummaries]);
    const totalMonthlyFlow = useMemo(() => bucketSummaries.reduce((sum, bucket) => sum + bucket.monthlyFlow, 0), [bucketSummaries]);

    const renderAllocationTable = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Asset Allocation Details</h3>
                <div className="text-right">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Allocated</p>
                    <p className="text-xl font-bold text-blue-700">৳{totalAllocatedAmount.toLocaleString()}</p>
                </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full border-collapse bg-white text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600 min-w-50">Instrument</th>
                            <th className="p-4 font-semibold text-slate-600 text-center min-w-45">Allocation %</th>
                            <th className="p-4 font-semibold text-slate-600 text-center w-24">Return %</th>
                            <th className="p-4 font-semibold text-slate-600 text-right w-36">Amount (৳)</th>
                            <th className="p-4 font-semibold text-slate-600 text-center w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {activePortfolio.allocation.map((asset, index) => {
                            const assetClasses = getAssetColorClasses(asset.color);
                            return (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3">
                                        <input
                                            type="text"
                                            value={asset.name}
                                            onChange={(e) => handleAllocationChange(index, 'name', e.target.value)}
                                            aria-label={`Instrument name for ${asset.name}`}
                                            className={`w-full bg-transparent font-medium border border-transparent hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded p-1.5 transition-all ${assetClasses.text}`}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={asset.value}
                                                onChange={(e) => handleAllocationChange(index, 'value', Number(e.target.value))}
                                                aria-label={`Allocation percentage slider for ${asset.name}`}
                                                className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${assetClasses.accent}`}
                                            />
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={Number(asset.value.toFixed(1))}
                                                onChange={(e) => handleAllocationChange(index, 'value', parseFloat(e.target.value) || 0)}
                                                aria-label={`Allocation percentage for ${asset.name}`}
                                                className="w-16 bg-white text-slate-800 rounded border border-slate-300 px-2 py-1 text-xs text-center focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={Number(asset.returnRate.toFixed(2))}
                                            onChange={(e) => handleAllocationChange(index, 'returnRate', parseFloat(e.target.value) || 0)}
                                            aria-label={`Return rate for ${asset.name}`}
                                            className="w-20 bg-white text-slate-800 rounded border border-slate-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all mx-auto block text-center"
                                        />
                                    </td>
                                    <td className="p-3 text-right">
                                        <input
                                            type="number"
                                            step="1000"
                                            value={Math.round(asset.amount)}
                                            onChange={(e) => handleAllocationChange(index, 'amount', parseFloat(e.target.value) || 0)}
                                            aria-label={`Amount for ${asset.name}`}
                                            className="w-full bg-white text-slate-800 rounded border border-slate-300 px-3 py-1.5 text-sm font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-right"
                                        />
                                    </td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => handleRemoveAsset(index)}
                                            className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50"
                                            aria-label={`Remove ${asset.name}`}
                                            title="Remove Instrument"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr className="bg-slate-50 font-semibold text-slate-800">
                            <td className="p-4 border-t border-slate-200">Total Portfolio</td>
                            <td className="p-4 text-center border-t border-slate-200">100%</td>
                            <td className="p-4 text-center text-blue-700 border-t border-slate-200">{calculatedWeightedReturn}%</td>
                            <td className="p-4 text-right text-blue-700 border-t border-slate-200">৳{totalAllocatedAmount.toLocaleString()}</td>
                            <td className="p-4 border-t border-slate-200"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4">
                <button 
                    onClick={handleAddAsset}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 px-3 rounded-md hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                >
                    <Plus size={16} /> Add Asset Class
                </button>
            </div>
        </div>
    );

    const insuranceInputs = [
        { parameter: "Age (Current)", imran: "44", sabrina: "39", notes: "Primary pricing driver" },
        { parameter: "Sum Assured (SA)", imran: "13,200,000", sabrina: "4,620,000", notes: "From Needs Analysis" },
        { parameter: "Policy Term", imran: "20", sabrina: "20", notes: "Coverage duration" },
        { parameter: "Base Rate (per 1k SA)", imran: "3.85", sabrina: "3.10", notes: "Estimated for 20-year term" },
        { parameter: "Health Loading", imran: "10%", sabrina: "0%", notes: "Extra charge for medical history" },
        { parameter: "Payment Frequency Disc.", imran: "2%", sabrina: "2%", notes: "Discount for annual vs monthly" },
        { parameter: "Tax Rebate Rate (78A)", imran: "15%", sabrina: "15%", notes: "Per Bangladesh Tax Law" }
    ];

    const termInsuranceRows = [
        {
            person: "Imran",
            multiple: "10x",
            annualIncome: 1320000,
            requiredCoverage: 13200000,
            basePremium: 50820,
            loadedPremium: 55902,
            annualOutflow: 54783.96
        },
        {
            person: "Sabrina",
            multiple: "7x",
            annualIncome: 660000,
            requiredCoverage: 4620000,
            basePremium: 14322,
            loadedPremium: 14322,
            annualOutflow: 14035.56
        }
    ];

    const insuranceTotals = {
        healthAnnual: 63180.48,
        annualTotal: 132000,
        monthlyTotal: 11000,
        rebateAnnual: 10800
    };

    return (
        <div className="bg-slate-50 text-slate-800 p-6 md:p-10 min-h-screen font-sans">
            <header className="max-w-7xl mx-auto mb-8 border-b border-slate-200 pb-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        Capitalizer Portfolio Configuration
                    </h1>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                        <Image
                            src="/bizcomp/the-godfathers.png"
                            alt="The Godfathers logo"
                            fill
                            sizes="(min-width: 768px) 80px, 64px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
                <p className="text-base font-medium text-slate-500 mt-2">
                    Hossain Family Strategic Asset Allocation by Time Horizon
                </p>
            </header>

            {!isInsuranceTab && (
                <section className="max-w-7xl mx-auto mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Investable Stock</p>
                        <p className="text-2xl font-bold text-blue-700">৳{totalInvestable.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Monthly Flow</p>
                        <p className="text-2xl font-bold text-blue-700">৳{totalMonthlyFlow.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {bucketSummaries.map(bucket => (
                        <div key={bucket.key} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 flex flex-col">
                            <div className="border-b border-slate-100 pb-3 mb-3">
                                <h3 className="text-sm font-bold text-slate-900">{bucket.key}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{bucket.timeframe}</p>
                            </div>
                            <div className="grow">
                                <div className="space-y-2 mb-4">
                                    {bucket.assets.map(asset => (
                                        <div key={`${bucket.key}-${asset.name}`} className="flex justify-between text-xs text-slate-600">
                                            <span className="truncate pr-2">{asset.name}</span>
                                            <span className="font-medium text-slate-800">৳{Math.round(asset.amount).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-3 border-t border-slate-100 flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase">Bucket Size</p>
                                    <p className="text-sm font-bold text-slate-800">৳{bucket.total.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-semibold text-blue-400 uppercase">Monthly Flow</p>
                                    <p className="text-sm font-bold text-blue-700">৳{bucket.monthlyFlow.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </section>
            )}

            <div className="max-w-7xl mx-auto mb-8 border-b border-slate-200">
                <div className="flex items-center gap-4 py-2">
                    <nav className="flex flex-wrap gap-6" aria-label="Tabs">
                        {[...Object.keys(portfolios), INSURANCE_TAB].map(name => (
                            <button
                                key={name}
                                onClick={() => setActiveTab(name)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === name 
                                        ? 'border-blue-600 text-blue-700' 
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                {name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {isInsuranceTab ? (
                        <section className="space-y-6 max-w-7xl mx-auto pb-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">💰 Monthly Insurance Cost</p>
                                    <p className="text-2xl font-bold text-blue-700">৳{insuranceTotals.monthlyTotal.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500 mt-2">Term life + family health (4 members)</p>
                                </div>
                                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">📆 Annual Outflow</p>
                                    <p className="text-2xl font-bold text-blue-700">৳{insuranceTotals.annualTotal.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500 mt-2">Includes health floating annual outflow</p>
                                </div>
                                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">🏷️ 78A Rebate</p>
                                    <p className="text-2xl font-bold text-emerald-600">৳{insuranceTotals.rebateAnnual.toLocaleString()}/year</p>
                                    <p className="text-xs text-slate-500 mt-2">Combined premium rebate estimate</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-4">🧾 Insurance Inputs</h2>
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3 font-semibold text-slate-600">Parameter</th>
                                                    <th className="p-3 font-semibold text-slate-600">Input Value (Imran)</th>
                                                    <th className="p-3 font-semibold text-slate-600">Input Value (Sabrina)</th>
                                                    <th className="p-3 font-semibold text-slate-600">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {insuranceInputs.map((row) => (
                                                    <tr key={row.parameter}>
                                                        <td className="p-3 font-medium text-slate-700">{row.parameter}</td>
                                                        <td className="p-3 text-slate-600">{row.imran}</td>
                                                        <td className="p-3 text-slate-600">{row.sabrina}</td>
                                                        <td className="p-3 text-slate-500">{row.notes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-4">🧮 Premium Formulae</h2>
                                    <div className="space-y-3 text-sm text-slate-600">
                                        <p><span className="font-semibold text-slate-700">Base Premium</span> = (Sum Assured / 1000) × Base Rate</p>
                                        <p><span className="font-semibold text-slate-700">Loaded Premium</span> = Base Premium × (1 + Health Loading)</p>
                                        <p><span className="font-semibold text-slate-700">Net Annual Outflow</span> = Loaded Premium × (1 − Discount)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <h2 className="text-lg font-bold text-slate-900 mb-4">🛡️ Term Insurance Calculation</h2>
                                <div className="overflow-x-auto rounded-lg border border-slate-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="p-3 font-semibold text-slate-600">Person</th>
                                                <th className="p-3 font-semibold text-slate-600">Coverage Multiple</th>
                                                <th className="p-3 font-semibold text-slate-600">Annual Net Income</th>
                                                <th className="p-3 font-semibold text-slate-600">Required Coverage</th>
                                                <th className="p-3 font-semibold text-slate-600">Base Premium</th>
                                                <th className="p-3 font-semibold text-slate-600">Loaded Premium</th>
                                                <th className="p-3 font-semibold text-slate-600">Annual Outflow</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {termInsuranceRows.map((row) => (
                                                <tr key={row.person}>
                                                    <td className="p-3 font-medium text-slate-700">{row.person}</td>
                                                    <td className="p-3 text-slate-600">{row.multiple}</td>
                                                    <td className="p-3 text-slate-600">৳{row.annualIncome.toLocaleString()}</td>
                                                    <td className="p-3 text-slate-600">৳{row.requiredCoverage.toLocaleString()}</td>
                                                    <td className="p-3 text-slate-600">৳{row.basePremium.toLocaleString()}</td>
                                                    <td className="p-3 text-slate-600">৳{row.loadedPremium.toLocaleString()}</td>
                                                    <td className="p-3 text-slate-600">৳{row.annualOutflow.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-slate-50">
                                                <td className="p-3 font-medium text-slate-700">Health Floating</td>
                                                <td className="p-3 text-slate-500" colSpan={5}>Family health annual outflow</td>
                                                <td className="p-3 text-slate-700">৳{insuranceTotals.healthAnnual.toFixed(2)}</td>
                                            </tr>
                                            <tr className="bg-slate-100 font-semibold">
                                                <td className="p-3 text-slate-700" colSpan={6}>Total Annual Outflow</td>
                                                <td className="p-3 text-slate-900">৳{insuranceTotals.annualTotal.toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-3">🧑‍💼 Term Life: Imran</h2>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li>✅ Required cover: 10x annual take-home = BDT 1.32 crore.</li>
                                        <li>✅ Term: 20 years (covers Rifat's education window).</li>
                                        <li>✅ Estimated premium: BDT 45k–55k/year (use BDT 50k for planning).</li>
                                        <li>✅ Monthly cost: BDT 4,167.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-3">👩‍💼 Term Life: Sabrina</h2>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li>✅ Required cover: 7x annual take-home = BDT 46.2 lakh.</li>
                                        <li>✅ Term: 20 years.</li>
                                        <li>✅ Estimated premium: BDT 20k–25k/year (use BDT 22k).</li>
                                        <li>✅ Monthly cost: BDT 1,833.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-3">🏥 Health Insurance (Urgent)</h2>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li>✅ Family floater: Imran, Sabrina, Mahira, Rifat — BDT 5 lakh sum insured.</li>
                                        <li>✅ Annual premium: BDT 45k–60k (use BDT 5,000/month for planning).</li>
                                        <li>✅ Rashida (68): seek separate senior plan (BDT 25k–40k/year) or maintain medication budget at BDT 12k/month.</li>
                                        <li>✅ Cataract surgery (BDT 1.8L) cannot be insured retroactively — fund directly.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-3">🧯 Critical Protection</h2>
                                    <ul className="text-sm text-slate-600 space-y-2">
                                        <li>✅ Check employer group life/health coverage.</li>
                                        <li>✅ If group cover exists, supplement rather than replace personal term.</li>
                                        <li>✅ Prioritize disability income cover where available.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-600">
                                <p className="font-semibold text-slate-700 mb-1">📉 Cashflow Impact</p>
                                <p>
                                    Insurance reduces investable monthly flow from BDT 22,000 to BDT 11,000 (after DPS BDT 5,000 and insurance BDT 11,000).
                                    As salaries grow at ~8%/year, Year 1 increment adds approximately BDT 8,800/month of take-home capacity.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <div className="space-y-6 max-w-7xl mx-auto pb-12">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">{activePortfolioKey} Configurator</h2>
                                </div>
                        
                                <div className="mb-6 bg-slate-50 rounded-md border-l-4 border-blue-600 p-4">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Strategic Goal</h3>
                                    <p className="text-sm font-medium text-slate-800 mb-2">{activePortfolio.goal} ({activePortfolio.timeframe})</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {activePortfolio.justification}
                                    </p>
                                </div>
                        
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label htmlFor="portfolio-target" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                                            Target Objective (৳)
                                        </label>
                                        <input
                                            type="number"
                                            name="target"
                                            id="portfolio-target"
                                            value={activePortfolio.target}
                                            onChange={handlePortfolioChange}
                                            className="w-full bg-white text-slate-900 rounded-md border border-slate-300 p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="portfolio-monthly-flow" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                                            Monthly Flow (৳/mo)
                                        </label>
                                        <input
                                            type="number"
                                            name="monthlyFlow"
                                            id="portfolio-monthly-flow"
                                            value={activePortfolio.monthlyFlow}
                                            onChange={handlePortfolioChange}
                                            className="w-full bg-white text-slate-900 rounded-md border border-slate-300 p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                            
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                                            Est. Blended Yield (%)
                                        </label>
                                        <div className="w-full bg-blue-50 text-blue-800 rounded-md border border-blue-200 p-2.5 text-sm font-semibold text-center">
                                            {calculatedWeightedReturn}%
                                        </div>
                                    </div>
                                </div>

                                {activePortfolio.additionalInfo && (
                                    <div className="mt-5 p-3 bg-slate-50 rounded-md border border-slate-200">
                                        <p className="text-slate-600 text-xs flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 block"></span>
                                            {activePortfolio.additionalInfo}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    {renderAllocationTable()}
                                </div>
                                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col">
                                    <h3 className="text-sm font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-3">Distribution Breakdown</h3>
                                    <div className="relative w-full grow min-h-70">
                                        <Doughnut data={doughnutData} options={doughnutOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                                    <h2 className="text-lg font-bold text-slate-900">Capital Growth Projection</h2>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-slate-500 uppercase">Target Horizon</p>
                                        <p className="text-sm font-bold text-slate-800">
                                            Year {activePortfolioKey === BUCKET_KEYS.emergency ? "2" : activePortfolioKey === BUCKET_KEYS.education ? "5" : "16"}
                                        </p>
                                    </div>
                                </div>
                        
                                <div className="h-80 relative mb-6">
                                    <Line data={lineData} options={lineOptions} />
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap justify-start items-center gap-6">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                                            Projected Value (Yr {activePortfolioKey === BUCKET_KEYS.emergency ? "2" : activePortfolioKey === BUCKET_KEYS.education ? "5" : "16"})
                                        </span>
                                        <span className="text-3xl font-bold text-blue-700">
                                            ৳{calculatedProjection[activePortfolioKey === BUCKET_KEYS.emergency ? 2 : activePortfolioKey === BUCKET_KEYS.education ? 5 : 16][1].toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    );
}