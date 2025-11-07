"use client";

import React, { useState, useMemo } from 'react';
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
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

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
    initialInvestment: string;
    expectedReturn: string;
    allocation: Asset[];
    target: number;
    additionalInfo?: string;
}

const initialPortfolioData: Record<string, Portfolio> = {
    "Overview": {
        goal: "Financial Snapshot",
        timeframe: "Current Status",
        justification: "Overview of Nafis's complete financial situation",
        initialInvestment: "0",
        expectedReturn: "0",
        allocation: [],
        target: 0
    },
    "Emergency Fund": {
        goal: "BDT 500,000",
        timeframe: "Ongoing",
        justification: "This fund prioritizes immediate liquidity and capital preservation with a weighted return of 8.68%. BRAC Triple Benefit (20%) offers daily liquidity at 4%, BRAC FDR (60%) provides 9.75% with flexible encashment, and EDGE Income Fund (20%) targets 10.17% with 3-5 day processing.",
        initialInvestment: "500000",
        expectedReturn: "8.68",
        allocation: [
            { name: "BRAC Triple Benefit", value: 20, color: "#2563EB", returnRate: 4.0, amount: 100000 },
            { name: "BRAC General FDR", value: 60, color: "#059669", returnRate: 9.75, amount: 300000 },
            { name: "EDGE Income Fund", value: 20, color: "#D97706", returnRate: 10.17, amount: 100000 }
        ],
        target: 500000,
        additionalInfo: "Portfolio Return: 8.68%"
    },
    "Car Fund": {
        goal: "BDT 3,450,000",
        timeframe: "5 Years",
        justification: "25% of total available funds (BDT 725,000) allocated at Year 0 with diversified high-growth instruments achieving 18.42% portfolio return. The remaining funds will be generated through systematic annual savings invested in BRAC Monthly DPS.",
        initialInvestment: "725000",
        expectedReturn: "18.42",
        allocation: [
            { name: "UCB Income Plus MF", value: 18, color: "#10B981", returnRate: 20.0, amount: 130000 },
            { name: "WeGro Global", value: 14, color: "#F59E0B", returnRate: 22.0, amount: 105000 },
            { name: "iFarmer", value: 15, color: "#F59E0B", returnRate: 19.0, amount: 108000 },
            { name: "VIPB Fixed Income", value: 28, color: "#8B5CF6", returnRate: 22.0, amount: 200000 },
            { name: "Sanchaypatra (5yr)", value: 25, color: "#10B981", returnRate: 9.5, amount: 180000 }
        ],
        target: 3450000,
        additionalInfo: "Portfolio A Return: 18.42% | Total Available at Year 5: 5,463,309.51৳"
    },
    "Home Fund": {
        goal: "BDT 7,940,490",
        timeframe: "8 Years (Down Payment)",
        justification: "Long-term aggressive portfolio starting with BDT 2,175,000 at Year 0, plus 1M after 6 months, and remaining 2,013,309.51 from Car Fund at Year 5. Portfolio B achieves 17.93% return through diversified high-growth instruments including P2P lending, agriculture financing, equity funds, and fixed income.",
        initialInvestment: "2175000",
        expectedReturn: "17.93",
        allocation: [
            { name: "Biniyog.io", value: 6, color: "#F59E0B", returnRate: 16.0, amount: 175000 },
            { name: "WeGro Global", value: 14, color: "#F59E0B", returnRate: 22.0, amount: 400000 },
            { name: "iFarmer", value: 12, color: "#F59E0B", returnRate: 19.0, amount: 300000 },
            { name: "Gold Kinun", value: 2, color: "#EF4444", returnRate: 5.0, amount: 0 },
            { name: "One Bank Double", value: 10, color: "#10B981", returnRate: 13.1, amount: 500000 },
            { name: "UCB Income Plus MF", value: 15, color: "#10B981", returnRate: 20.0, amount: 200000 },
            { name: "EDGE Growth Fund", value: 11, color: "#10B981", returnRate: 20.0, amount: 200000 },
            { name: "VIPB Fixed Income", value: 17, color: "#8B5CF6", returnRate: 22.0, amount: 300000 },
            { name: "Sanchaypatra (5yr)", value: 14, color: "#10B981", returnRate: 9.5, amount: 300000 }
        ],
        target: 7940490,
        additionalInfo: "Portfolio B Return: 17.93% | Total at Year 8: 17,830,895.10৳ | Required Down Payment: 7,940,490.60৳"
    }
};

