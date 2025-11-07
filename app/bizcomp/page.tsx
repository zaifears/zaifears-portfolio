"use client";

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
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
        justification: "Overview of Nafis's complete financial situation including income, expenses, assets, and goals.",
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
            { name: "BRAC Triple Benefit Savings", value: 20, color: "#2563EB", returnRate: 4.0 },
            { name: "BRAC General FDR", value: 60, color: "#059669", returnRate: 9.75 },
            { name: "EDGE Income Fund", value: 20, color: "#D97706", returnRate: 10.17 }
        ],
        target: 500000
    },
    "5-Year Car Fund": {
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
            { name: "One Bank Double Benefit", value: 21, color: "#8B5CF6", returnRate: 13.1 },
            { name: "EDGE AMC Growth Fund", value: 17, color: "#EC4899", returnRate: 10.0 },
            { name: "5-Year Sanchaypatra", value: 17, color: "#F59E0B", returnRate: 10.75 }
        ],
        target: 3450000
    },
    "12-Year Apartment Fund": {
        goal: "BDT 15,000,000 (Future Value)",
        timeframe: "12 Years",
        justification: "This long-term portfolio maximizes growth. It takes on higher risk via stocks and alternative investments.",
        initialInvestment: "4000000",
        expectedReturn: "12.5",
        allocation: [
            { name: "Stocks", value: 50, color: "#2563EB", returnRate: 15.0 },
            { name: "Agri-Fintech", value: 20, color: "#059669", returnRate: 12.0 },
            { name: "SME Funding", value: 10, color: "#D97706", returnRate: 10.0 },
            { name: "Digital Gold", value: 20, color: "#DB2777", returnRate: 8.0 }
        ],
        target: 15583904
    }
};

