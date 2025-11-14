"use client";
import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, ChevronDown, ChevronUp, Leaf, Droplet, Trees, ShoppingCart, Star } from 'lucide-react';

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showProductCode, setShowProductCode] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* --- PALETTE CHANGE: Header --- */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <a href="/bizcomp/accfinity/r3" className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors font-bold text-lg">
              <ArrowLeft className="h-6 w-6" />
              Back to Demo
            </a>
            <img src="/bizcomp/polaris-transparent.png" alt="Polaris" style={{ width: '140px', height: '45px' }} className="object-contain" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* --- PALETTE CHANGE: Image Border --- */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-500">
              <div className="aspect-[3/4]">
                <img 
                  src="/bizcomp/accfinity/burgundy-blazer.jpg" 
                  alt="The Burgundy Estate Blazer" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* --- (Retained Green for Sustainability Theme) --- */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-2xl text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <Leaf className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-black">Carbon Meter</h3>
                  <p className="text-xl font-bold text-green-100">The better blazer. Better indeed.</p>
                </div>
              </div>

              <div className="space-y-5 mb-6">
                <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-md">
                  <Leaf className="h-7 w-7 flex-shrink-0 mt-1 text-green-600" />
                  <div>
                    <p className="font-black text-lg text-gray-900">Removes 26.61 kilos of CO2</p>
                    <p className="text-sm text-green-700 font-bold">Carbon offset with every purchase</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-md">
                  <Droplet className="h-7 w-7 flex-shrink-0 mt-1 text-blue-500" />
                  <div>
                    <p className="font-black text-lg text-gray-900">Saves 269.41 litres of water</p>
                    <p className="text-sm text-green-700 font-bold">Sustainable production methods</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-md">
                  <Trees className="h-7 w-7 flex-shrink-0 mt-1 text-green-800" />
                  <div>
                    <p className="font-black text-lg text-gray-900">Plants 3 trees per purchase</p>
                    <p className="text-sm text-green-700 font-bold">Contributing to reforestation</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-center font-bold text-green-800">Every purchase makes a measurable environmental impact</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-100">
              {/* --- PALETTE CHANGE: Breadcrumb Active --- */}
              <div className="text-sm text-gray-500 mb-4 font-semibold">
                Home / Polaris / Blazers / Collection / <span className="text-blue-700 font-bold">The Burgundy Estate</span>
              </div>

              {/* --- PALETTE CHANGE: Title Gradient --- */}
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                The Burgundy Estate Blazer
              </h1>
              
              {/* --- PALETTE CHANGE: Price Color --- */}
              <div className="mb-6">
                <span className="text-6xl font-black text-blue-700">৳10,500</span>
              </div>

              {/* --- (Retained Green for Sustainability Theme) --- */}
              <div className="mb-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl">
                <p className="text-base text-green-900 font-bold leading-relaxed">
                  ✓ The better blazer. Removes 26.61 kilos of CO2, saves 269.41 litres of water. And plants 3 trees with every single purchase. Better indeed.
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-xl font-black text-gray-900 mb-4">Select Size</label>
                <div className="grid grid-cols-6 gap-3">
                  {/* --- PALETTE CHANGE: Size Button Active --- */}
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`py-4 rounded-2xl font-black text-lg transition-all ${selectedSize === size ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xl font-black text-gray-900 mb-4">Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl font-black text-2xl hover:from-gray-300 hover:to-gray-400 transition-all shadow-lg">
                    -
                  </button>
                  <span className="text-3xl font-black text-gray-900 w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl font-black text-2xl hover:from-gray-300 hover:to-gray-400 transition-all shadow-lg">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                {/* --- PALETTE CHANGE: Add to Bag Button --- */}
                <button disabled={!selectedSize} className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl ${selectedSize ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-2xl hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <ShoppingCart className="h-7 w-7" />
                  ADD TO BAG
                </button>
                <button onClick={() => setIsFavorite(!isFavorite)} className={`p-5 rounded-2xl border-4 transition-all shadow-lg ${isFavorite ? 'bg-red-50 border-red-500 text-red-500 scale-105' : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:scale-105'}`}>
                  <Heart className={`h-7 w-7 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-5 rounded-2xl border-4 border-gray-300 text-gray-600 hover:border-gray-400 transition-all shadow-lg hover:scale-105">
                  <Share2 className="h-7 w-7" />
                </button>
              </div>

              {!selectedSize && (
                <p className="text-center text-red-600 font-black text-lg mb-6 bg-red-50 py-3 rounded-2xl">
                  ⚠ Please select a size to continue
                </p>
              )}

              <button className="w-full py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 font-black rounded-2xl hover:from-gray-300 hover:to-gray-400 transition-all mb-8 shadow-lg text-lg">
                FIND IN STORE
              </button>

              <div className="space-y-4">
                {/* --- PALETTE CHANGE: Accordion Border --- */}
                <div className="border-4 border-blue-500 rounded-2xl overflow-hidden shadow-lg">
                  {/* --- PALETTE CHANGE: Accordion Header --- */}
                  <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all">
                    <span className="font-black text-xl">Size Guide</span>
                    {showSizeGuide ? <ChevronUp className="h-7 w-7" /> : <ChevronDown className="h-7 w-7" />}
                  </button>
                  {showSizeGuide && (
                    <div className="px-6 py-5 bg-gray-50">
                      <table className="w-full">
                        <thead>
                          {/* --- PALETTE CHANGE: Table Header Border --- */}
                          <tr className="border-b-4 border-blue-500">
                            <th className="py-3 text-left font-black text-lg">Size</th>
                            <th className="py-3 text-left font-black text-lg">Chest</th>
                            <th className="py-3 text-left font-black text-lg">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizes.map((size) => (
                            <tr key={size} className="border-b-2 border-gray-200">
                              <td className="py-3 font-bold text-lg">{size}</td>
                              <td className="py-3 text-gray-700">38-40&quot;</td>
                              <td className="py-3 text-gray-700">18&quot;</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="border-4 border-blue-500 rounded-2xl overflow-hidden shadow-lg">
                  <button onClick={() => setShowProductCode(!showProductCode)} className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all">
                    <span className="font-black text-xl">Product Code</span>
                    {showProductCode ? <ChevronUp className="h-7 w-7" /> : <ChevronDown className="h-7 w-7" />}
                  </button>
                  {showProductCode && (
                    <div className="px-6 py-5 bg-gray-50">
                      {/* --- PALETTE CHANGE: Product Code Text --- */}
                      <p className="font-mono font-black text-blue-700 text-2xl mb-2">BRG-BLZ-001</p>
                      <p className="text-base text-gray-600 font-semibold">SKU: POLARIS-BLAZER-BRG-2025</p>
                    </div>
                  )}
                </div>

                <div className="border-4 border-blue-500 rounded-2xl overflow-hidden shadow-lg">
                  <button onClick={() => setShowDescription(!showDescription)} className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all">
                    <span className="font-black text-xl">Description</span>
                    {showDescription ? <ChevronUp className="h-7 w-7" /> : <ChevronDown className="h-7 w-7" />}
                  </button>
                  {showDescription && (
                    <div className="px-6 py-5 bg-gray-50">
                      <div className="space-y-4 text-gray-700">
                        {/* --- PALETTE CHANGE: Description Highlight --- */}
                        <p className="leading-relaxed text-base"><strong className="text-blue-700">The Estate Collection</strong> - A timeless tailored piece crafted for sophisticated versatility.</p>
                        <ul className="space-y-2 ml-4 text-base">
                          <li>-&nbsp; Premium Wool Blend</li>
                          <li>-&nbsp; Tailored Slim Fit</li>
                          <li>-&nbsp; Carbon-neutral manufacturing</li>
                          <li>-&nbsp; Double-vented back</li>
                          <li>-&nbsp; Gold-plated buttons</li>
                          <li>-&nbsp; Silk interior lining</li>
                        </ul>
                        <p className="leading-relaxed text-base"><strong className="text-blue-700">Care:</strong> Dry clean only.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-4 border-blue-500 rounded-2xl overflow-hidden shadow-lg">
                  <button onClick={() => setShowReviews(!showReviews)} className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700 transition-all">
                    <span className="font-black text-xl">Reviews (42)</span>
                    {showReviews ? <ChevronUp className="h-7 w-7" /> : <ChevronDown className="h-7 w-7" />}
                  </button>
                  {showReviews && (
                    <div className="px-6 py-5 bg-gray-50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-black text-2xl text-gray-900">4.8/5</span>
                        <span className="text-gray-600 font-semibold">(42 reviews)</span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { name: 'Ahmed R.', rating: 5, comment: 'Perfect fit and amazing quality! Love the sustainability aspect.' },
                          { name: 'Sarah K.', rating: 5, comment: 'Best blazer I have bought. Comfortable and stylish.' },
                          { name: 'Mehedi H.', rating: 4, comment: 'Great quality, runs slightly large. Size down if between sizes.' }
                        ].map((review, i) => (
                          <div key={i} className="bg-white p-5 rounded-2xl border-2 border-gray-200 shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, idx) => (
                                  <Star key={idx} className={`h-5 w-5 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="font-black text-gray-900">{review.name}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}