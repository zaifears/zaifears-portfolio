"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X, Check, Menu, Upload, Shield, Sparkles, Search, Camera,
  LayoutDashboard, Scan, Calendar, Shirt, Palette, ImageIcon,
  TrendingUp, ArrowRight, Zap
} from 'lucide-react';

// --- Interfaces ---
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  status: 'Owned' | 'Recommended';
}

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  imageUrl: string;
}

// --- Mock Data ---
const mockWardrobe: Product[] = [
  {
    id: 1,
    name: 'The Ash Grey Blazer',
    price: 9500,
    imageUrl: '/bizcomp/accfinity/burgundy-blazer.jpg',
    status: 'Owned',
  },
  {
    id: 2,
    name: 'The Constant Navy Blazer',
    price: 8500,
    imageUrl: '/bizcomp/accfinity/navy-blazer.jpg',
    status: 'Owned',
  },
  {
    id: 3,
    name: 'The North Star Blazer',
    price: 9200,
    imageUrl: '/bizcomp/accfinity/charcoal-blazer.jpg',
    status: 'Owned',
  },
  {
    id: 4,
    name: 'The Meridian Blazer',
    price: 8900,
    imageUrl: '/bizcomp/accfinity/olive-blazer.jpg',
    status: 'Recommended',
  },
  {
    id: 5,
    name: 'The Equinox Blazer',
    price: 8500,
    imageUrl: '/bizcomp/accfinity/camel-blazer.jpg',
    status: 'Recommended',
  },
];

const genericProducts: Product[] = [
  {
    id: 101,
    name: 'The Carbon Blazer',
    price: 9200,
    imageUrl: 'https://placehold.co/600x800/4A4A4A/FFFFFF?text=Carbon+Blazer',
    status: 'Recommended',
  },
  {
    id: 102,
    name: 'The Eco-Weave Blazer',
    price: 9800,
    imageUrl: 'https://placehold.co/600x800/2C3E50/FFFFFF?text=Eco+Blazer',
    status: 'Recommended',
  },
  {
    id: 103,
    name: 'The Sustainable Blazer',
    price: 8500,
    imageUrl: 'https://placehold.co/600x800/5D6D7E/FFFFFF?text=Sus+Blazer',
    status: 'Recommended',
  },
  {
    id: 104,
    name: 'The Classic Grey Blazer',
    price: 9000,
    imageUrl: 'https://placehold.co/600x800/808080/FFFFFF?text=Grey+Blazer',
    status: 'Recommended',
  },
];

const colorOptions: ColorOption[] = [
  {
    id: 'navy',
    name: 'Navy Blue',
    hex: '#1e3a5f',
    imageUrl: '/bizcomp/accfinity/navy-blazer.jpg',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    hex: '#36454f',
    imageUrl: '/bizcomp/accfinity/charcoal-blazer.jpg',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    hex: '#62122f',
    imageUrl: '/bizcomp/accfinity/burgundy-blazer.jpg',
  },
  {
    id: 'olive',
    name: 'Olive Green',
    hex: '#556b2f',
    imageUrl: '/bizcomp/accfinity/olive-blazer.jpg',
  },
  {
    id: 'camel',
    name: 'Camel',
    hex: '#c19a6b',
    imageUrl: '/bizcomp/accfinity/camel-blazer.jpg',
  },
];

// --- Helper Components (Palette Changed) ---

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
  const baseStyle = 'px-4 py-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm';
  const styles = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:scale-105 focus:ring-blue-500',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-100',
    outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };
  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <Image src="/bizcomp/polaris-transparent.png" alt="Polaris" width={140} height={50} className="object-contain" priority />
  </div>
);

