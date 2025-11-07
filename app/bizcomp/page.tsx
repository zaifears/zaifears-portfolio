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
}

interface Portfolio {
    goal: string;
    timeframe: string;
    justification: string;
    initialInvestment: string;
    expectedReturn: string;
    allocation: Asset[];
    target: number;
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
        justification: "This fund prioritizes immediate liquidity and capital preservation with a weighted return of 8.29%. BRAC Triple Benefit (20%) offers daily liquidity at 4%, BRAC FDR (60%) provides 9.75% with flexible encashment, and EDGE Income Fund (20%) targets 10.17% with 3-5 day processing.",
        initialInvestment: "500000",
        expectedReturn: "8.29",
        allocation: [
            { name: "BRAC Triple Benefit", value: 20, color: "#2563EB", returnRate: 4.0 },
            { name: "BRAC General FDR", value: 60, color: "#059669", returnRate: 9.75 },
            { name: "EDGE Income Fund", value: 20, color: "#D97706", returnRate: 10.17 }
        ],
        target: 500000
    },
    "Car Fund": {
        goal: "BDT 3,450,000",
        timeframe: "5 Years",
        justification: "60% of total available funds (BDT 1,740,000) allocated at Year 0 with diversified high-growth instruments. Portfolio includes P2P lending (Biniyog.io 16%, WeGro 22%), agriculture financing (iFarmer 19%), fixed income (One Bank 13.1%, Sanchaypatra 10.75%), mutual funds (EDGE 10%), and liquid reserves (Goldkinun 5%).",
        initialInvestment: "1740000",
        expectedReturn: "14.23",
        allocation: [
            { name: "Biniyog.io", value: 11, color: "#2563EB", returnRate: 16.0 },
            { name: "WeGro Global", value: 14, color: "#059669", returnRate: 22.0 },
            { name: "iFarmer", value: 12, color: "#D97706", returnRate: 19.0 },
            { name: "Goldkinun", value: 6, color: "#DB2777", returnRate: 5.0 },
            { name: "One Bank Double", value: 21, color: "#8B5CF6", returnRate: 13.1 },
            { name: "EDGE Growth Fund", value: 17, color: "#EC4899", returnRate: 10.0 },
            { name: "Sanchaypatra", value: 17, color: "#F59E0B", returnRate: 10.75 }
        ],
        target: 3450000
    },
    "Home Fund": {
        goal: "BDT 15,000,000",
        timeframe: "12 Years",
        justification: "This long-term portfolio maximizes growth. It takes on higher risk via stocks and alternative investments to achieve the apartment down payment goal.",
        initialInvestment: "4000000",
        expectedReturn: "12.5",
        allocation: [
            { name: "Stocks", value: 50, color: "#2563EB", returnRate: 15.0 },
            { name: "Agri-Fintech", value: 20, color: "#059669", returnRate: 12.0 },
            { name: "SME Funding", value: 10, color: "#D97706", returnRate: 10.0 },
            { name: "Digital Gold", value: 20, color: "#DB2777", returnRate: 8.0 }
        ],
        target: 15000000
    }
};