const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border-3 border-blue-500 rounded-lg p-4 shadow-xl">
                <p className="text-gray-900 font-extrabold text-lg">{payload[0].name}</p>
                <p className="text-blue-700 font-bold text-xl">৳{payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border-3 border-blue-500 rounded-lg p-4 shadow-xl">
                <p className="text-gray-900 font-extrabold text-lg">{payload[0].name}</p>
                <p className="text-blue-700 font-bold text-xl">৳{payload[0].value.toLocaleString()}</p>
                <p className="text-gray-700 font-semibold text-base">{((payload[0].value / 5200000) * 100).toFixed(1)}%</p>
            </div>
        );
    }
    return null;
};

export default function FinancialDashboard() {
    const [portfolios, setPortfolios] = useState(initialPortfolioData);
    const [activePortfolioKey, setActivePortfolioKey] = useState("Overview");
    
    const activePortfolio = portfolios[activePortfolioKey];

    const calculatedWeightedReturn = useMemo(() => {
        if (activePortfolio.allocation.length === 0) return "0.00";
        const weightedSum = activePortfolio.allocation.reduce((sum, asset) => {
            return sum + (asset.value / 100) * asset.returnRate;
        }, 0);
        return weightedSum.toFixed(2);
    }, [activePortfolio.allocation]);

    const calculatedProjection = useMemo(() => {
        const { initialInvestment } = activePortfolio;
        const initial = parseFloat(initialInvestment) || 0;
        const rate = parseFloat(calculatedWeightedReturn) || 0;
        
        const projection = [];
        const years = activePortfolioKey === "Car Fund" ? 5 : activePortfolioKey === "Home Fund" ? 8 : 12;
        for (let year = 0; year <= years; year++) {
            const value = initial * Math.pow(1 + rate / 100, year);
            projection.push([year, Math.round(value)]);
        }
        return projection;
    }, [activePortfolio.initialInvestment, calculatedWeightedReturn, activePortfolioKey]);

    const incomeExpenseData = [
        { name: 'Income', value: 90000, fill: '#10B981' },
        { name: 'Expense', value: 68000, fill: '#EF4444' },
        { name: 'Savings', value: 22000, fill: '#3B82F6' },
    ];

    const assetsChartData = [
        { name: 'Savings', value: 200000, fill: '#3B82F6' },
        { name: 'FDR', value: 1000000, fill: '#10B981' },
        { name: 'Gold', value: 4000000, fill: '#F59E0B' },
    ];

    const doughnutData = {
        labels: activePortfolio.allocation.map(a => a.name),
        datasets: [{
            data: activePortfolio.allocation.map(a => a.value),
            backgroundColor: activePortfolio.allocation.map(a => a.color),
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 10
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { 
                    color: '#000000',
                    padding: 18,
                    font: { 
                        family: "'Inter', sans-serif", 
                        size: 15,
                        weight: 'bold' as const
                    },
                    boxWidth: 25,
                    boxHeight: 25
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: ${context.raw.toFixed(1)}%`
                },
                titleFont: { size: 16, weight: 'bold' as const },
                bodyFont: { size: 15, weight: 'bold' as const },
                padding: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#3B82F6',
                borderWidth: 3
            }
        }
    };

    const lineData = {
        labels: calculatedProjection.map(p => `Year ${p[0]}`),
        datasets: [{
            label: 'Projected Value',
            data: calculatedProjection.map(p => p[1]),
            borderColor: '#0EA5E9',
            backgroundColor: 'rgba(14, 165, 233, 0.25)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#0EA5E9',
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 3,
            pointHoverBorderColor: 'white',
            borderWidth: 3
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: { 
                    color: '#000000',
                    font: { size: 14, weight: 'bold' as const },
                    callback: (value: any) => '৳' + (Number(value) / 1000000).toFixed(1) + 'M' 
                },
                grid: { color: 'rgba(59, 130, 246, 0.2)', lineWidth: 2 }
            },
            x: { 
                ticks: { color: '#000000', font: { size: 13, weight: 'bold' as const } },
                grid: { display: false }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                titleFont: { size: 15, weight: 'bold' as const },
                bodyFont: { size: 14, weight: 'bold' as const },
                padding: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#3B82F6',
                borderWidth: 3,
                callbacks: {
                    label: (context: any) => `Value: ৳${context.raw.toLocaleString()}`
                }
            }
        }
    };

    const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPortfolios(prev => ({
            ...prev,
            [activePortfolioKey]: {
                ...prev[activePortfolioKey],
                [name]: value
            }
        }));
    };

    const handleAllocationChange = (sliderIndex: number, field: 'value' | 'returnRate' | 'amount', newValue: number) => {
        setPortfolios(prev => {
            const newAllocations = [...prev[activePortfolioKey].allocation];
            
            if (field === 'value') {
                newAllocations[sliderIndex] = {
                    ...newAllocations[sliderIndex],
                    value: newValue
                };

                const newTotal = newAllocations.reduce((sum, asset) => sum + asset.value, 0);
                const normalizedAllocations = newTotal > 0 ? newAllocations.map(asset => ({
                    ...asset,
                    value: (asset.value / newTotal) * 100
                })) : newAllocations.map(asset => ({ 
                    ...asset, 
                    value: 100 / newAllocations.length 
                }));
                
                return {
                    ...prev,
                    [activePortfolioKey]: {
                        ...prev[activePortfolioKey],
                        allocation: normalizedAllocations
                    }
                };
            } else {
                newAllocations[sliderIndex] = {
                    ...newAllocations[sliderIndex],
                    [field]: newValue
                };
                
                return {
                    ...prev,
                    [activePortfolioKey]: {
                        ...prev[activePortfolioKey],
                        allocation: newAllocations
                    }
                };
            }
        });
    };

    const totalAllocatedAmount = useMemo(() => {
        return activePortfolio.allocation.reduce((sum, asset) => sum + asset.amount, 0);
    }, [activePortfolio.allocation]);

    const isOverview = activePortfolioKey === "Overview";
    const useNewLayout = activePortfolioKey === "Emergency Fund" || activePortfolioKey === "Car Fund";

    return (
        <div className="bg-gradient-to-br from-slate-100 to-blue-100 text-gray-900 p-6 md:p-10 min-h-screen font-sans">
            <header className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 mb-3 drop-shadow-lg">
                    Nafis's Financial Plan
                </h1>
                <p className="text-xl font-bold text-gray-800">
                    Interactive Portfolio Dashboard
                </p>
            </header>

            <div className="mb-8 flex flex-wrap justify-center gap-3">
                {Object.keys(portfolios).map(name => (
                    <button
                        key={name}
                        onClick={() => setActivePortfolioKey(name)}
                        className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 shadow-lg ${
                            activePortfolioKey === name 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl transform scale-105' 
                                : 'bg-white text-gray-800 hover:shadow-xl hover:scale-105 border-2 border-gray-300'
                        }`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {isOverview ? (
                // OVERVIEW TAB
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-4xl mb-3">💼</div>
                            <div className="text-base font-semibold mb-1">Yearly Income</div>
                            <div className="text-3xl font-extrabold">৳1.08M</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-4xl mb-3">💰</div>
                            <div className="text-base font-semibold mb-1">Yearly Savings</div>
                            <div className="text-3xl font-extrabold">৳264K</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-4xl mb-3">🏦</div>
                            <div className="text-base font-semibold mb-1">Total Assets</div>
                            <div className="text-3xl font-extrabold">৳5.2M</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-4xl mb-3">🎯</div>
                            <div className="text-base font-semibold mb-1">Goal Target</div>
                            <div className="text-3xl font-extrabold">৳18.5M</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-300">
                            <h3 className="text-2xl font-extrabold mb-5 text-gray-900 flex items-center gap-2">
                                <span className="text-3xl">💰</span> Income & Expenses
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={incomeExpenseData} margin={{ top: 20, right: 20, left: 10, bottom: 30 }}>
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fill: '#000000', fontSize: 14, fontWeight: 'bold' }}
                                            stroke="#000000"
                                            strokeWidth={2}
                                        />
                                        <YAxis 
                                            tick={{ fill: '#000000', fontSize: 14, fontWeight: 'bold' }}
                                            stroke="#000000"
                                            strokeWidth={2}
                                            tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}K`}
                                        />
                                        <RechartsTooltip content={<CustomBarTooltip />} />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={70}>
                                            {incomeExpenseData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-300">
                            <h3 className="text-2xl font-extrabold mb-5 text-gray-900 flex items-center gap-2">
                                <span className="text-3xl">🏦</span> Current Assets
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={assetsChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={{
                                                stroke: '#000000',
                                                strokeWidth: 2
                                            }}
                                            label={(entry: any) => {
                                                const percent = entry.percent as number;
                                                return `${entry.name}: ${(percent * 100).toFixed(0)}%`;
                                            }}
                                            outerRadius={110}
                                            dataKey="value"
                                        >
                                            {assetsChartData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={entry.fill} 
                                                    stroke="#fff" 
                                                    strokeWidth={4} 
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip content={<CustomPieTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                            <span className="text-4xl">🎯</span> Financial Goals & Requirements
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-5">
                                <div className="p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl border-l-4 border-purple-600 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-extrabold text-gray-900 text-xl">🛡️ Emergency Fund</h4>
                                        <span className="text-purple-900 font-extrabold text-2xl">৳500,000</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-800">Immediate access for emergencies</p>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl border-l-4 border-pink-600 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-extrabold text-gray-900 text-xl">🚗 Car Purchase</h4>
                                        <span className="text-pink-900 font-extrabold text-2xl">৳3,450,000</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-800">5 Years - No loan interest</p>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl border-l-4 border-orange-600 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-extrabold text-gray-900 text-xl">🏠 Home Down Payment</h4>
                                        <span className="text-orange-900 font-extrabold text-2xl">৳7,940,490</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-800">8 Years for down payment</p>
                                </div>

                                <div className="p-7 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl border-3 border-blue-600 shadow-xl">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-extrabold text-gray-900 text-2xl">Total Requirements</h4>
                                        <span className="text-blue-900 font-extrabold text-3xl">৳11,890,490</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="h-full w-full">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart 
                                            data={[
                                                { name: 'Emergency', value: 500000, fill: '#8B5CF6' },
                                                { name: 'Car', value: 3450000, fill: '#EC4899' },
                                                { name: 'Home Down', value: 7940490, fill: '#F59E0B' }
                                            ]}
                                            layout="vertical"
                                            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                                        >
                                            <XAxis 
                                                type="number" 
                                                tick={{ fill: '#000000', fontSize: 13, fontWeight: 'bold' }}
                                                stroke="#000000"
                                                strokeWidth={2}
                                                tickFormatter={(value) => `৳${(value / 1000000).toFixed(1)}M`}
                                            />
                                            <YAxis 
                                                type="category" 
                                                dataKey="name" 
                                                tick={{ fill: '#000000', fontSize: 14, fontWeight: 'bold' }}
                                                stroke="#000000"
                                                strokeWidth={2}
                                                width={90}
                                            />
                                            <RechartsTooltip content={<CustomBarTooltip />} />
                                            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                                                {[
                                                    { name: 'Emergency', value: 500000, fill: '#8B5CF6' },
                                                    { name: 'Car', value: 3450000, fill: '#EC4899' },
                                                    { name: 'Home Down', value: 7940490, fill: '#F59E0B' }
                                                ].map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                            <h3 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                                <span className="text-4xl">📊</span> Investment Options
                            </h3>
                            <div className="space-y-5">
                                <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-l-4 border-red-600 shadow-md">
                                    <h4 className="font-extrabold text-red-700 text-lg mb-2">Equity, Risky</h4>
                                    <p className="text-gray-800 font-semibold">Stocks, Mutual Funds</p>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-600 shadow-md">
                                    <h4 className="font-extrabold text-green-700 text-lg mb-2">Fixed Income, Safer</h4>
                                    <p className="text-gray-800 font-semibold">Bonds, Treasury Notes, National Savings Certificates</p>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-600 shadow-md">
                                    <h4 className="font-extrabold text-blue-700 text-lg mb-2">Steady, Limited Return</h4>
                                    <p className="text-gray-800 font-semibold">Fixed Deposits</p>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-600 shadow-md">
                                    <h4 className="font-extrabold text-purple-700 text-lg mb-2">Fintech Options</h4>
                                    <p className="text-gray-800 font-semibold">WeGro, iFarmer, Biniyog.io, Goldkinun, FreshieFarm</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-red-100 to-orange-100 p-7 rounded-2xl shadow-xl border-3 border-red-500">
                                <h3 className="text-2xl font-extrabold mb-4 text-gray-900 flex items-center gap-2">
                                    <span className="text-3xl">⚠️</span> Risk Profile
                                </h3>
                                <div className="p-5 bg-white/90 rounded-xl shadow-inner">
                                    <h4 className="font-extrabold text-red-700 text-xl mb-3">Risk Appetite: HIGH 📈</h4>
                                    <p className="text-gray-900 text-lg font-bold">
                                        Nafis has a high capacity for risk. Does not want to lose more than <span className="text-red-700 text-xl">15%</span> in any given year.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300">
                                <h3 className="text-2xl font-extrabold mb-5 text-gray-900 flex items-center gap-2">
                                    <span className="text-3xl">📋</span> Strategic Tasks
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Investor Profiling</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Calculate Required Rate of Return (RRR)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Research alternative investment ecosystem</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Compare returns, risk, and liquidity</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Design diversified portfolio</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Financial Projection & Feasibility</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : useNewLayout ? (
                // EMERGENCY & CAR FUND
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-400">
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold mb-2 text-gray-900">{activePortfolioKey}</h2>
                            <span className="text-lg font-bold text-blue-700">
                                Goal: {activePortfolio.goal} ({activePortfolio.timeframe})
                            </span>
                        </div>
                        
                        <div className="mb-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-extrabold mb-3 text-gray-900">Allocation Rationale:</h3>
                            <p className="text-gray-800 text-base font-semibold leading-relaxed">
                                {activePortfolio.justification}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="initialInvestment" className="block text-base font-extrabold text-gray-900 mb-2">
                                    Initial Investment (৳)
                                </label>
                                <input
                                    type="text"
                                    name="initialInvestment"
                                    id="initialInvestment"
                                    value={activePortfolio.initialInvestment}
                                    onChange={handlePortfolioChange}
                                    onFocus={(e) => e.target.select()}
                                    className="w-full bg-gray-50 text-gray-900 rounded-xl border-3 border-gray-400 p-3 text-xl font-extrabold focus:ring-3 focus:ring-blue-500 focus:border-blue-500 shadow-inner"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-base font-extrabold text-gray-900 mb-2">
                                    Portfolio Return (%)
                                </label>
                                <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-950 rounded-xl border-3 border-blue-500 p-3 text-xl font-extrabold shadow-lg">
                                    {calculatedWeightedReturn}%
                                </div>
                            </div>
                        </div>

                        {activePortfolio.additionalInfo && (
                            <div className="p-4 bg-yellow-100 rounded-xl border-2 border-yellow-500 mb-6">
                                <p className="text-gray-900 font-bold text-sm">{activePortfolio.additionalInfo}</p>
                            </div>
                        )}
                    </div>

                    {/* Table + Donut Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-extrabold text-gray-900">Asset Allocation Details</h3>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-600">Total Allocated</p>
                                    <p className="text-2xl font-extrabold text-blue-600">৳{totalAllocatedAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-gray-300">
                                            <th className="p-3 text-left font-extrabold text-gray-900 border-r-2 border-gray-300">Instrument</th>
                                            <th className="p-3 text-center font-extrabold text-gray-900 border-r-2 border-gray-300">Allocation %</th>
                                            <th className="p-3 text-center font-extrabold text-gray-900 border-r-2 border-gray-300">Return %</th>
                                            <th className="p-3 text-right font-extrabold text-gray-900">Amount (৳)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activePortfolio.allocation.map((asset, index) => (
                                            <tr key={asset.name} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 border-r-2 border-gray-200">
                                                    <input
                                                        type="text"
                                                        value={asset.name}
                                                        onChange={(e) => {
                                                            setPortfolios(prev => {
                                                                const newAllocations = [...prev[activePortfolioKey].allocation];
                                                                newAllocations[index] = {
                                                                    ...newAllocations[index],
                                                                    name: e.target.value
                                                                };
                                                                return {
                                                                    ...prev,
                                                                    [activePortfolioKey]: {
                                                                        ...prev[activePortfolioKey],
                                                                        allocation: newAllocations
                                                                    }
                                                                };
                                                            });
                                                        }}
                                                        className="w-full bg-transparent font-extrabold text-base border-none focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2"
                                                        style={{color: asset.color}}
                                                    />
                                                </td>
                                                <td className="p-4 border-r-2 border-gray-200">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={asset.value}
                                                            onChange={(e) => handleAllocationChange(index, 'value', Number(e.target.value))}
                                                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                            style={{ accentColor: asset.color }}
                                                        />
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            value={asset.value.toFixed(1)}
                                                            onChange={(e) => handleAllocationChange(index, 'value', parseFloat(e.target.value) || 0)}
                                                            onFocus={(e) => e.target.select()}
                                                            className="w-20 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-300 px-2 py-1 text-base font-extrabold text-center focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="p-4 border-r-2 border-gray-200">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={asset.returnRate}
                                                        onChange={(e) => handleAllocationChange(index, 'returnRate', parseFloat(e.target.value) || 0)}
                                                        onFocus={(e) => e.target.select()}
                                                        className="w-24 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-3 py-2 text-base font-extrabold focus:ring-2 focus:ring-blue-500 mx-auto block text-center"
                                                    />
                                                </td>
                                                <td className="p-4 text-right">
                                                    <input
                                                        type="number"
                                                        step="1000"
                                                        value={asset.amount}
                                                        onChange={(e) => handleAllocationChange(index, 'amount', parseFloat(e.target.value) || 0)}
                                                        onFocus={(e) => e.target.select()}
                                                        className="w-40 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-3 py-2 text-base font-extrabold focus:ring-2 focus:ring-blue-500 text-right"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold border-t-4 border-gray-400">
                                            <td className="p-4 text-lg border-r-2 border-gray-300">Total</td>
                                            <td className="p-4 text-center text-lg border-r-2 border-gray-300">100%</td>
                                            <td className="p-4 text-center text-lg text-blue-700 border-r-2 border-gray-300">{calculatedWeightedReturn}%</td>
                                            <td className="p-4 text-right text-lg text-blue-700">৳{totalAllocatedAmount.toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Donut Chart - Right Side with FIXED HEIGHT */}
                        <div className="lg:col-span-1 bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300 flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Distribution</h3>
                            <div className="relative w-full" style={{ height: '450px' }}>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Growth Projection - Full Width */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">📈 Projected Growth</h2>
                        
                        <div className="h-96 relative mb-6 bg-gray-50 p-4 rounded-xl">
                            <Line data={lineData} options={lineOptions} />
                        </div>

                        <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl flex flex-wrap justify-between items-center gap-6 border-3 border-cyan-500 shadow-lg">
                            <div>
                                <span className="text-base font-bold text-gray-800 block mb-1">
                                    Projected at Year {activePortfolioKey === "Car Fund" ? "5" : "8"}
                                </span>
                                <span className="text-4xl font-extrabold text-cyan-700">
                                    ৳{calculatedProjection[activePortfolioKey === "Car Fund" ? 5 : 8][1].toLocaleString()}
                                </span>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="text-base font-bold text-gray-800 block mb-1">Target Value</span>
                                <span className="text-2xl font-extrabold text-gray-900">
                                    ৳{activePortfolio.target.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // HOME FUND - LONGER SLIDERS
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-400">
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold mb-2 text-gray-900">{activePortfolioKey}</h2>
                            <span className="text-lg font-bold text-blue-700">
                                Goal: {activePortfolio.goal} ({activePortfolio.timeframe})
                            </span>
                        </div>
                        
                        <div className="mb-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-extrabold mb-3 text-gray-900">Allocation Rationale:</h3>
                            <p className="text-gray-800 text-base font-semibold leading-relaxed">
                                {activePortfolio.justification}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-base font-extrabold text-gray-900 mb-2">
                                    Year 0 Investment (৳)
                                </label>
                                <input
                                    type="text"
                                    name="initialInvestment"
                                    value={activePortfolio.initialInvestment}
                                    onChange={handlePortfolioChange}
                                    onFocus={(e) => e.target.select()}
                                    className="w-full bg-gray-50 text-gray-900 rounded-xl border-3 border-gray-400 p-3 text-xl font-extrabold focus:ring-3 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-base font-extrabold text-gray-900 mb-2">
                                    Portfolio Return (%)
                                </label>
                                <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-950 rounded-xl border-3 border-blue-500 p-3 text-xl font-extrabold shadow-lg">
                                    {calculatedWeightedReturn}%
                                </div>
                            </div>
                        </div>

                        {activePortfolio.additionalInfo && (
                            <div className="p-4 bg-yellow-100 rounded-xl border-2 border-yellow-500">
                                <p className="text-gray-900 font-bold text-sm">{activePortfolio.additionalInfo}</p>
                            </div>
                        )}
                    </div>

                    {/* Portfolio B Table - Full Width with LONGER SLIDERS */}
                    <div className="bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-extrabold text-gray-900">Portfolio B - Asset Allocation</h3>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-600">Total Allocated</p>
                                <p className="text-2xl font-extrabold text-blue-600">৳{totalAllocatedAmount.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-gray-300">
                                        <th className="p-3 text-left font-extrabold text-gray-900 border-r-2 border-gray-300 w-1/4">Instrument</th>
                                        <th className="p-3 text-center font-extrabold text-gray-900 border-r-2 border-gray-300 w-1/3">Allocation %</th>
                                        <th className="p-3 text-center font-extrabold text-gray-900 border-r-2 border-gray-300 w-1/6">Return %</th>
                                        <th className="p-3 text-right font-extrabold text-gray-900 w-1/4">Amount (৳)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activePortfolio.allocation.map((asset, index) => (
                                        <tr key={asset.name} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 border-r-2 border-gray-200">
                                                <input
                                                    type="text"
                                                    value={asset.name}
                                                    onChange={(e) => {
                                                        setPortfolios(prev => {
                                                            const newAllocations = [...prev[activePortfolioKey].allocation];
                                                            newAllocations[index] = {
                                                                ...newAllocations[index],
                                                                name: e.target.value
                                                            };
                                                            return {
                                                                ...prev,
                                                                [activePortfolioKey]: {
                                                                    ...prev[activePortfolioKey],
                                                                    allocation: newAllocations
                                                                }
                                                            };
                                                        });
                                                    }}
                                                    className="w-full bg-transparent font-extrabold text-base border-none focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2"
                                                    style={{color: asset.color}}
                                                />
                                            </td>
                                            <td className="p-4 border-r-2 border-gray-200">
                                                <div className="flex flex-col items-center gap-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={asset.value}
                                                        onChange={(e) => handleAllocationChange(index, 'value', Number(e.target.value))}
                                                        className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                                        style={{ accentColor: asset.color }}
                                                    />
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={asset.value.toFixed(1)}
                                                        onChange={(e) => handleAllocationChange(index, 'value', parseFloat(e.target.value) || 0)}
                                                        onFocus={(e) => e.target.select()}
                                                        className="w-20 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-300 px-2 py-1 text-base font-extrabold text-center focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 border-r-2 border-gray-200">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={asset.returnRate}
                                                    onChange={(e) => handleAllocationChange(index, 'returnRate', parseFloat(e.target.value) || 0)}
                                                    onFocus={(e) => e.target.select()}
                                                    className="w-24 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-3 py-2 text-base font-extrabold focus:ring-2 focus:ring-blue-500 mx-auto block text-center"
                                                />
                                            </td>
                                            <td className="p-4 text-right">
                                                <input
                                                    type="number"
                                                    step="1000"
                                                    value={asset.amount}
                                                    onChange={(e) => handleAllocationChange(index, 'amount', parseFloat(e.target.value) || 0)}
                                                    onFocus={(e) => e.target.select()}
                                                    className="w-40 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-3 py-2 text-base font-extrabold focus:ring-2 focus:ring-blue-500 text-right"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold border-t-4 border-gray-400">
                                        <td className="p-4 text-lg border-r-2 border-gray-300">Total</td>
                                        <td className="p-4 text-center text-lg border-r-2 border-gray-300">100%</td>
                                        <td className="p-4 text-center text-lg text-blue-700 border-r-2 border-gray-300">{calculatedWeightedReturn}%</td>
                                        <td className="p-4 text-right text-lg text-blue-700">৳{totalAllocatedAmount.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Charts Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300 flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Visual Distribution</h3>
                            <div className="relative w-full" style={{ height: '400px' }}>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">📈 Growth Projection</h2>
                            
                            <div className="h-80 relative mb-6 bg-gray-50 p-4 rounded-xl">
                                <Line data={lineData} options={lineOptions} />
                            </div>

                            <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl flex flex-wrap justify-between items-center gap-6 border-3 border-cyan-500 shadow-lg">
                                <div>
                                    <span className="text-base font-bold text-gray-800 block mb-1">
                                        Projected Year 8
                                    </span>
                                    <span className="text-4xl font-extrabold text-cyan-700">
                                        ৳{calculatedProjection[8][1].toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-left sm:text-right">
                                    <span className="text-base font-bold text-gray-800 block mb-1">Target Value</span>
                                    <span className="text-2xl font-extrabold text-gray-900">
                                        ৳{activePortfolio.target.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