const Sidebar: React.FC<{
  currentPage: string;
  setPage: (page: string) => void;
  className?: string;
}> = ({ currentPage, setPage, className = '' }) => {
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, page: 'dashboard' },
    { name: 'AI Fit Finder', icon: Scan, page: 'fit_finder' },
    { name: 'AI Color Picker', icon: Palette, page: 'color_picker' },
    { name: 'Style Finder', icon: ImageIcon, page: 'style_finder' },
    { name: 'Consultation', icon: Calendar, page: 'booking' },
    { name: 'Wardrobe', icon: Shirt, page: 'wardrobe' },
  ];

  return (
    // Changed sidebar gradient to blue
    <div className={`w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col ${className}`}>
      <div className="flex items-center justify-center h-20 shadow-lg px-4 py-4 border-b border-white border-opacity-10">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setPage(item.page)}
            // Changed active state to white bg with blue text
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${currentPage === item.page
                ? 'bg-white text-blue-700 shadow-lg'
                : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:translate-x-1'
              }`}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white border-opacity-10">
        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <p className="text-[10px] text-gray-300 mb-0.5">Investor Demo</p>
          <p className="text-xs font-semibold text-white">Polaris {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

// --- Page Components (Palette Changed) ---

const DashboardPage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="mb-8">
      {/* Changed text gradient to blue */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
        Welcome to Polaris
      </h1>
      <p className="text-lg text-gray-600">
        The future of premium menswear, powered by AI
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Changed card gradient to blue */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white shadow-2xl">
        {/* Changed icon color to white (was gold) */}
        <Sparkles className="h-8 w-8 text-white mb-3" />
        <h2 className="text-2xl font-bold mb-3">The Customer Success Story</h2>
        <div className="space-y-3 text-white text-opacity-95 text-base">
          <p className="leading-relaxed">
            {/* Changed highlight to lighter blue */}
            <span className="font-bold text-blue-300">52% of our customers return</span> to make repeat purchases -
            a testament to our quality and customer satisfaction.
          </p>
          <p className="leading-relaxed">
            Our dedicated in-house workshop gives us complete control over quality, fit consistency,
            and design excellence.
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-gray-100">
        <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">The Polaris Advantage</h2>
        <div className="space-y-3 text-gray-700 text-base">
          <p className="leading-relaxed">
            {/* Changed text color to blue */}
            <span className="font-bold text-blue-600">Dedicated in-house workshop</span> ensures
            consistent quality and rapid iteration on customer feedback.
          </p>
          <p className="leading-relaxed">
            Combined with <span className="font-bold text-blue-600">AI-powered digital tools</span>,
            we deliver personalized experiences that drive loyalty and lifetime value.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Polaris</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Changed text color to blue */}
          <h3 className="text-lg font-semibold text-blue-600 mb-2">What We Are</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Polaris is a premium menswear brand built on the foundation of <strong>&quot;old-money&quot; aesthetic</strong> -
            timeless, sophisticated, and refined. We craft garments that transcend trends, focusing on
            quality, precision fit, and understated elegance.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-2">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Currently focused on men&apos;s tailoring, we&apos;re building the technology and expertise to
            expand into <strong>women&apos;s formal wear</strong> within 18 months. Our AI-driven approach
            to fit and style makes this expansion scalable and sustainable.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Changed hover border to blue */}
      <div className="group bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setPage('fit_finder')}>
        {/* Changed icon bg to blue */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          {/* Changed icon color to white */}
          <Scan className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">AI Fit Finder</h3>
        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
          Upload your photo or enter measurements. AI analyzes your body type and recommends perfect size.
        </p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Try it now <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="group bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setPage('color_picker')}>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Palette className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">AI Color Picker</h3>
        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
          See yourself in any color. AI-powered visualization shows realistic previews before purchase.
        </p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Explore colors <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="group bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setPage('style_finder')}>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <ImageIcon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Style Finder</h3>
        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
          Upload any clothing photo. AI identifies the style and suggests matching pieces from our collection.
        </p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Find styles <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="group bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setPage('booking')}>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Virtual Consultation</h3>
        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
          Book a free 15-min video call with expert stylists. Get personalized recommendations.
        </p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Book now <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      <div className="group bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setPage('wardrobe')}>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Shirt className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Digital Wardrobe</h3>
        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
          Track purchases and get AI-driven recommendations. Build your perfect wardrobe over time.
        </p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          View wardrobe <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
);

const FitFinderPage: React.FC = () => {
  const [heightCm, setHeightCm] = useState(175);
  const [weight, setWeight] = useState(70);
  const [build, setBuild] = useState<'Slim' | 'Athletic' | 'Broad' | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [shoeSize, setShoeSize] = useState<number | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const cmToFeetInches = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  const feetInchesToCm = (feet: number, inches: number) => {
    return Math.round((feet * 12 + inches) * 2.54);
  };

  const { feet: displayFeet, inches: displayInches } = cmToFeetInches(heightCm);

  useEffect(() => {
    if (uploadedPhoto) {
      setSize('XL');
      const totalInches = heightCm / 2.54;
      const calculatedShoeSize = Math.round(((totalInches - 58) * 0.5) + 38);
      setShoeSize(calculatedShoeSize);
      return;
    }

    if (!build) {
      setSize(null);
      setShoeSize(null);
      return;
    }

    let recommended = 'M';
    if (heightCm < 165) {
      if (weight < 60) recommended = 'XS';
      else if (weight < 70) recommended = 'S';
      else if (weight < 85) recommended = 'M';
      else if (weight < 100) recommended = 'L';
      else recommended = 'XL';
    } else if (heightCm < 175) {
      if (weight < 65) recommended = 'S';
      else if (weight < 75) recommended = 'M';
      else if (weight < 90) recommended = 'L';
      else if (weight < 105) recommended = 'XL';
      else recommended = 'XXL';
    } else if (heightCm < 185) {
      if (weight < 70) recommended = 'M';
      else if (weight < 85) recommended = 'L';
      else if (weight < 100) recommended = 'XL';
      else recommended = 'XXL';
    } else {
      if (weight < 80) recommended = 'L';
      else if (weight < 95) recommended = 'XL';
      else recommended = 'XXL';
    }

    if (build === 'Slim') {
      if (recommended === 'XL') recommended = 'L';
      else if (recommended === 'L') recommended = 'M';
      else if (recommended === 'M') recommended = 'S';
    } else if (build === 'Broad') {
      if (recommended === 'M') recommended = 'L';
      else if (recommended === 'L') recommended = 'XL';
      else if (recommended === 'XL') recommended = 'XXL';
    }

    setSize(recommended);
    const totalInches = heightCm / 2.54;
    const calculatedShoeSize = Math.round(((totalInches - 58) * 0.5) + 38);
    setShoeSize(calculatedShoeSize);

  }, [heightCm, weight, build, uploadedPhoto]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
        <div className="flex items-start">
          <Zap className="h-6 w-6 text-yellow-300 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">AI-Powered Fit Analysis</h3>
            <p className="text-blue-50 text-sm">
              Upload your photo for instant AI body analysis, or manually enter measurements.
              Get accurate size recommendations instantly.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Fit Finder</h1>
      <p className="text-lg text-gray-600 mb-8">
        Get your perfect size in seconds using AI technology
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Camera className="h-6 w-6 text-blue-600 mr-2" />
              AI Photo Analysis (Optional)
            </h3>
            {!uploadedPhoto ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 hover:bg-gray-50 transition-all text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-base font-semibold text-gray-900 mb-1">Upload Your Photo</p>
                  <p className="text-xs text-gray-600">
                    AI will analyze your body type and suggest the best fit
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative">
                <img src={uploadedPhoto} alt="Uploaded" className="w-full h-56 object-cover rounded-xl" />
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs text-green-900 flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    AI Analysis Complete - XL Recommended
                  </p>
                </div>
              </div>
            )}
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-gray-600 mt-0.5" />
                <p className="text-[10px] text-gray-600">
                  <strong>Privacy:</strong> Photos processed via Google Gemini AI and never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Measurements</h3>
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                  Height (cm)
                  <span className="font-black text-blue-600 text-base">{heightCm} cm</span>
                </label>
                <input
                  type="range"
                  min="150"
                  max="210"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                  Height (ft/in)
                  <span className="font-black text-blue-600 text-base">{displayFeet}&apos; {displayInches}&quot;</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">Feet</label>
                    <input
                      type="range"
                      min="4"
                      max="7"
                      value={displayFeet}
                      onChange={(e) => setHeightCm(feetInchesToCm(Number(e.target.value), displayInches))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="text-center mt-1 font-bold text-gray-900 text-xs">{displayFeet}&apos;</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">Inches</label>
                    <input
                      type="range"
                      min="0"
                      max="11"
                      value={displayInches}
                      onChange={(e) => setHeightCm(feetInchesToCm(displayFeet, Number(e.target.value)))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="text-center mt-1 font-bold text-gray-900 text-xs">{displayInches}&quot;</div>
                  </div>
                </div>
              </div>
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                  Weight
                  <span className="font-black text-blue-600 text-base">{weight} kg</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Body Build</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Slim', 'Athletic', 'Broad'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBuild(b)}
                      className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${build === b
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-blue-500">
            {size ? (
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900 mb-6">Your AI-Recommended Sizes:</p>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 mb-4 shadow-xl">
                  <p className="text-sm font-bold text-white mb-2">Clothing Size</p>
                  <div className="text-7xl font-black text-white drop-shadow-2xl mb-2">{size}</div>
                  <p className="text-lg font-bold text-white">{build} Fit</p>
                </div>
                {shoeSize && (
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 mb-4 shadow-xl">
                    <p className="text-sm font-bold text-white mb-2">Shoe Size (EU)</p>
                    <div className="text-5xl font-black text-white drop-shadow-2xl">{shoeSize}</div>
                  </div>
                )}
                <div className="mt-4 p-4 bg-gray-100 rounded-xl border-2 border-gray-300">
                  <p className="text-sm font-black text-gray-900">
                    Measurements: {heightCm}cm | {displayFeet}&apos;{displayInches}&quot; | {weight}kg
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Select your build to unlock your perfect size
                </p>
                <p className="text-sm text-gray-600">
                  AI-powered precision fit analysis
                </p>
              </div>
            )}
          </div>
          <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center text-base">
              <Zap className="h-5 w-5 text-blue-500 mr-2" />
              How It Works
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold mr-2 mt-0.5">1</span>
                <span className="leading-relaxed">Upload photo (optional) or enter manual measurements</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold mr-2 mt-0.5">2</span>
                <span className="leading-relaxed">AI analyzes 500+ pattern data points from our workshop</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold mr-2 mt-0.5">3</span>
                <span className="leading-relaxed">Get instant size recommendation with 95% accuracy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorPickerPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>({
    id: 'navy',
    name: 'Navy Blue',
    hex: '#1e3a5f',
    imageUrl: '/bizcomp/accfinity/navy-blazer.jpg',
  });
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setShowUploadSection(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white shadow-xl">
        <div className="flex items-start">
          <Palette className="h-6 w-6 text-yellow-300 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">AI Color Visualization</h3>
            <p className="text-white text-opacity-95 text-sm">
              See yourself in any color before buying. Multi-palette color options powered by AI.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Color Picker</h1>
      <p className="text-lg text-gray-600 mb-8">
        Preview realistic colors using Google Gemini AI
      </p>

      {showUploadSection ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Your Photo
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
                We&apos;ll show you a realistic image wearing this blazer in different colors
              </p>
              <label className="inline-block cursor-pointer mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all text-lg">
                  Choose Photo
                </div>
              </label>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Sparkles className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">AI Powered</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Palette className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Multi-Palette</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">No Data Stored</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl text-white">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-lg text-white mb-1">We Do Not Store Your Data</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      We use <strong className="text-white">Google Gemini AI</strong> for color transformation.
                      Your photo is processed securely in real-time and <strong className="text-blue-400">immediately
                        discarded</strong> after visualization. Zero storage, maximum privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 pt-6">
              <button
                onClick={() => setShowUploadSection(false)}
                className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all text-base border-2 border-gray-300"
              >
                Skip and use model photos →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100 relative">
              <div className="relative aspect-[3/4] bg-gray-100">
                <img
                  src={uploadedImage || selectedColor.imageUrl}
                  alt={`${selectedColor.name} Blazer Preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-xl border-2 border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="font-bold text-gray-900 text-sm">{selectedColor.name}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">The Constant Blazer</h3>
              <p className="text-gray-600 mb-4 text-base">Premium wool blend - Tailored fit</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">৳8,500</span>
                <Button className="px-6 py-3 text-base">
                  Add to Cart
                </Button>
              </div>
            </div>
            {uploadedImage && (
              <button
                onClick={() => {
                  setShowUploadSection(true);
                  setUploadedImage(null);
                }}
                className="w-full py-3 text-blue-600 border-2 border-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all text-base"
              >
                Upload Different Photo
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Color</h3>
              <div className="grid grid-cols-2 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedColor.id === color.id
                        ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-lg'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <p className={`font-bold text-sm ${selectedColor.id === color.id ? 'text-blue-700' : 'text-gray-700'
                          }`}>
                          {color.name}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">{color.hex}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl text-white shadow-lg">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Powered by Google Gemini</h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Real-time AI color transformation with photorealistic results.
                    Multi-palette available for extensive customization.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
              <p className="text-xs text-gray-600 mb-1 font-semibold">Return Reduction Impact</p>
              <p className="text-4xl font-black text-green-600 mb-1">-23%</p>
              <p className="text-xs text-gray-700 font-semibold">Color mismatch returns eliminated</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StyleFinderPage: React.FC = () => {
  const [uploadedStyle, setUploadedStyle] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const handleStyleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedStyle(reader.result as string);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setResults(true);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-xl text-white shadow-xl">
        <div className="flex items-start">
          <ImageIcon className="h-6 w-6 text-yellow-300 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">AI Style Recognition</h3>
            <p className="text-white text-opacity-95 text-sm">
              Upload any clothing photo and AI will identify the style, suggesting matching pieces from our collection.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Style Finder</h1>
      <p className="text-lg text-gray-600 mb-8">
        Find your perfect match from our collection
      </p>

      {!uploadedStyle ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-10">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleStyleUpload}
                className="hidden"
              />
              <div className="border-4 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-gray-50 transition-all text-center group">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4 group-hover:text-blue-600 transition-colors" />
                <p className="text-2xl font-bold text-gray-900 mb-2">Upload Clothing Photo</p>
                <p className="text-base text-gray-600 mb-6">
                  AI will analyze the style and suggest similar items from Polaris
                </p>
                <div className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl transition-all text-base">
                  Select Photo
                </div>
              </div>
            </label>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <Search className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-700">AI Analysis</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-700">Style Match</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-700">No Storage</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-100 sticky top-6">
              <img src={uploadedStyle} alt="Uploaded Style" className="w-full h-64 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Uploaded Photo</h3>
                {analyzing ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-sm text-gray-600">Analyzing style...</span>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-green-600 font-semibold">
                      <Check className="h-4 w-4 mr-2" />
                      Style: Tailored Blazer
                    </p>
                    <p className="flex items-center text-green-600 font-semibold">
                      <Check className="h-4 w-4 mr-2" />
                      Color: Navy Blue
                    </p>
                    <p className="flex items-center text-green-600 font-semibold">
                      <Check className="h-4 w-4 mr-2" />
                      Fit: Slim-Fit
                    </p>
                  </div>
                )}
                <button
                  onClick={() => {
                    setUploadedStyle(null);
                    setResults(false);
                  }}
                  className="w-full mt-4 py-2 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:bg-gray-50 transition-all text-sm"
                >
                  Upload Different Photo
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Matching Pieces from Polaris</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {genericProducts.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all group">
                  <div className="relative">
                    <img src={item.imageUrl} alt={item.name} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
                      In Stock
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-gray-600 text-xs mb-3">Sustainable - Carbon Neutral</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                        95% Match
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                        Eco-Friendly
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">৳{item.price.toLocaleString()}</span>
                      <Button className="px-4 py-2 text-sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 bg-gradient-to-r from-purple-500 to-purple-700 p-4 rounded-xl text-white shadow-xl">
        <div className="flex items-start">
          <Calendar className="h-6 w-6 text-yellow-300 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">Scalable Premium Service</h3>
            <p className="text-white text-opacity-95 text-sm">
              20-30 consultations/day from HQ vs 3-4 home visits. 10x operational efficiency.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Consultation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Free 15-minute video call with expert stylists
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100">
          <Image
            src="/bizcomp/accfinity/online-meeting.jpg"
            alt="Virtual Consultation Example"
            width={800}
            height={600}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">See How It Works</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Our virtual consultations provide the same premium experience as home visits,
              with the convenience of connecting from anywhere.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What You Get</h3>
          <ul className="space-y-4">
            {[
              { title: '1-on-1 Expert Advice', desc: 'In-house team trained on our exact patterns' },
              { title: 'Personalized Sizing', desc: 'Video-guided measurements for perfect fit' },
              { title: 'Style Consultation', desc: 'Build complete wardrobe, BDT 4K → 12K+ AOV' }
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="bg-green-100 rounded-full p-1.5 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 max-w-xl mx-auto">
        {!isConfirmed ? (
          <form onSubmit={(e) => { e.preventDefault(); setIsConfirmed(true); }}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Full Name</label>
                <input type="text" required className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Topic</label>
                <textarea className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" rows={3} placeholder="Sizing help, wardrobe building, fabric questions..."></textarea>
              </div>
              <Button type="submit" className="w-full text-base py-3">
                Request Consultation
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="bg-green-100 rounded-full p-6 mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmed!</h3>
            <p className="text-base text-gray-700 max-w-sm mb-6">
              We&apos;ll email you within 24 hours to schedule your consultation.
            </p>
            <Button onClick={() => setIsConfirmed(false)} variant="secondary">
              Book Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const WardrobePage: React.FC = () => {
  const ownedItems = mockWardrobe.filter(item => item.status === 'Owned');
  const recommendedItems = mockWardrobe.filter(item => item.status === 'Recommended');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl text-white shadow-xl">
        <div className="flex items-start">
          <Shirt className="h-6 w-6 text-white mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">High-LTV Retention Engine</h3>
            <p className="text-white text-opacity-95 text-sm">
              AI transforms one-time buyers (BDT 4K) into loyal customers (BDT 35K+ over 2 years).
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Wardrobe</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your personal collection with AI-powered recommendations
      </p>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Collection</h2>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold shadow-md text-sm">
            Total Value: ৳{(ownedItems.reduce((sum, item) => sum + item.price, 0)).toLocaleString()}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ownedItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
              onClick={() => { if (item.id === 1) window.location.href = '/bizcomp/accfinity/r3/product-page'; }}
            >
              <img src={item.imageUrl} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-base font-bold text-gray-900 mb-0.5 truncate">{item.name}</h4>
                <p className="text-lg font-bold text-blue-600 mb-2">৳{item.price.toLocaleString()}</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                  OWNED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-bold text-blue-900 mb-0.5 text-base">AI Recommendation</p>
              <p className="text-sm text-blue-800">
                Based on your collection, you have an <strong>87% match rate</strong> with these pieces.
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-dashed border-blue-500 hover:border-solid hover:shadow-xl hover:scale-105 transition-all">
              <img src={item.imageUrl} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-base font-bold text-gray-900 mb-0.5 truncate">{item.name}</h4>
                <p className="text-lg font-bold text-blue-600 mb-2">৳{item.price.toLocaleString()}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full mb-3">
                  AI MATCH
                </span>
                <Button className="w-full py-2 text-sm">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Projected 2-Year LTV</p>
              <p className="text-5xl font-black text-blue-400">৳35,000+</p>
              <p className="text-sm text-gray-400 mt-1">vs ৳4,000 one-time buyers</p>
            </div>
            <TrendingUp className="h-16 w-16 text-blue-400" />
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
        return <DashboardPage setPage={setPage} />;
      case 'fit_finder':
        return <FitFinderPage />;
      case 'color_picker':
        return <ColorPickerPage />;
      case 'style_finder':
        return <StyleFinderPage />;
      case 'booking':
        return <BookingPage />;
      case 'wardrobe':
        return <WardrobePage />;
      default:
        return <DashboardPage setPage={setPage} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <Sidebar currentPage={currentPage} setPage={setPage} className="hidden md:flex" />

      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-center justify-between h-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 shadow-xl">
          <Logo />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 shadow-2xl">
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
        <header className="flex items-center justify-between h-16 border-b border-gray-200 bg-white px-6 shadow-sm backdrop-blur-lg bg-opacity-95">
          <h2 className="text-xl font-bold text-gray-900">
            {{
              'dashboard': 'Overview',
              'fit_finder': 'AI Fit Finder',
              'color_picker': 'AI Color Picker',
              'style_finder': 'AI Style Finder',
              'booking': 'Virtual Consultation',
              'wardrobe': 'Digital Wardrobe'
            }[currentPage]}
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold shadow-md text-xs">
            <Sparkles className="h-3 w-3 text-white" />
            Investor Demo - {new Date().getFullYear()}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}