// Custom Tooltip Components for Recharts
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
        for (let year = 0; year <= 12; year++) {
            const value = initial * Math.pow(1 + rate / 100, year);
            projection.push([year, Math.round(value)]);
        }
        return projection;
    }, [activePortfolio.initialInvestment, calculatedWeightedReturn]);

    // Recharts data
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

    const handleAllocationChange = (sliderIndex: number, newValue: number) => {
        setPortfolios(prev => {
            const newAllocations = [...prev[activePortfolioKey].allocation];
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
        });
    };

    const handleReturnRateChange = (assetIndex: number, newRate: string) => {
        setPortfolios(prev => {
            const newAllocations = [...prev[activePortfolioKey].allocation];
            newAllocations[assetIndex] = {
                ...newAllocations[assetIndex],
                returnRate: parseFloat(newRate) || 0
            };
            
            return {
                ...prev,
                [activePortfolioKey]: {
                    ...prev[activePortfolioKey],
                    allocation: newAllocations
                }
            };
        });
    };

    const calculateAllocatedAmount = (percentage: number) => {
        const total = parseFloat(activePortfolio.initialInvestment) || 0;
        return Math.round(total * (percentage / 100));
    };

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
                    {/* Quick Stats */}
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

                    {/* Income & Assets Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Income Chart */}
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

                        {/* Assets Pie Chart - FIXED COLORS */}
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

                    {/* Financial Goals with Bar Chart */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
                            <span className="text-4xl">🎯</span> Financial Goals & Requirements
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Goals List */}
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
                                        <span className="text-pink-900 font-extrabold text-2xl">৳3,000,000</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-800">5 Years - No loan interest</p>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl border-l-4 border-orange-600 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-extrabold text-gray-900 text-xl">🏠 Apartment Down Payment</h4>
                                        <span className="text-orange-900 font-extrabold text-2xl">৳15,000,000</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-800">Down in 5 yrs; rest in 12 yrs</p>
                                </div>

                                <div className="p-7 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl border-3 border-blue-600 shadow-xl">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-extrabold text-gray-900 text-2xl">Total Requirements</h4>
                                        <span className="text-blue-900 font-extrabold text-3xl">৳18,500,000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bar Chart Visualization */}
                            <div className="flex items-center justify-center">
                                <div className="h-full w-full">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart 
                                            data={[
                                                { name: 'Emergency Fund', value: 500000, fill: '#8B5CF6' },
                                                { name: 'Car Purchase', value: 3000000, fill: '#EC4899' },
                                                { name: 'Apartment', value: 15000000, fill: '#F59E0B' }
                                            ]}
                                            layout="vertical"
                                            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
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
                                                width={110}
                                            />
                                            <RechartsTooltip content={<CustomBarTooltip />} />
                                            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                                                {[
                                                    { name: 'Emergency Fund', value: 500000, fill: '#8B5CF6' },
                                                    { name: 'Car Purchase', value: 3000000, fill: '#EC4899' },
                                                    { name: 'Apartment', value: 15000000, fill: '#F59E0B' }
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

                    {/* Investment Options & Risk Profile Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Investment Options */}
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

                        {/* Risk Profile & Strategic Tasks */}
                        <div className="space-y-6">
                            {/* Risk Profile */}
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

                            {/* Strategic Tasks */}
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
                                        <span>Calculate Required Rate of Return (RRR) for Car and Apartment</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Research alternative investment ecosystem</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Compare returns, risk, and liquidity of investments</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>Design diversified portfolio (Traditional + Alternative assets)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-800 font-semibold text-base">
                                        <span className="text-blue-600 font-bold text-lg">•</span>
                                        <span>10-year Financial Projection and Goal Feasibility</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : useNewLayout ? (
                // EMERGENCY & CAR FUND (NO CHANGES)
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="initialInvestment" className="block text-base font-extrabold text-gray-900 mb-2">
                                    Initial Investment (BDT)
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
                                    Weighted Average Return (%)
                                </label>
                                <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-950 rounded-xl border-3 border-blue-500 p-3 text-xl font-extrabold shadow-lg">
                                    {calculatedWeightedReturn}%
                                </div>
                                <p className="text-sm font-bold text-gray-700 mt-2">Auto-calculated</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300">
                            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Asset Allocation</h3>
                            <div className="space-y-5">
                                {activePortfolio.allocation.map((asset, index) => (
                                    <div key={asset.name} className="border-2 border-gray-300 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor={asset.name} className="font-extrabold text-base" style={{color: asset.color}}>
                                                {asset.name}
                                            </label>
                                            <div className="text-right">
                                                <div className="text-gray-900 font-extrabold text-xl">{asset.value.toFixed(1)}%</div>
                                                <div className="text-sm text-gray-700 font-bold">
                                                    ৳{calculateAllocatedAmount(asset.value).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            name={asset.name}
                                            id={asset.name}
                                            min="0"
                                            max="100"
                                            value={asset.value}
                                            onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                                            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer mb-3 shadow-inner"
                                            style={{ accentColor: asset.color }}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-900 font-extrabold">Return Rate:</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={asset.returnRate}
                                                onChange={(e) => handleReturnRateChange(index, e.target.value)}
                                                onFocus={(e) => e.target.select()}
                                                className="w-24 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-3 py-2 text-base font-extrabold focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-extrabold text-gray-900">%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-7 rounded-2xl shadow-xl border-2 border-gray-300 flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Portfolio Distribution</h3>
                            <div className="relative h-96 w-full">
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">📈 Projected Growth</h2>
                        
                        <div className="h-80 relative mb-6 bg-gray-50 p-4 rounded-xl">
                            <Line data={lineData} options={lineOptions} />
                        </div>

                        <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl flex flex-wrap justify-between items-center gap-6 border-3 border-cyan-500 shadow-lg">
                            <div>
                                <span className="text-base font-bold text-gray-800 block mb-1">
                                    Projected Value at Year {activePortfolioKey === "Car Fund" ? "5" : "12"}
                                </span>
                                <span className="text-4xl font-extrabold text-cyan-700">
                                    ৳{calculatedProjection[activePortfolioKey === "Car Fund" ? 5 : 12][1].toLocaleString()}
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
                // HOME FUND (NO CHANGES)
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <div className="lg:col-span-1 bg-white p-7 rounded-2xl shadow-xl flex flex-col gap-6 border-2 border-gray-300">
                        <div>
                            <h2 className="text-2xl font-extrabold mb-2 text-gray-900">{activePortfolioKey}</h2>
                            <span className="text-base font-bold text-blue-700">
                                Goal: {activePortfolio.goal} ({activePortfolio.timeframe})
                            </span>
                        </div>
                        
                        <div className="p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-lg font-extrabold mb-2 text-gray-900">Rationale:</h3>
                            <p className="text-gray-800 text-sm font-semibold leading-relaxed">
                                {activePortfolio.justification}
                            </p>
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-base font-extrabold text-gray-900 mb-2">
                                    Initial Investment (BDT)
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
                                    Weighted Return (%)
                                </label>
                                <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-950 rounded-xl border-3 border-blue-500 p-3 text-xl font-extrabold shadow-lg">
                                    {calculatedWeightedReturn}%
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-extrabold mb-4 text-gray-900">Asset Allocation</h3>
                                <div className="space-y-4">
                                    {activePortfolio.allocation.map((asset, index) => (
                                        <div key={asset.name} className="border-2 border-gray-300 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white shadow-md">
                                            <div className="flex justify-between mb-2">
                                                <label className="font-extrabold text-sm" style={{color: asset.color}}>
                                                    {asset.name}
                                                </label>
                                                <span className="text-gray-900 font-extrabold text-base">{asset.value.toFixed(1)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={asset.value}
                                                onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                                                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer mb-2"
                                                style={{ accentColor: asset.color }}
                                            />
                                            <div className="flex items-center gap-2">
                                                <label className="text-xs text-gray-900 font-extrabold">Return:</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={asset.returnRate}
                                                    onChange={(e) => handleReturnRateChange(index, e.target.value)}
                                                    onFocus={(e) => e.target.select()}
                                                    className="w-20 bg-gray-50 text-gray-900 rounded-lg border-2 border-gray-400 px-2 py-1 text-sm font-extrabold"
                                                />
                                                <span className="text-xs font-extrabold">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative h-72 w-72 mx-auto mt-4">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300">
                        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">📈 Projected Growth</h2>
                        
                        <div className="h-80 relative mb-6 bg-gray-50 p-4 rounded-xl">
                            <Line data={lineData} options={lineOptions} />
                        </div>

                        <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl flex flex-wrap justify-between items-center gap-6 border-3 border-cyan-500 shadow-lg">
                            <div>
                                <span className="text-base font-bold text-gray-800 block mb-1">
                                    Projected Year {activePortfolioKey === "Car Fund" ? "5" : "12"}
                                </span>
                                <span className="text-4xl font-extrabold text-cyan-700">
                                    ৳{calculatedProjection[activePortfolioKey === "Car Fund" ? 5 : 12][1].toLocaleString()}
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
            )}
        </div>
    );
}