export default function FinancialDashboard() {
    const [portfolios, setPortfolios] = useState(initialPortfolioData);
    const [activePortfolioKey, setActivePortfolioKey] = useState("Overview");
    
    const activePortfolio = portfolios[activePortfolioKey];

    // Calculate weighted average return based on allocation and individual returns
    const calculatedWeightedReturn = useMemo(() => {
        if (activePortfolio.allocation.length === 0) return "0.00";
        const weightedSum = activePortfolio.allocation.reduce((sum, asset) => {
            return sum + (asset.value / 100) * asset.returnRate;
        }, 0);
        return weightedSum.toFixed(2);
    }, [activePortfolio.allocation]);

    // Calculate projection
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

    // Overview Charts Data
    const incomeExpenseData = {
        labels: ['Monthly Income', 'Monthly Expense', 'Monthly Savings'],
        datasets: [{
            label: 'Amount (BDT)',
            data: [90000, 68000, 22000],
            backgroundColor: ['#10B981', '#EF4444', '#3B82F6'],
            borderColor: ['#059669', '#DC2626', '#2563EB'],
            borderWidth: 2
        }]
    };

    const incomeExpenseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: BDT ${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => 'BDT ' + (Number(value) / 1000).toFixed(0) + 'K'
                }
            }
        }
    };

    const assetsData = {
        labels: ['Savings Account', 'FDR @ UCB', 'Gold Ornaments'],
        datasets: [{
            data: [200000, 1000000, 4000000],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
            borderColor: '#ffffff',
            borderWidth: 3
        }]
    };

    const assetsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 15,
                    font: { size: 12 }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: BDT ${context.raw.toLocaleString()}`
                }
            }
        }
    };

    const goalsData = {
        labels: ['Emergency Fund', 'Car Purchase', 'Apartment Down Payment'],
        datasets: [{
            label: 'Required Amount',
            data: [500000, 3000000, 15000000],
            backgroundColor: ['#8B5CF6', '#EC4899', '#F59E0B'],
            borderColor: ['#7C3AED', '#DB2777', '#D97706'],
            borderWidth: 2
        }]
    };

    const goalsOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y' as const,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `BDT ${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => 'BDT ' + (Number(value) / 1000000).toFixed(1) + 'M'
                }
            }
        }
    };

    // Chart data configurations for other portfolios
    const doughnutData = {
        labels: activePortfolio.allocation.map(a => a.name),
        datasets: [{
            data: activePortfolio.allocation.map(a => a.value),
            backgroundColor: activePortfolio.allocation.map(a => a.color),
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 8
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
                    color: '#374151', 
                    padding: 15, 
                    font: { family: "'Inter', sans-serif", size: 11 } 
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: ${context.raw.toFixed(1)}%`
                }
            }
        }
    };

    const lineData = {
        labels: calculatedProjection.map(p => `Year ${p[0]}`),
        datasets: [{
            label: 'Projected Value',
            data: calculatedProjection.map(p => p[1]),
            borderColor: '#0EA5E9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#0EA5E9',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: 'white'
        }]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                ticks: { 
                    color: '#6B7280', 
                    callback: (value: any) => 'BDT ' + (Number(value) / 1000000).toFixed(1) + 'M' 
                },
                grid: { color: 'rgba(229, 231, 235, 0.6)' }
            },
            x: { 
                ticks: { color: '#6B7280' }, 
                grid: { display: false } 
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: (context: any) => `Value: BDT ${context.raw.toLocaleString()}`
                }
            }
        },
        interaction: { 
            mode: 'index' as const, 
            intersect: false 
        }
    };

    // Input handlers
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

    // Calculate allocated amount for each asset
    const calculateAllocatedAmount = (percentage: number) => {
        const total = parseFloat(activePortfolio.initialInvestment) || 0;
        return Math.round(total * (percentage / 100));
    };

    // Check if current portfolio uses new layout
    const useNewLayout = activePortfolioKey === "Emergency Fund" || activePortfolioKey === "5-Year Car Fund";

    return (
        <div className="bg-gray-50 text-gray-900 p-4 md:p-8 min-h-screen font-sans">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Nafis's 12-Year Financial Plan
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    An interactive dashboard for portfolio construction.
                </p>
            </header>

            <div className="mb-6 flex flex-wrap gap-3">
                {Object.keys(portfolios).map(name => (
                    <button
                        key={name}
                        onClick={() => setActivePortfolioKey(name)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white ${
                            activePortfolioKey === name ? 'bg-blue-600 shadow-lg' : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {activePortfolioKey === "Overview" ? (
                // OVERVIEW TAB
                <div className="space-y-6">
                    {/* Financial Snapshot Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-xl text-white">
                        <h2 className="text-3xl font-bold mb-2">Nafis's Financial Snapshot</h2>
                        <p className="text-blue-100">Comprehensive view of income, assets, and financial goals</p>
                    </div>

                    {/* Income & Expenses Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Income Overview */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">💰 Income & Expenses</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Gross Monthly Salary</span>
                                    <span className="text-green-700 font-bold">BDT 110,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Take-Home Pay</span>
                                    <span className="text-blue-700 font-bold">BDT 90,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Monthly Expenditure</span>
                                    <span className="text-red-700 font-bold">BDT 68,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
                                    <span className="text-gray-700 font-semibold">Monthly Savings</span>
                                    <span className="text-purple-700 font-bold text-lg">BDT 22,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                                    <span className="text-gray-700 font-medium">Salary Growth Rate</span>
                                    <span className="text-gray-900 font-bold">8% annually</span>
                                </div>
                            </div>
                            <div className="h-64">
                                <Bar data={incomeExpenseData} options={incomeExpenseOptions} />
                            </div>
                        </div>

                        {/* Current Assets */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">🏦 Current Assets</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Savings Account</span>
                                    <span className="text-blue-700 font-bold">BDT 200,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">FDR @ UCB</span>
                                    <span className="text-green-700 font-bold">BDT 1,000,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Gold (Ornaments)</span>
                                    <span className="text-yellow-700 font-bold">BDT 4,000,000</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border-2 border-blue-300">
                                    <span className="text-gray-800 font-bold">Total Assets</span>
                                    <span className="text-blue-900 font-bold text-lg">BDT 5,200,000</span>
                                </div>
                            </div>
                            <div className="h-64">
                                <Doughnut data={assetsData} options={assetsOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Financial Goals Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">🎯 Financial Goals & Requirements</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <div className="space-y-4 mb-6">
                                    <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-800">Emergency Fund</h4>
                                            <span className="text-purple-700 font-bold">BDT 500,000</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Immediate access for emergencies</p>
                                    </div>
                                    
                                    <div className="p-4 bg-pink-50 rounded-xl border-l-4 border-pink-500">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-800">Car Purchase (5 Years)</h4>
                                            <span className="text-pink-700 font-bold">BDT 3,000,000</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Today's cost - No car loan interest</p>
                                    </div>
                                    
                                    <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-800">Apartment Down Payment (5 Years)</h4>
                                            <span className="text-orange-700 font-bold">BDT 15,000,000</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Down payment in 5 years, rest within 12 years</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-300">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-gray-800 text-lg">Total Requirements</h4>
                                            <span className="text-blue-900 font-bold text-xl">BDT 18,500,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-80">
                                <Bar data={goalsData} options={goalsOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Investment Philosophy & Risk Profile */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Investment Options</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                                    <h4 className="font-semibold text-red-700 mb-2">Equity, Risky</h4>
                                    <p className="text-sm text-gray-600">Stocks, Mutual Funds</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                    <h4 className="font-semibold text-green-700 mb-2">Fixed Income, Safer</h4>
                                    <p className="text-sm text-gray-600">Bonds, Treasury Notes, National Savings Certificates</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="font-semibold text-blue-700 mb-2">Steady, Limited Return</h4>
                                    <p className="text-sm text-gray-600">Fixed Deposits</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                    <h4 className="font-semibold text-purple-700 mb-2">Fintech Options</h4>
                                    <p className="text-sm text-gray-600">WeGro, iFarmer, Biniyog.io, Goldkinun, FreshieFarm</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">⚠️ Risk Profile</h3>
                            <div className="p-4 bg-red-50 rounded-xl border-2 border-red-300 mb-4">
                                <h4 className="font-bold text-red-700 text-lg mb-2">Risk Appetite: HIGH</h4>
                                <p className="text-gray-700">Nafis has a high capacity for risk. Does not want to lose more than <span className="font-bold text-red-600">15%</span> in any given year.</p>
                            </div>
                            
                            <h4 className="font-semibold text-gray-800 mb-3">📋 Strategic Tasks</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>Investor Profiling</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>Calculate Required Rate of Return (RRR) for Car and Apartment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>Research alternative investment ecosystem</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>Compare returns, risk, and liquidity of investments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>Design diversified portfolio (Traditional + Alternative assets)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <span>10-year Financial Projection and Goal Feasibility</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
                            <div className="text-3xl mb-2">💼</div>
                            <div className="text-sm opacity-90">Yearly Income</div>
                            <div className="text-2xl font-bold">BDT 1.08M</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-sm opacity-90">Yearly Savings</div>
                            <div className="text-2xl font-bold">BDT 264K</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
                            <div className="text-3xl mb-2">🏦</div>
                            <div className="text-sm opacity-90">Total Assets</div>
                            <div className="text-2xl font-bold">BDT 5.2M</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="text-sm opacity-90">Goal Target</div>
                            <div className="text-2xl font-bold">BDT 18.5M</div>
                        </div>
                    </div>
                </div>
            ) : useNewLayout ? (
                // NEW LAYOUT FOR EMERGENCY FUND & CAR FUND
                <div className="space-y-6">
                    {/* Top Section - Portfolio Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-1 text-gray-800">{activePortfolioKey}</h2>
                            <span className="text-sm font-medium text-blue-600">
                                Goal: {activePortfolio.goal} ({activePortfolio.timeframe})
                            </span>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Allocation Rationale:</h3>
                            <p className="text-gray-600 text-sm">
                                {activePortfolio.justification}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-600 mb-1">
                                    Initial Investment (BDT)
                                </label>
                                <input
                                    type="text"
                                    name="initialInvestment"
                                    id="initialInvestment"
                                    value={activePortfolio.initialInvestment}
                                    onChange={handlePortfolioChange}
                                    onFocus={(e) => e.target.select()}
                                    className="w-full bg-gray-100 text-gray-900 rounded-lg border-gray-300 p-2 text-lg font-bold focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Weighted Average Return (%)
                                </label>
                                <div className="w-full bg-blue-50 text-blue-900 rounded-lg border-2 border-blue-300 p-2 text-lg font-bold">
                                    {calculatedWeightedReturn}%
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Auto-calculated from asset returns</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section - Asset Allocation (Left) and Donut Chart (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Asset Allocation */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Asset Allocation</h3>
                            <div className="space-y-4">
                                {activePortfolio.allocation.map((asset, index) => (
                                    <div key={asset.name} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <label htmlFor={asset.name} className="font-semibold text-sm" style={{color: asset.color}}>
                                                {asset.name}
                                            </label>
                                            <div className="text-right">
                                                <div className="text-gray-900 font-bold text-sm">{asset.value.toFixed(1)}%</div>
                                                <div className="text-xs text-gray-600">
                                                    BDT {calculateAllocatedAmount(asset.value).toLocaleString()}
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
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-3"
                                            style={{ accentColor: asset.color }}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-xs text-gray-600 whitespace-nowrap font-medium">Return Rate:</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={asset.returnRate}
                                                onChange={(e) => handleReturnRateChange(index, e.target.value)}
                                                onFocus={(e) => e.target.select()}
                                                className="w-20 bg-white text-gray-900 rounded border-gray-300 px-2 py-1 text-xs font-semibold focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <span className="text-xs text-gray-600 font-medium">%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Donut Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Portfolio Distribution</h3>
                            <div className="relative h-80 w-80">
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Growth Projection */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projected Growth</h2>
                        
                        <div className="h-80 relative mb-6">
                            <Line data={lineData} options={lineOptions} />
                        </div>

                        <div className="mt-6 p-4 bg-gray-100/70 rounded-xl flex flex-wrap justify-between items-center gap-4 border border-gray-200">
                            <div>
                                <span className="text-sm text-gray-600 block">Projected Value at Year {activePortfolioKey === "5-Year Car Fund" ? "5" : "12"}</span>
                                <span className="text-3xl font-bold text-cyan-600">
                                    BDT {calculatedProjection[activePortfolioKey === "5-Year Car Fund" ? 5 : 12][1].toLocaleString()}
                                </span>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="text-sm text-gray-600 block">Target Value</span>
                                <span className="text-xl font-semibold text-gray-700">
                                    BDT {activePortfolio.target.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // OLD LAYOUT FOR OTHER PORTFOLIOS
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Inputs & Allocation Chart */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200">
                        <div>
                            <h2 className="text-2xl font-semibold mb-1 text-gray-800">{activePortfolioKey}</h2>
                            <span className="text-sm font-medium text-blue-600">
                                Goal: {activePortfolio.goal} ({activePortfolio.timeframe})
                            </span>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Allocation Rationale:</h3>
                            <p className="text-gray-600 text-sm">
                                {activePortfolio.justification}
                            </p>
                        </div>
                        
                        {/* Interactive Inputs */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-600 mb-1">
                                    Initial Investment (BDT)
                                </label>
                                <input
                                    type="text"
                                    name="initialInvestment"
                                    id="initialInvestment"
                                    value={activePortfolio.initialInvestment}
                                    onChange={handlePortfolioChange}
                                    onFocus={(e) => e.target.select()}
                                    className="w-full bg-gray-100 text-gray-900 rounded-lg border-gray-300 p-2 text-lg font-bold focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Weighted Average Return (%)
                                </label>
                                <div className="w-full bg-blue-50 text-blue-900 rounded-lg border-2 border-blue-300 p-2 text-lg font-bold">
                                    {calculatedWeightedReturn}%
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Auto-calculated from asset returns</p>
                            </div>
                            
                            {/* Allocation Sliders with Return Rate Inputs */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Asset Allocation</h3>
                                <div className="space-y-4">
                                    {activePortfolio.allocation.map((asset, index) => (
                                        <div key={asset.name} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                            <div className="flex justify-between text-sm mb-2">
                                                <label htmlFor={asset.name} className="font-medium" style={{color: asset.color}}>
                                                    {asset.name}
                                                </label>
                                                <span className="text-gray-700 font-medium">{asset.value.toFixed(1)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                name={asset.name}
                                                id={asset.name}
                                                min="0"
                                                max="100"
                                                value={asset.value}
                                                onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
                                                style={{ accentColor: asset.color }}
                                            />
                                            <div className="flex items-center gap-2">
                                                <label className="text-xs text-gray-600 whitespace-nowrap">Return Rate:</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={asset.returnRate}
                                                    onChange={(e) => handleReturnRateChange(index, e.target.value)}
                                                    onFocus={(e) => e.target.select()}
                                                    className="w-20 bg-white text-gray-900 rounded border-gray-300 px-2 py-1 text-sm font-semibold focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <span className="text-xs text-gray-600">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Allocation Chart */}
                        <div className="relative h-64 w-64 mx-auto mt-4">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>

                    {/* Column 2: Growth Projection */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projected Growth</h2>
                        
                        <div className="h-80 relative mb-6">
                            <Line data={lineData} options={lineOptions} />
                        </div>

                        <div className="mt-6 p-4 bg-gray-100/70 rounded-xl flex flex-wrap justify-between items-center gap-4 border border-gray-200">
                            <div>
                                <span className="text-sm text-gray-600 block">Projected Value at Year 12</span>
                                <span className="text-3xl font-bold text-cyan-600">
                                    BDT {calculatedProjection[12][1].toLocaleString()}
                                </span>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="text-sm text-gray-600 block">Target Value</span>
                                <span className="text-xl font-semibold text-gray-700">
                                    BDT {activePortfolio.target.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
