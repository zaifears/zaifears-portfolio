'use client';

import React, { useState } from 'react';
import { FiArrowUpRight, FiArrowDownLeft, FiMoreVertical, FiEye, FiEyeOff, FiBell, FiSettings, FiCode } from 'react-icons/fi';
import { MdSend, MdLocalAtm, MdShoppingCart, MdMobileScreenShare, MdReceiptLong, MdHistory } from 'react-icons/md';

export default function BKashDemoApp() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Mock data
  const accountData = {
    balance: 45820,
    name: 'Ahmed Hassan',
    phone: '+880 1712 345 678',
    level: 'User',
  };

  const services = [
    { icon: MdSend, label: 'Send Money', color: 'from-pink-500 to-red-500' },
    { icon: MdLocalAtm, label: 'Cash Out', color: 'from-blue-500 to-cyan-500' },
    { icon: MdShoppingCart, label: 'Payment', color: 'from-purple-500 to-pink-500' },
    { icon: MdMobileScreenShare, label: 'Top Up', color: 'from-green-500 to-emerald-500' },
    { icon: MdReceiptLong, label: 'Bill Payment', color: 'from-orange-500 to-red-500' },
    { icon: MdHistory, label: 'Loan', color: 'from-indigo-500 to-blue-500' },
  ];

  const transactions = [
    { type: 'send', amount: 500, recipient: 'Farhan Khan', date: '10 min ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 2000, recipient: 'Rahim Ahmed', date: '2 hours ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 1500, recipient: 'Mobile Bill', date: '5 hours ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 3500, recipient: 'Business Payment', date: '1 day ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 750, recipient: 'Online Purchase', date: '2 days ago', status: 'Completed', icon: FiArrowUpRight },
  ];

  const quickActions = [
    { icon: FiCode, label: 'Scan & Pay' },
    { icon: MdSend, label: 'Request Money' },
    { icon: FiBell, label: 'Set Reminder' },
    { icon: FiSettings, label: 'Offers' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-linear-to-r from-pink-600 via-red-600 to-orange-600 text-white sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">bKash</h1>
          <div className="flex gap-4">
            <button onClick={() => alert('Notifications')} className="p-2 hover:bg-white/20 rounded-lg transition cursor-pointer">
              <FiBell size={24} />
            </button>
            <button onClick={() => alert('Settings')} className="p-2 hover:bg-white/20 rounded-lg transition cursor-pointer">
              <FiSettings size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="max-w-md mx-auto px-4 -mt-8 relative z-40">
        <div className="bg-linear-to-br from-pink-500 via-red-500 to-orange-600 rounded-3xl shadow-2xl p-8 text-white">
          {/* User Info */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-90">Account Holder</p>
              <p className="text-xl font-bold">{accountData.name}</p>
              <p className="text-xs opacity-75">{accountData.phone}</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              {accountData.level}
            </div>
          </div>

          {/* Balance Section */}
          <div>
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <div className="flex justify-between items-baseline gap-4">
              <p className="text-4xl font-bold">
                {showBalance ? `৳ ${accountData.balance.toLocaleString()}` : '••••••'}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                {showBalance ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const handleClick = () => alert(`Clicked: ${action.label}`);
            return (
              <button
                key={idx}
                onClick={handleClick}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center gap-2 cursor-pointer"
              >
                <Icon size={24} className="text-pink-600" />
                <p className="text-xs font-semibold text-gray-700 text-center">{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Services</h2>
          <button onClick={() => alert('View all services')} className="text-pink-600 text-sm font-semibold hover:underline cursor-pointer">See All</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const handleClick = () => alert(`Service: ${service.label}`);
            return (
              <button
                key={idx}
                onClick={handleClick}
                className={`bg-linear-to-br ${service.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center gap-3 text-white cursor-pointer`}
              >
                <Icon size={32} />
                <p className="text-xs font-semibold text-center">{service.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <button onClick={() => alert('View all transactions')} className="text-pink-600 text-sm font-semibold hover:underline cursor-pointer">View All</button>
        </div>
        <div className="space-y-2">
          {transactions.map((txn, idx) => {
            const Icon = txn.icon;
            const handleClick = () => alert(`Transaction: ${txn.recipient} - ${txn.type === 'send' ? '-' : '+'} ৳ ${txn.amount}`);
            return (
              <button
                key={idx}
                onClick={handleClick}
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition w-full cursor-pointer text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-full ${txn.type === 'send' ? 'bg-red-100' : 'bg-green-100'}`}>
                    <Icon size={20} className={txn.type === 'send' ? 'text-red-600' : 'text-green-600'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{txn.recipient}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${txn.type === 'send' ? 'text-red-600' : 'text-green-600'}`}>
                    {txn.type === 'send' ? '-' : '+'} ৳ {txn.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{txn.status}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="max-w-md mx-auto px-4 mt-8 mb-4">
        <div className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">Send Money & Get Cashback!</h3>
          <p className="text-sm opacity-90 mb-4">Get up to 50 Taka cashback on your next 5 transfers</p>
          <button onClick={() => alert('Cashback offer details')} className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer">
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-md mx-auto fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t border-gray-200 flex justify-around items-center">
        {[
          { icon: FiArrowUpRight, label: 'Send', id: 'send' },
          { icon: FiArrowDownLeft, label: 'Receive', id: 'receive' },
          { icon: MdHistory, label: 'History', id: 'history' },
          { icon: FiSettings, label: 'Menu', id: 'menu' },
        ].map((nav) => {
          const Icon = nav.icon;
          return (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition ${
                activeTab === nav.id ? 'text-pink-600' : 'text-gray-600'
              }`}
            >
              <Icon size={24} />
              <p className="text-xs font-semibold">{nav.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
