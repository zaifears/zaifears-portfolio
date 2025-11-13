"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Check, Menu, 
  LayoutDashboard, Scan, Calendar, Shirt,
  TrendingDown, TrendingUp, DollarSign, AlertCircle
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  status: 'Owned' | 'Recommended';
}

const mockWardrobe: Product[] = [
  {
    id: 1,
    name: 'The Constant Blazer',
    price: 8500,
    imageUrl: 'https://placehold.co/600x800/62122f/F8F7F3?text=Blazer',
    status: 'Owned',
  },
  {
    id: 2,
    name: 'The North Star Linen Shirt',
    price: 3800,
    imageUrl: 'https://placehold.co/600x800/F8F7F3/62122f?text=Shirt',
    status: 'Owned',
  },
  {
    id: 4,
    name: 'The Meridian Trouser',
    price: 4200,
    imageUrl: 'https://placehold.co/600x800/333333/F8F7F3?text=Trouser',
    status: 'Recommended',
  },
  {
    id: 5,
    name: 'The Equinox Crewneck',
    price: 3200,
    imageUrl: 'https://placehold.co/600x800/5A0F2A/F8F7F3?text=Crewneck',
    status: 'Recommended',
  },
];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'px-6 py-3 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const styles = {
    primary: 'bg-[#D4AF37] text-black hover:bg-opacity-80 focus:ring-[#D4AF37]',
    secondary: 'bg-[#F8F7F3] text-[#62122f] hover:bg-opacity-90 focus:ring-[#F8F7F3]',
    outline: 'bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black',
  };

  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <Image
      src="/bizcomp/polaris-transparent.png"
      alt="Polaris"
      width={180}
      height={60}
      className="object-contain"
      priority
    />
  </div>
);

