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

// Register Chart.js components
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

// Rest of your interfaces remain the same...
interface Asset {
    name: string;
    value: number;
    color: string;
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
    "Emergency Fund": {
        goal: "BDT 500,000",
        timeframe: "Ongoing",
        justification: "This fund prioritizes immediate liquidity and capital preservation. Assets are held in highly stable, accessible accounts.",
        initialInvestment: "500000",
        expectedReturn: "3.5",
        allocation: [
            { name: "Savings Account", value: 40, color: "#2563EB" },
            { name: "FDRs (UCB)", value: 60, color: "#059669" }
        ],
        target: 500000
    },
    "5-Year Car Fund": {
        goal: "BDT 3,000,000 (Future Value)",
        timeframe: "5 Years",
        justification: "A balanced approach for a medium-term goal. Mixes safe fixed-income with moderate growth to beat inflation without high risk.",
        initialInvestment: "1000000",
        expectedReturn: "8.0",
        allocation: [
            { name: "Bonds/NSCs", value: 50, color: "#2563EB" },
            { name: "Mutual Funds", value: 30, color: "#059669" },
            { name: "Digital Gold", value: 20, color: "#D97706" }
        ],
        target: 3000000
    },
    "12-Year Apartment Fund": {
        goal: "BDT 15,000,000 (Future Value)",
        timeframe: "12 Years",
        justification: "This long-term portfolio maximizes growth. It takes on higher risk via stocks and alternative investments.",
        initialInvestment: "4000000",
        expectedReturn: "12.5",
        allocation: [
            { name: "Stocks", value: 50, color: "#2563EB" },
            { name: "Agri-Fintech", value: 20, color: "#059669" },
            { name: "SME Funding", value: 10, color: "#D97706" },
            { name: "Digital Gold", value: 20, color: "#DB2777" }
        ],
        target: 15583904
    }
};

export default function FinancialDashboard() {
    const [portfolios, setPortfolios] = useState(initialPortfolioData);
    const [activePortfolioKey, setActivePortfolioKey] = useState("Emergency Fund");
    
    const activePortfolio = portfolios[activePortfolioKey];

    // Calculate projection
    const calculatedProjection = useMemo(() => {
        const { initialInvestment, expectedReturn } = activePortfolio;
        const initial = parseFloat(initialInvestment) || 0;
        const rate = parseFloat(expectedReturn) || 0;
        
        const projection = [];
        for (let year = 0; year <= 12; year++) {
            const value = initial * Math.pow(1 + rate / 100, year);
            projection.push([year, Math.round(value)]);
        }
        return projection;
    }, [activePortfolio.initialInvestment, activePortfolio.expectedReturn]);

    // Chart data configurations
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
                    font: { family: "'Inter', sans-serif" } 
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
                            <label htmlFor="expectedReturn" className="block text-sm font-medium text-gray-600 mb-1">
                                Expected Annual Return (%)
                            </label>
                            <input
                                type="text"
                                name="expectedReturn"
                                id="expectedReturn"
                                value={activePortfolio.expectedReturn}
                                onChange={handlePortfolioChange}
                                onFocus={(e) => e.target.select()}
                                className="w-full bg-gray-100 text-gray-900 rounded-lg border-gray-300 p-2 text-lg font-bold focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        {/* Allocation Sliders */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Asset Allocation</h3>
                            <div className="space-y-3">
                                {activePortfolio.allocation.map((asset, index) => (
                                    <div key={asset.name}>
                                        <div className="flex justify-between text-sm mb-1">
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
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            style={{ accentColor: asset.color }}
                                        />
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
        </div>
    );
}