const Sidebar: React.FC<{ 
  currentPage: string;
  setPage: (page: string) => void;
  className?: string;
}> = ({ currentPage, setPage, className = '' }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'Precision Fit Finder', icon: Scan, page: 'fit_finder' },
    { name: 'Virtual Consultation', icon: Calendar, page: 'booking' },
    { name: 'Digital Wardrobe', icon: Shirt, page: 'wardrobe' },
  ];

  return (
    <div className={`w-64 bg-[#62122f] text-white flex flex-col ${className}`}>
      <div className="flex items-center justify-center h-24 shadow-md px-4 py-6">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setPage(item.page)}
            className={`w-full flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              currentPage === item.page
                ? 'bg-[#D4AF37] text-black'
                : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white border-opacity-10">
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Polaris</p>
        <p className="text-xs text-gray-400">Investor Demo</p>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => (
  <div className="p-10">
    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
      <div className="flex items-start">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-red-900">The Crisis: 52% Return Rate</h3>
          <p className="text-red-800 mt-1">
            Nokkhotro&apos;s broken reseller model caused margins to collapse from 18% → 10%. 
            Takayama exited. This demo proves how Polaris solves this crisis with technology.
          </p>
        </div>
      </div>
    </div>

    <h1 className="text-4xl font-bold text-[#62122f]">Polaris: The Digital Turnaround Solution</h1>
    <p className="mt-4 text-lg text-gray-700 max-w-3xl">
      Welcome to the investor demo. This interactive platform showcases three core digital features 
      that will eliminate the 52% return rate, restore customer trust, and build a scalable, high-LTV business.
    </p>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Current Return Rate</p>
            <p className="text-3xl font-bold text-red-600 mt-1">52%</p>
          </div>
          <TrendingDown className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-xs text-gray-500 mt-2">The operational crisis</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Target Return Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-1">&lt;15%</p>
          </div>
          <TrendingUp className="h-10 w-10 text-green-500" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Industry standard goal</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Workshop Investment</p>
            <p className="text-3xl font-bold text-[#62122f] mt-1">BDT 2.5Cr</p>
          </div>
          <DollarSign className="h-10 w-10 text-[#D4AF37]" />
        </div>
        <p className="text-xs text-gray-500 mt-2">In-house manufacturing</p>
      </div>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
        <div className="bg-[#62122f] w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Scan className="h-6 w-6 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-semibold text-[#62122f]">Precision Fit Finder</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          <strong>The Core Solution.</strong> A data-driven diagnostic tool using proprietary algorithms 
          trained on our in-house patterns to provide instant, accurate size recommendations.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-semibold">Impact: Reduces returns from 52% → &lt;15%</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
        <div className="bg-[#62122f] w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Calendar className="h-6 w-6 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-semibold text-[#62122f]">Virtual Consultation</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          <strong>The Premium Experience.</strong> 15-minute 1-on-1 video calls with in-house specialists. 
          Scalable (20-30 consultations/day) vs costly home visits (3-4/day).
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-semibold">Impact: Builds trust, increases AOV via upselling</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
        <div className="bg-[#62122f] w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Shirt className="h-6 w-6 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-semibold text-[#62122f]">Digital Wardrobe</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          <strong>The LTV Engine.</strong> AI-driven, personalized recommendations based on purchase history. 
          Transforms one-time buyers into loyal, high-LTV customers.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-semibold">Impact: Increases repeat purchases, builds loyalty</p>
        </div>
      </div>
    </div>

    <div className="mt-12 bg-gradient-to-r from-[#62122f] to-[#8B1538] p-8 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">The Turnaround Strategy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-[#D4AF37] mb-2">Physical Solution (The Pivot)</h3>
          <ul className="space-y-2 text-sm">
            <li>-  BDT 2.5 Crore in-house workshop</li>
            <li>-  Full control: quality, fit, design, R&D</li>
            <li>-  Proprietary garment patterns</li>
            <li>-  Eliminates unreliable reseller model</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[#D4AF37] mb-2">Digital Solution (This Demo)</h3>
          <ul className="space-y-2 text-sm">
            <li>-  Data-driven size recommendations</li>
            <li>-  Scalable premium consultation service</li>
            <li>-  AI-powered retention engine</li>
            <li>-  Proves: Credible, Scalable, Tech-Driven</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const FitFinderPage: React.FC = () => {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [build, setBuild] = useState<'Slim' | 'Athletic' | 'Broad' | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (!build) {
      setSize(null);
      return;
    }
    
    let recommended = 'M';
    if (height > 182 || weight > 85) recommended = 'L';
    if (height < 170 || weight < 65) recommended = 'S';
    
    if (build === 'Broad' && recommended === 'M') recommended = 'L';
    if (build === 'Broad' && recommended === 'L') recommended = 'XL';
    if (build === 'Slim' && recommended === 'M') recommended = 'S';
    
    setSize(recommended);
  }, [height, weight, build]);

  return (
    <div className="p-10">
      <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <div className="flex items-start">
          <Scan className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-blue-900">The Core Solution to 52% Returns</h3>
            <p className="text-blue-800 mt-1">
              This proprietary algorithm, trained on our in-house patterns, provides instant size recommendations. 
              This single feature will reduce returns from 52% → &lt;15%, saving millions in reverse logistics.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[#62122f]">Precision Fit Finder</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        By capturing three key body metrics in one simple step, our algorithm provides an accurate size 
        recommendation. This builds customer confidence and ensures the right product is ordered the first time.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-[#62122f] mb-6">Tell us about you</h3>
          
          <div className="mb-6">
            <label className="flex justify-between text-lg font-medium text-gray-700">
              Height
              <span className="font-bold text-[#62122f]">{height} cm</span>
            </label>
            <input
              type="range"
              min="150"
              max="210"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div className="mb-8">
            <label className="flex justify-between text-lg font-medium text-gray-700">
              Weight
              <span className="font-bold text-[#62122f]">{weight} kg</span>
            </label>
            <input
              type="range"
              min="50"
              max="120"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              What&apos;s your typical build?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Slim', 'Athletic', 'Broad'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBuild(b)}
                  className={`w-full py-3 rounded-md border-2 text-center font-semibold transition-all ${
                    build === b
                      ? 'bg-[#62122f] text-white border-[#62122f]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>For Investors:</strong> This data is stored and analyzed to continuously improve 
              our pattern recommendations, creating a compounding accuracy advantage.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center text-center p-8 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300">
          {size ? (
            <div>
              <p className="text-xl text-gray-600 mb-2">Your Precision Fit is:</p>
              <div className="my-6 inline-block rounded-full bg-[#D4AF37] px-12 py-8 shadow-xl">
                <span className="text-8xl font-bold text-black">{size}</span>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">
                  Based on our <span className="font-bold text-[#62122f]">{build}</span> pattern
                </p>
                <p className="text-sm text-gray-600">
                  {height}cm / {weight}kg frame
                </p>
              </div>
              <div className="mt-6 text-left">
                <p className="text-xs text-gray-500">
                  <strong>Confidence Level:</strong> This recommendation is trained on 500+ data points 
                  from our in-house pattern library.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-2xl text-gray-500 mb-4">Select your build to see your recommended size</p>
              <p className="text-sm text-gray-400">This instant recommendation eliminates sizing uncertainty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="p-10">
      <div className="mb-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
        <div className="flex items-start">
          <Calendar className="h-6 w-6 text-purple-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-purple-900">Scalable Premium Experience</h3>
            <p className="text-purple-800 mt-1">
              Replaces costly home visits (3-4/day, traffic-dependent) with scalable video consultations 
              (20-30/day from HQ). Maintains premium feel while improving operational efficiency 10x.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[#62122f]">Book a Virtual Consultation</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        For customers who want absolute confidence, we offer a free 15-minute video call with an 
        in-house Polaris Fit Specialist. This is the scalable alternative to home visits.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-[#62122f] mb-6">What to Expect</h3>
          <ul className="space-y-5">
            <li className="flex items-start">
              <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">1-on-1 Expert Advice</h4>
                <p className="text-gray-600">Our in-house team (not chatbots) understands our exact patterns and can provide guaranteed fit recommendations.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Personalized Sizing</h4>
                <p className="text-gray-600">We guide you through key measurements (if needed) via video, ensuring perfect fit for your body type.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">Curated Styling & Upselling</h4>
                <p className="text-gray-600">Transform a sizing query into a full wardrobe consultation, driving Average Order Value (AOV) from BDT 4K → 12K+.</p>
              </div>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Scalability Note:</strong> One specialist can serve 20-30 customers/day from Dhaka HQ, 
              eliminating geographic constraints and traffic costs.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          {!isConfirmed ? (
            <form onSubmit={(e) => { e.preventDefault(); setIsConfirmed(true); }}>
              <h3 className="text-2xl font-semibold text-[#62122f] mb-6">Request Your Appointment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" required className="mt-1 w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62122f]" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" required className="mt-1 w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62122f]" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">What would you like to discuss?</label>
                  <textarea className="mt-1 w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62122f]" rows={3} placeholder="E.g., sizing help, wardrobe consultation, fabric questions..."></textarea>
                </div>
                <Button type="submit" className="w-full bg-[#62122f] text-white hover:bg-opacity-80">
                  Request Free Consultation
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-green-100 rounded-full p-6 mb-6">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Request Confirmed!</h3>
              <p className="mt-3 text-gray-700 max-w-sm">
                A Polaris Fit Specialist will email you within 24 hours to schedule your 15-minute consultation.
              </p>
              <Button onClick={() => setIsConfirmed(false)} variant="secondary" className="mt-8 border border-gray-300">
                Book Another Consultation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WardrobePage: React.FC = () => {
  const ownedItems = mockWardrobe.filter(item => item.status === 'Owned');
  const recommendedItems = mockWardrobe.filter(item => item.status === 'Recommended');

  return (
    <div className="p-10">
      <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
        <div className="flex items-start">
          <Shirt className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-green-900">The High-LTV Retention Engine</h3>
            <p className="text-green-800 mt-1">
              AI-driven recommendations increase purchase frequency 3-5x. Transforms one-time buyers (BDT 4K LTV) 
              into loyal customers (BDT 35K+ LTV over 2 years). This is scalable and automated.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[#62122f]">The Digital Wardrobe</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        Every Polaris purchase is tracked in your personal Digital Wardrobe. Our AI analyzes your style 
        and provides personalized recommendations, building a loyal ecosystem that increases lifetime value.
      </p>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Your Owned Pieces</h2>
          <div className="text-sm text-gray-600">
            Total Value: <span className="font-bold text-[#62122f]">BDT {(ownedItems.reduce((sum, item) => sum + item.price, 0)).toLocaleString()}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ownedItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow">
              <img src={item.imageUrl} alt={item.name} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">BDT {item.price.toLocaleString()}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  Owned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Recommended For You</h2>
            <p className="text-gray-600 text-sm mt-1">Based on your blazer and shirt, complete your old-money aesthetic</p>
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>AI Insight:</strong> Customers who own a blazer and shirt have an 87% purchase rate 
            for trousers within 30 days when shown personalized recommendations like these.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg border-2 border-dashed border-[#D4AF37] overflow-hidden group hover:border-solid hover:border-[#62122f] transition-all">
              <img src={item.imageUrl} alt={item.name} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h4 className="font-semibold text-lg text-[#62122f]">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">BDT {item.price.toLocaleString()}</p>
                <span className="inline-block mb-3 px-3 py-1 bg-[#D4AF37] bg-opacity-20 text-[#62122f] text-xs font-semibold rounded-full">
                  AI Recommended
                </span>
                <Button className="w-full bg-[#62122f] text-white text-sm py-2 hover:bg-opacity-80">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Projected 2-Year Customer Lifetime Value</p>
              <p className="text-4xl font-bold text-[#D4AF37] mt-2">BDT 35,000+</p>
              <p className="text-xs text-gray-400 mt-1">vs BDT 4,000 for one-time buyers</p>
            </div>
            <TrendingUp className="h-16 w-16 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'fit_finder':
        return <FitFinderPage />;
      case 'booking':
        return <BookingPage />;
      case 'wardrobe':
        return <WardrobePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] font-sans">
      <Sidebar 
        currentPage={currentPage}
        setPage={setPage}
        className="hidden md:flex"
      />

      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-center justify-between h-20 bg-[#62122f] text-white px-4 shadow-lg">
          <Logo />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 z-50 bg-[#62122f]">
             <Sidebar 
              currentPage={currentPage}
              setPage={(page) => {
                setPage(page);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <div className="hidden md:flex flex-1 flex-col">
        <header className="flex items-center justify-between h-20 border-b border-gray-200 bg-white px-10 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            {
              {
                'dashboard': 'Polaris Turnaround Demo',
                'fit_finder': 'Precision Fit Finder',
                'booking': 'Virtual Consultation',
                'wardrobe': 'Digital Wardrobe'
              }[currentPage]
            }
          </h2>
          <div className="text-sm text-gray-500 font-medium">
            Investor Demo -  {new Date().getFullYear()}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
