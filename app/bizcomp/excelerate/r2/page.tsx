'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import { FiArrowUpRight, FiArrowDownLeft, FiMoreVertical, FiEye, FiEyeOff, FiBell, FiSettings, FiCode, FiHome } from 'react-icons/fi';
import { MdSend, MdLocalAtm, MdShoppingCart, MdMobileScreenShare, MdReceiptLong, MdHistory, MdTrendingUp, MdPublic, MdCallSplit } from 'react-icons/md';
import { FaQrcode } from 'react-icons/fa';

export default function PaywaveDemo() {
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [sendMoneyStep, setSendMoneyStep] = useState('input'); // 'input', 'amount', 'preview'
  const [recipientPhone, setRecipientPhone] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showUnderdevelopment, setShowUnderdevelopment] = useState(false);
  const [showMobileRecharge, setShowMobileRecharge] = useState(false);
  const [rechargeStep, setRechargeStep] = useState('input'); // 'input', 'operator', 'type', 'preview'
  const [rechargePhone, setRechargePhone] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [lastRechargeTapTime, setLastRechargeTapTime] = useState(0);
  const [showCashOut, setShowCashOut] = useState(false);
  const [cashoutTab, setCashoutTab] = useState('atm'); // 'atm' or 'agent'
  const [showAgentCashout, setShowAgentCashout] = useState(false);
  const [agentCashoutStep, setAgentCashoutStep] = useState('amount'); // 'amount', 'preview'
  const [agentCode, setAgentCode] = useState('');
  const [agentCashoutAmount, setAgentCashoutAmount] = useState('');
  const [lastAgentTapTime, setLastAgentTapTime] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('input'); // 'input', 'amount', 'preview'
  const [paymentNumber, setPaymentNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [lastPaymentTapTime, setLastPaymentTapTime] = useState(0);
  const [showPaymentSplitting, setShowPaymentSplitting] = useState(false);
  const [splitStep, setSplitStep] = useState('input'); // 'input', 'qr-display', 'qr-scan', 'split-confirm'
  const [splitAmount, setSplitAmount] = useState('');
  const [splitMode, setSplitMode] = useState('create'); // 'create' or 'join'
  const [participants, setParticipants] = useState<Array<{id: number, name: string, amount: number}>>([]);
  const [participantCount, setParticipantCount] = useState(2);
  const [lastSplitTapTime, setLastSplitTapTime] = useState(0);
  const [showInvestment, setShowInvestment] = useState(false);
  const [investmentStep, setInvestmentStep] = useState('options'); // 'options' or 'alternative'
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'বাং'>('EN');

  // Mock data
  const accountData = {
    balance: 4582.75,
    name: 'Shahoriar Hossain',
    phone: '+880 1712 345 678',
    level: 'User',
  };

  const services = [
    { icon: MdSend, label: 'Send Money' },
    { icon: MdMobileScreenShare, label: 'Mobile Recharge' },
    { icon: MdLocalAtm, label: 'Cash Out' },
    { icon: MdShoppingCart, label: 'Payment' },
    { icon: MdCallSplit, label: 'Payment Splitting' },
    { icon: MdTrendingUp, label: 'Investment' },
  ];

  const transactions = [
    { type: 'send', amount: 500, recipient: 'Rohan', date: '10 min ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 2000, recipient: 'Turjo', date: '2 hours ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 1500, recipient: 'Payment Split - Restaurant', date: '5 hours ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 3500, recipient: 'Saifullah', date: '1 day ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 750, recipient: 'Online Purchase', date: '2 days ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 1200, recipient: 'Freelance Project', date: '3 days ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 2500, recipient: 'Rohan', date: '4 days ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 800, recipient: 'Money Request - Turjo', date: '5 days ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 3000, recipient: 'Utility Bill Payment', date: '6 days ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'send', amount: 450, recipient: 'Saifullah', date: '1 week ago', status: 'Completed', icon: FiArrowUpRight },
    { type: 'receive', amount: 5000, recipient: 'Salary Deposit', date: '1 week ago', status: 'Completed', icon: FiArrowDownLeft },
    { type: 'send', amount: 1800, recipient: 'Shopping - Clothes', date: '8 days ago', status: 'Completed', icon: FiArrowUpRight },
  ];

  const quickActions = [
    { icon: FiCode, label: 'Scan & Pay' },
    { icon: MdSend, label: 'Request Money' },
    { icon: FiBell, label: 'Set Reminder' },
    { icon: FiSettings, label: 'Offers' },
  ];

  const handleSendButtonTap = () => {
    const now = Date.now();
    if (lastTapTime && now - lastTapTime < 300) {
      // Double tap detected
      const charge = 5;
      const total = (parseFloat(sendAmount) + charge).toFixed(2);
      alert(`Send ৳${total} to ${recipientPhone} (Amount: ৳${sendAmount} + Charge: ৳${charge})? Transaction successful!`);
      setSendMoneyStep('input');
      setRecipientPhone('');
      setSendAmount('');
      setShowSendMoney(false);
    }
    setLastTapTime(now);
  };

  const handlePhoneInput = (value: string) => {
    if (value.length <= 11) {
      setRecipientPhone(value);
    }
  };

  const handleAmountInput = (value: string) => {
    setSendAmount(value);
  };

  const handleRechargePhoneInput = (value: string) => {
    if (value.length <= 11) {
      setRechargePhone(value);
    }
  };

  const handleRechargeAmountInput = (value: string) => {
    setRechargeAmount(value);
  };

  const handleRechargeButtonTap = () => {
    const now = Date.now();
    if (lastRechargeTapTime && now - lastRechargeTapTime < 300) {
      // Double tap detected
      alert(`Recharge ৳${rechargeAmount} on ${rechargePhone} (${selectedOperator} - ${selectedType})? Recharge successful!`);
      setRechargeStep('input');
      setRechargePhone('');
      setSelectedOperator('');
      setSelectedType('');
      setRechargeAmount('');
      setShowMobileRecharge(false);
    }
    setLastRechargeTapTime(now);
  };

  const handleAgentCodeInput = (value: string) => {
    // Only allow numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 11) {
      setAgentCode(numericValue);
    }
  };

  const handleAgentCashoutAmountInput = (value: string) => {
    setAgentCashoutAmount(value);
  };

  const handleAgentCashoutButtonTap = () => {
    const now = Date.now();
    if (lastAgentTapTime && now - lastAgentTapTime < 300) {
      // Double tap detected
      const charge = (parseFloat(agentCashoutAmount) * 0.0175).toFixed(2);
      const total = (parseFloat(agentCashoutAmount) + parseFloat(charge)).toFixed(2);
      alert(`Withdraw ৳${total} (Amount: ৳${agentCashoutAmount} + Charge: ৳${charge})? Withdrawal successful!`);
      setAgentCashoutStep('input');
      setAgentCode('');
      setAgentCashoutAmount('');
      setShowAgentCashout(false);
      setShowCashOut(false);
    }
    setLastAgentTapTime(now);
  };

  const handlePaymentNumberInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 11) {
      setPaymentNumber(numericValue);
    }
  };

  const handlePaymentAmountInput = (value: string) => {
    setPaymentAmount(value);
  };

  const handlePaymentButtonTap = () => {
    const now = Date.now();
    if (lastPaymentTapTime && now - lastPaymentTapTime < 300) {
      // Double tap detected
      const charge = 5;
      const total = (parseFloat(paymentAmount) + charge).toFixed(2);
      alert(`Pay ৳${total} to ${paymentNumber} (Amount: ৳${paymentAmount} + Charge: ৳${charge})? Payment successful!`);
      setPaymentStep('input');
      setPaymentNumber('');
      setPaymentAmount('');
      setShowPayment(false);
    }
    setLastPaymentTapTime(now);
  };

  const handleSplitAmountInput = (value: string) => {
    setSplitAmount(value);
  };

  const handleSplitNext = () => {
    if (splitAmount && parseFloat(splitAmount) > 0) {
      // Generate participants with equal split
      const amount = parseFloat(splitAmount);
      const perPerson = (amount / participantCount).toFixed(2);
      const names = ['You', 'Rohan', 'Turjo', 'Saifullah'];
      const newParticipants = Array.from({ length: participantCount }, (_, i) => ({
        id: i + 1,
        name: names[i] || `Person ${i + 1}`,
        amount: parseFloat(perPerson),
      }));
      setParticipants(newParticipants);
      setSplitStep('qr-display');
    }
  };

  const handleSplitJoinNext = () => {
    setSplitStep('split-confirm');
  };

  const handleSplitButtonTap = () => {
    const now = Date.now();
    if (lastSplitTapTime && now - lastSplitTapTime < 300) {
      // Double tap detected
      const totalAmount = participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2);
      alert(`Pay ৳${totalAmount} for group split? Transaction successful!`);
      setSplitStep('input');
      setSplitAmount('');
      setParticipants([]);
      setShowPaymentSplitting(false);
      setParticipantCount(2);
      setSplitMode('create');
    }
    setLastSplitTapTime(now);
  };

  const handleParticipantAmountChange = (id: number, newAmount: number) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, amount: newAmount } : p));
  };

  const modalOpen =
    showNotifications ||
    showSettings ||
    showSendMoney ||
    showMobileRecharge ||
    showCashOut ||
    showAgentCashout ||
    showPayment ||
    showPaymentSplitting ||
    showInvestment ||
    showQRScanner;

  return (
    <div
      className={`bg-gray-50 min-h-screen pb-24 ${modalOpen ? 'h-screen overflow-hidden overscroll-none' : ''}`}
    >
      {/* Under Development Modal */}
      {showUnderdevelopment && (
        <div className="fixed inset-0 bg-black/50 z-51 flex items-center justify-center pt-16">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <p className="text-3xl mb-4">🚧</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Under Development</h3>
            <p className="text-gray-600 mb-6">This feature is coming soon. Stay tuned!</p>
            <button
              onClick={() => setShowUnderdevelopment(false)}
              className="w-full bg-[#2f6b44] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d25] transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Notifications & Features</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-36 scroll-smooth overscroll-contain">
            {/* Feature 1 */}
            <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-lg p-4 border-l-4 border-[#2f6b44]">
              <h4 className="font-bold text-gray-900 mb-1">💳 Get Cashback on Every Transfer</h4>
              <p className="text-sm text-gray-600">Earn 0.5% cashback on all money transfers to your friends. Rewards add up fast!</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-linear-to-r from-[#ddaf3f]/10 to-[#2f6b44]/10 rounded-lg p-4 border-l-4 border-[#ddaf3f]">
              <h4 className="font-bold text-gray-900 mb-1">📈 Smart Investments Now Available</h4>
              <p className="text-sm text-gray-600">Start investing with as low as ৳100. Auto-invest feature helps grow your wealth daily.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-lg p-4 border-l-4 border-[#2f6b44]">
              <h4 className="font-bold text-gray-900 mb-1">🎁 Refer Friends & Earn Rewards</h4>
              <p className="text-sm text-gray-600">Invite 3 friends and get ৳500 bonus. They get ৳100 each when they sign up!</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-linear-to-r from-[#ddaf3f]/10 to-[#2f6b44]/10 rounded-lg p-4 border-l-4 border-[#ddaf3f]">
              <h4 className="font-bold text-gray-900 mb-1">🛡️ Enhanced Security Features</h4>
              <p className="text-sm text-gray-600">Biometric authentication and transaction limits for maximum security on your account.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-lg p-4 border-l-4 border-[#2f6b44]">
              <h4 className="font-bold text-gray-900 mb-1">🎯 Monthly Savings Goals</h4>
              <p className="text-sm text-gray-600">Set savings targets and auto-transfer funds. Track your progress with visual charts.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-linear-to-r from-[#ddaf3f]/10 to-[#2f6b44]/10 rounded-lg p-4 border-l-4 border-[#ddaf3f]">
              <h4 className="font-bold text-gray-900 mb-1">💰 Bill Payment Discounts</h4>
              <p className="text-sm text-gray-600">Get 2% discount on utility bills, internet, and mobile recharge payments this month!</p>
            </div>
          </div>

          {/* Close Button - Fixed above bottom navbar */}
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto w-full">
            <button
              onClick={() => setShowNotifications(false)}
              className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Settings</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-36 scroll-smooth overscroll-contain">
            {/* Profile */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-500">Profile</p>
                  <p className="text-sm font-bold text-gray-900">{accountData.name}</p>
                  <p className="text-xs text-gray-600">{accountData.phone}</p>
                </div>
                <span className="text-[10px] px-2 py-1 bg-[#ddaf3f]/20 text-[#ddaf3f] rounded-full border border-[#ddaf3f]/60">Verified</span>
              </div>
              <button className="w-full mt-2 bg-[#2f6b44] text-white py-2 rounded-lg font-semibold hover:bg-[#1a3d25] transition text-sm">Edit Profile</button>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Login & Security</p>
                  <p className="text-xs text-gray-600">Biometric login enabled</p>
                </div>
                <span className="text-[10px] px-2 py-1 bg-[#2f6b44]/10 text-[#2f6b44] rounded-full">On</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Transaction PIN</p>
                  <p className="text-xs text-gray-600">Required for every payment</p>
                </div>
                <button className="text-xs font-semibold text-[#2f6b44] border border-[#2f6b44]/50 px-3 py-1 rounded-lg hover:bg-[#2f6b44]/5 transition">Manage</button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Theme</p>
                  <p className="text-xs text-gray-600">Light</p>
                </div>
                <button className="text-xs font-semibold text-[#2f6b44] border border-[#2f6b44]/50 px-3 py-1 rounded-lg hover:bg-[#2f6b44]/5 transition">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Language</p>
                  <p className="text-xs text-gray-600">English (US)</p>
                </div>
                <button className="text-xs font-semibold text-[#2f6b44] border border-[#2f6b44]/50 px-3 py-1 rounded-lg hover:bg-[#2f6b44]/5 transition">Change</button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-600">Transactions, offers, and security alerts</p>
                </div>
                <span className="text-[10px] px-2 py-1 bg-[#2f6b44]/10 text-[#2f6b44] rounded-full">On</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">Email Updates</p>
                  <p className="text-xs text-gray-600">Monthly summary and insights</p>
                </div>
                <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Off</span>
              </div>
            </div>

            {/* Limits */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-2">
              <p className="text-sm font-bold text-gray-900">Limits</p>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Daily Transfer Limit</span>
                <span className="font-semibold">৳50,000</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>Single Transaction</span>
                <span className="font-semibold">৳10,000</span>
              </div>
              <button className="text-xs font-semibold text-[#2f6b44] border border-[#2f6b44]/50 px-3 py-1 rounded-lg hover:bg-[#2f6b44]/5 transition w-full">Request Increase</button>
            </div>
          </div>

          {/* Close Button - Fixed above bottom navbar */}
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto w-full">
            <button
              onClick={() => setShowSettings(false)}
              className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Recharge Modal */}
      {showMobileRecharge && (
        <div className="fixed inset-0 bg-linear-to-b from-gray-50 to-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-28">
            {/* Step 1: Phone Number Input */}
            {rechargeStep === 'input' && (
              <>
                <div className="mb-16"></div>
                <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Enter Mobile Number</label>
                  <input
                    type="tel"
                    value={rechargePhone}
                    onChange={(e) => handleRechargePhoneInput(e.target.value)}
                    placeholder="01X00000000"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2f6b44] focus:ring-2 focus:ring-[#2f6b44]/20 text-2xl font-bold text-gray-900 placeholder-gray-400 transition"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-500 font-medium">{rechargePhone.length} / 11 digits</p>
                    <div className={`w-24 h-1 bg-gray-200 rounded-full overflow-hidden`}>
                      <div className={`h-full bg-[#2f6b44] transition-all`} style={{width: `${(rechargePhone.length / 11) * 100}%`}}></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowUnderdevelopment(true)}
                  className="w-full bg-white border-2 border-[#2f6b44] text-[#2f6b44] py-3 rounded-xl font-bold hover:bg-[#2f6b44]/5 transition text-lg mb-8"
                >
                  📱 Select from Contacts
                </button>

                <div className="space-y-3 mt-8">
                  <button
                    onClick={() => setRechargeStep('operator')}
                    disabled={rechargePhone.length < 10}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setShowMobileRecharge(false)}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Select Operator */}
            {rechargeStep === 'operator' && (
              <>
                <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-2xl p-5 mb-6 border border-[#2f6b44]/20">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Mobile Number</p>
                  <p className="text-2xl font-bold text-[#2f6b44]">{rechargePhone}</p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Choose Your Operator</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Robi', 'Airtel', 'Banglalink', 'Grameenphone', 'Skitto', 'Ryze', 'Teletalk'].map((operator) => (
                      <button
                        key={operator}
                        onClick={() => setSelectedOperator(operator)}
                        className={`py-4 px-4 rounded-xl font-bold transition transform ${
                          selectedOperator === operator
                            ? 'bg-linear-to-br from-[#2f6b44] to-[#1a3d25] text-white shadow-md scale-105'
                            : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-[#2f6b44]/50'
                        }`}
                      >
                        {operator}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <button
                    onClick={() => setRechargeStep('type')}
                    disabled={!selectedOperator}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setRechargeStep('input')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Select Type (Prepaid/Postpaid) */}
            {rechargeStep === 'type' && (
              <>
                <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-2xl p-5 mb-6 border border-[#2f6b44]/20 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Number</p>
                    <p className="text-lg font-bold text-[#2f6b44]">{rechargePhone}</p>
                  </div>
                  <div className="h-px bg-gray-300/30"></div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Operator</p>
                    <p className="text-lg font-bold text-[#2f6b44]">{selectedOperator}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Select Connection Type</label>
                  <div className="space-y-3">
                    {['Prepaid', 'Postpaid'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`w-full py-4 px-4 rounded-xl font-bold transition transform ${
                          selectedType === type
                            ? 'bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white shadow-md scale-105'
                            : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-[#2f6b44]/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <button
                    onClick={() => setRechargeStep('amount')}
                    disabled={!selectedType}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setRechargeStep('operator')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Enter Amount */}
            {rechargeStep === 'amount' && (
              <>
                <div className="bg-linear-to-r from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-2xl p-5 mb-8 border border-[#2f6b44]/20 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Number</p>
                    <p className="text-lg font-bold text-[#2f6b44]">{rechargePhone}</p>
                  </div>
                  <div className="h-px bg-gray-300/30"></div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Operator • Type</p>
                    <p className="text-lg font-bold text-[#2f6b44]">{selectedOperator} • {selectedType}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 text-center">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3">Amount to recharge</p>
                  <div className="relative">
                    <input
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => handleRechargeAmountInput(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2f6b44] focus:ring-2 focus:ring-[#2f6b44]/20 text-5xl font-bold text-center text-[#2f6b44] placeholder-gray-300 transition"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">৳</span>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <button
                    onClick={() => setRechargeStep('preview')}
                    disabled={!rechargeAmount || rechargeAmount === '0'}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Review & Confirm
                  </button>
                  <button
                    onClick={() => setRechargeStep('type')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 5: Preview */}
            {rechargeStep === 'preview' && (
              <>
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Confirm Your Recharge</h4>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Mobile Number</span>
                      <span className="font-bold text-gray-900 text-lg">{rechargePhone}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Operator</span>
                      <span className="font-bold text-gray-900 text-lg">{selectedOperator}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Type</span>
                      <span className="font-bold text-gray-900 text-lg">{selectedType}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-linear-to-r from-[#2f6b44]/5 to-[#ddaf3f]/5 -mx-6 px-6 py-4 rounded-xl">
                      <span className="text-sm text-gray-700 font-bold">Amount to Recharge</span>
                      <span className="font-bold text-[#2f6b44] text-3xl">৳ {rechargeAmount}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-8 text-sm font-semibold bg-yellow-50 border border-yellow-200 rounded-lg py-3 px-4">Double tap button below to confirm</p>

                <div className="space-y-3 mt-8">
                  <button
                    onClick={handleRechargeButtonTap}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-5 rounded-xl font-bold hover:shadow-lg transition text-xl shadow-md active:scale-95"
                  >
                    ✓ Recharge Now
                  </button>
                  <button
                    onClick={() => setRechargeStep('amount')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cash Out Modal */}
      {showCashOut && (
        <div className="fixed inset-0 bg-linear-to-b from-gray-50 to-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Tabs */}
          <div className="flex bg-white border-b border-gray-200 sticky top-0 z-10 px-5">
            <button
              onClick={() => setCashoutTab('atm')}
              className={`flex-1 py-5 font-bold text-center transition relative ${
                cashoutTab === 'atm'
                  ? 'text-[#2f6b44]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏧 ATM
              {cashoutTab === 'atm' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#2f6b44] to-[#ddaf3f]"></div>}
            </button>
            <button
              onClick={() => setCashoutTab('agent')}
              className={`flex-1 py-5 font-bold text-center transition relative ${
                cashoutTab === 'agent'
                  ? 'text-[#2f6b44]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👤 Agent
              {cashoutTab === 'agent' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#2f6b44] to-[#ddaf3f]"></div>}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* From ATM Tab */}
            {cashoutTab === 'atm' && (
              <>
                <div className="mb-16 mt-4">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">🏧 ATM Network</h4>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Withdraw cash from our vast ATM network of our partner banks. Quick, secure, and available 24/7.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="w-full bg-linear-to-r from-[#ddaf3f] to-[#f0c856] text-black py-5 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-3 text-lg shadow-md"
                  >
                    <FaQrcode size={24} /> Scan ATM QR Code
                  </button>

                  <div className="mt-6 p-4 bg-linear-to-br from-[#2f6b44]/10 to-[#ddaf3f]/10 rounded-xl border-2 border-[#2f6b44]/20 mb-6">
                    <p className="text-gray-900 font-semibold text-center text-sm mb-3">
                      📱 Simple 3 Steps
                    </p>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#2f6b44] text-white flex items-center justify-center font-bold text-xs">1</span>
                        <span>Local ATM of our partner banks</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#2f6b44] text-white flex items-center justify-center font-bold text-xs">2</span>
                        <span>Tap the Paywave Cashout option</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#2f6b44] text-white flex items-center justify-center font-bold text-xs">3</span>
                        <span>Scan QR code, put the amount and collect cash</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCashOut(false)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                >
                  Back
                </button>
              </>
            )}

            {/* From Agent Tab */}
            {cashoutTab === 'agent' && (
              <>
                <div className="mb-6 mt-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">👤 Agent Network</h4>
                  <p className="text-gray-700 text-sm leading-snug">
                    Withdraw cash from our extensive network of trusted agents in your area. Personal, convenient, and fast service.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Agent Mobile Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={agentCode}
                    onChange={(e) => handleAgentCodeInput(e.target.value)}
                    placeholder="01X00000000"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2f6b44] focus:ring-2 focus:ring-[#2f6b44]/20 text-2xl font-bold text-[#2f6b44] placeholder-gray-400 transition"
                  />
                  <p className="text-xs text-gray-500 font-medium text-center mt-3">{agentCode.length} / 11 digits</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowAgentCashout(true);
                      setAgentCashoutStep('amount');
                      setAgentCashoutAmount('');
                    }}
                    disabled={agentCode.length < 10}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="w-full bg-linear-to-r from-[#ddaf3f] to-[#f0c856] text-black py-4 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-3 text-lg shadow-md"
                  >
                    <FaQrcode size={24} /> Scan QR Code
                  </button>
                </div>

                <button
                  onClick={() => setShowCashOut(false)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Agent Cashout Modal */}
      {showAgentCashout && (
        <div className="fixed inset-0 bg-linear-to-b from-gray-50 to-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-28">
            {/* Amount Input */}
            {agentCashoutStep === 'amount' && (
              <>
                <div className="mb-16"></div>
                <div className="bg-white rounded-2xl p-6 mb-10 shadow-sm border border-gray-100 text-center">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3">Withdrawal Amount</p>
                  <div className="relative">
                    <input
                      type="number"
                      value={agentCashoutAmount}
                      onChange={(e) => handleAgentCashoutAmountInput(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-6 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2f6b44] focus:ring-2 focus:ring-[#2f6b44]/20 text-5xl font-bold text-center text-[#2f6b44] placeholder-gray-300 transition"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">৳</span>
                  </div>
                </div>

                <div className="space-y-3 mt-12">
                  <button
                    onClick={() => setAgentCashoutStep('preview')}
                    disabled={!agentCashoutAmount || agentCashoutAmount === '0'}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-lg shadow-md"
                  >
                    Review & Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowAgentCashout(false);
                      setAgentCashoutAmount('');
                      setAgentCode('');
                    }}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Preview */}
            {agentCashoutStep === 'preview' && (
              <>
                <div className="mb-16"></div>
                <div className="mb-10">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Confirm Withdrawal</h4>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Amount</span>
                      <span className="font-bold text-gray-900 text-lg">৳ {agentCashoutAmount}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Charge (1.75%)</span>
                      <span className="font-bold text-red-600 text-lg">৳ {(parseFloat(agentCashoutAmount) * 0.0175).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-linear-to-r from-[#2f6b44]/5 to-[#ddaf3f]/5 -mx-6 px-6 py-4 rounded-xl">
                      <span className="text-sm text-gray-700 font-bold">Total Amount</span>
                      <span className="font-bold text-[#2f6b44] text-3xl">৳ {(parseFloat(agentCashoutAmount) + parseFloat(agentCashoutAmount) * 0.0175).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-10 text-sm font-semibold bg-yellow-50 border border-yellow-200 rounded-lg py-3 px-4">Double tap button below to confirm</p>

                <div className="space-y-3 mt-12">
                  <button
                    onClick={handleAgentCashoutButtonTap}
                    className="w-full bg-linear-to-r from-[#2f6b44] to-[#1a3d25] text-white py-5 rounded-xl font-bold hover:shadow-lg transition text-xl shadow-md active:scale-95"
                  >
                    ✓ Withdraw Now
                  </button>
                  <button
                    onClick={() => setAgentCashoutStep('amount')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showSendMoney && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Send Money</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-28">
            {/* Step 1: Phone Number Input */}
            {sendMoneyStep === 'input' && (
              <>
                <div className="mb-16">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Recipient Phone Number</label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => handlePhoneInput(e.target.value)}
                    placeholder="01X00000000"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-lg text-gray-900 placeholder-gray-400"
                  />
                  <p className="text-sm text-gray-500 mt-2">{recipientPhone.length}/11 digits</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSendMoneyStep('amount')}
                    disabled={recipientPhone.length < 10}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setShowUnderdevelopment(true)}
                    className="w-full bg-[#ddaf3f] text-black py-3 rounded-lg font-semibold hover:bg-[#f0c856] transition flex items-center justify-center gap-2 text-lg"
                  >
                    <FaQrcode size={24} /> Scan QR Code
                  </button>
                  <button
                    onClick={() => setShowSendMoney(false)}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Amount Input */}
            {sendMoneyStep === 'amount' && (
              <>
                <div className="mb-16 p-4 bg-[#2f6b44]/10 rounded-lg">
                  <p className="text-gray-700 font-semibold">To: {recipientPhone}</p>
                </div>
                <div className="mb-10">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Enter Amount (৳)</label>
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => handleAmountInput(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-4xl font-bold text-center text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSendMoneyStep('preview')}
                    disabled={!sendAmount || sendAmount === '0'}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setSendMoneyStep('input')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Preview */}
            {sendMoneyStep === 'preview' && (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Confirm Transfer</h4>
                  <div className="p-4 bg-[#2f6b44]/10 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-semibold">Recipient:</span>
                      <span className="font-bold text-gray-900 text-sm">{recipientPhone}</span>
                    </div>
                    <div className="h-px bg-gray-300"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-semibold">Amount:</span>
                      <span className="font-bold text-[#2f6b44] text-lg">৳ {sendAmount}</span>
                    </div>
                    <div className="h-px bg-gray-300"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-semibold">Charge:</span>
                      <span className="font-bold text-red-600 text-sm">৳ 5</span>
                    </div>
                    <div className="h-px bg-gray-300"></div>
                    <div className="flex justify-between items-center pt-2 bg-linear-to-r from-[#2f6b44]/5 to-[#ddaf3f]/5 -mx-4 px-4 py-3 rounded-xl">
                      <span className="text-xs text-gray-700 font-bold">Total</span>
                      <span className="font-bold text-[#2f6b44] text-xl">৳ {(parseFloat(sendAmount) + 5).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-4 text-xs font-semibold bg-yellow-50 border border-yellow-200 rounded-lg py-2 px-3">Double tap button below to confirm</p>

                <div className="space-y-2">
                  <button
                    onClick={handleSendButtonTap}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-bold hover:bg-[#1a3d25] transition text-lg"
                  >
                    ✓ Send
                  </button>
                  <button
                    onClick={() => setSendMoneyStep('amount')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Make Payment</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-28">
            {/* Step 1: Number Input */}
            {paymentStep === 'input' && (
              <>
                <div className="mb-16">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Merchant/Business Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={paymentNumber}
                    onChange={(e) => handlePaymentNumberInput(e.target.value)}
                    placeholder="01X00000000"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-lg text-[#2f6b44] placeholder-gray-400"
                  />
                  <p className="text-sm text-gray-500 mt-2">{paymentNumber.length}/11 digits</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentStep('amount')}
                    disabled={paymentNumber.length < 10}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setShowUnderdevelopment(true)}
                    className="w-full bg-[#ddaf3f] text-black py-3 rounded-lg font-semibold hover:bg-[#f0c856] transition flex items-center justify-center gap-2 text-lg"
                  >
                    <FaQrcode size={24} /> Scan QR Code
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Amount Input */}
            {paymentStep === 'amount' && (
              <>
                <div className="mb-16 p-4 bg-[#2f6b44]/10 rounded-lg">
                  <p className="text-gray-700 font-semibold">To: {paymentNumber}</p>
                </div>
                <div className="mb-10">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Enter Amount (৳)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => handlePaymentAmountInput(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-4xl font-bold text-center text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentStep('preview')}
                    disabled={!paymentAmount || paymentAmount === '0'}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setPaymentStep('input')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Preview */}
            {paymentStep === 'preview' && (
              <>
                <div className="mb-12">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Confirm Payment</h4>
                  <div className="p-6 bg-[#2f6b44]/10 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">To:</span>
                      <span className="font-bold text-gray-900 text-lg">{paymentNumber}</span>
                    </div>
                    <div className="h-px bg-gray-300"></div>
                    <div className="flex justify-between items-center pt-2 bg-linear-to-r from-[#2f6b44]/5 to-[#ddaf3f]/5 -mx-6 px-6 py-4 rounded-xl">
                      <span className="text-sm text-gray-700 font-bold">Amount</span>
                      <span className="font-bold text-[#2f6b44] text-3xl">৳ {paymentAmount}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mb-8 text-sm font-semibold bg-yellow-50 border border-yellow-200 rounded-lg py-3 px-4">Double tap button below to confirm</p>

                <div className="space-y-3">
                  <button
                    onClick={handlePaymentButtonTap}
                    className="w-full bg-[#2f6b44] text-white py-4 rounded-lg font-bold hover:bg-[#1a3d25] transition text-xl"
                  >
                    ✓ Pay
                  </button>
                  <button
                    onClick={() => setPaymentStep('amount')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Splitting Modal */}
      {showPaymentSplitting && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Payment Splitting</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-28">
            {/* Mode Selection */}
            {splitStep === 'input' && (
              <>
                <div className="mt-4 space-y-4">
                  {/* Join Split - Top */}
                  <button
                    onClick={() => {
                      setSplitMode('join');
                      setSplitStep('qr-scan');
                    }}
                    className="w-full p-6 bg-linear-to-br from-[#2f6b44] to-[#1a3d25] border-2 border-[#2f6b44] rounded-2xl hover:shadow-lg transition transform hover:scale-105 active:scale-95"
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white mb-2">📱 Join a Split</p>
                      <p className="text-sm text-white/80">Scan QR code to join</p>
                    </div>
                  </button>

                  {/* OR Divider */}
                  <div className="flex items-center gap-4 my-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 font-semibold text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>

                  {/* Create Split - Heading */}
                  <h4 className="text-lg font-bold text-gray-900 mt-4 mb-3">💰 Create a Split</h4>

                  {/* Create Split Content */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Total Amount to Split</label>
                      <input
                        type="number"
                        value={splitAmount}
                        onChange={(e) => handleSplitAmountInput(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-3xl font-bold text-center text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">Number of People</label>
                      <div className="flex items-center gap-4 justify-center">
                        <button
                          onClick={() => setParticipantCount(Math.max(2, participantCount - 1))}
                          className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-400 transition"
                        >
                          −
                        </button>
                        <span className="text-2xl font-bold text-[#2f6b44] w-12 text-center">{participantCount}</span>
                        <button
                          onClick={() => setParticipantCount(Math.min(15, participantCount + 1))}
                          className="w-10 h-10 bg-[#2f6b44] text-white rounded-full font-bold text-lg hover:bg-[#1a3d25] transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSplitNext}
                      disabled={!splitAmount || parseFloat(splitAmount) <= 0}
                      className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => {
                        setShowPaymentSplitting(false);
                        setSplitStep('input');
                        setSplitAmount('');
                        setParticipants([]);
                        setParticipantCount(2);
                        setSplitMode('create');
                      }}
                      className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Create Split - QR Display */}
            {splitMode === 'create' && splitStep === 'qr-display' && (
              <>
                <div className="mt-2 mb-6 text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Share this QR code</h4>
                  <div className="bg-gray-100 p-4 rounded-2xl border-4 border-[#2f6b44] inline-flex flex-col items-center gap-3">
                    <div className="w-40 h-40 bg-white border-2 border-[#2f6b44] rounded-lg flex items-center justify-center relative">
                      {/* QR Code Pattern Background */}
                      <div className="absolute inset-0 grid grid-cols-5 gap-px p-1 rounded-lg overflow-hidden">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`${i % 3 === 0 ? 'bg-[#2f6b44]' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                      {/* Center Icon with Amount */}
                      <div className="relative z-10 text-center bg-white rounded-lg p-2">
                        <p className="text-2xl mb-1">⇄</p>
                        <p className="text-xs font-bold text-[#2f6b44]">৳{splitAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2f6b44]/10 rounded-lg p-4 mb-6 border border-[#2f6b44]/20">
                  <p className="text-sm text-gray-700 font-semibold">
                    <span className="text-[#2f6b44] font-bold">Total Amount:</span> ৳ {splitAmount}
                  </p>
                  <p className="text-sm text-gray-700 font-semibold mt-2">
                    <span className="text-[#2f6b44] font-bold">People:</span> {participantCount}
                  </p>
                  <p className="text-sm text-gray-700 font-semibold mt-2">
                    <span className="text-[#2f6b44] font-bold">Per Person:</span> ৳ {(parseFloat(splitAmount) / participantCount).toFixed(2)}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSplitStep('split-confirm')}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3d25] transition text-lg"
                  >
                    Confirm the Split
                  </button>
                  <button
                    onClick={() => setSplitStep('input')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Join Split - QR Scan */}
            {splitMode === 'join' && splitStep === 'qr-scan' && (
              <>
                <div className="mb-8 text-center">
                  <h4 className="text-lg font-bold text-gray-900 mb-8">Scan QR Code</h4>
                  <div className="w-64 h-64 border-4 border-[#2f6b44] rounded-lg flex items-center justify-center bg-gray-100 mx-auto mb-6">
                    <div className="text-center">
                      <p className="text-6xl mb-2">📱</p>
                      <p className="text-sm font-semibold text-gray-600">Scanning...</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-700 font-semibold text-center">Point your camera at the QR code</p>
                </div>

                <button
                  onClick={() => {
                    // Simulate scanning
                    setParticipants([
                      { id: 1, name: 'You', amount: 500 },
                      { id: 2, name: 'Rohan', amount: 500 },
                    ]);
                    handleSplitJoinNext();
                  }}
                  className="w-full bg-[#ddaf3f] text-black py-3 rounded-lg font-semibold hover:bg-[#f0c856] transition text-lg mb-3"
                >
                  ✓ Scan Demo QR
                </button>

                <button
                  onClick={() => {
                    setSplitStep('input');
                    setSplitMode('create');
                  }}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                >
                  Back
                </button>
              </>
            )}

            {/* Split Confirmation - View & Edit */}
            {splitStep === 'split-confirm' && (
              <>
                <div className="mb-3">
                  <h4 className="text-base font-bold text-gray-900 mb-3">Split Details</h4>
                  <div className="space-y-2">
                    {participants.map((person) => (
                      <div key={person.id} className="bg-linear-to-br from-white to-gray-50 p-3 rounded-lg border-2 border-[#2f6b44]/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-900">{person.name}</span>
                          <span className="text-xs bg-[#2f6b44] text-white px-2 py-1 rounded-full font-bold">
                            {person.id === 1 && splitMode === 'create' ? 'Initiator' : 'Member'}
                          </span>
                        </div>
                        
                        {/* Manual Input */}
                        <input
                          type="number"
                          value={person.amount}
                          onChange={(e) => handleParticipantAmountChange(person.id, parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#2f6b44] text-sm font-bold text-[#2f6b44] mb-2"
                          placeholder="0"
                        />
                        
                        {/* +/- Buttons */}
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleParticipantAmountChange(person.id, Math.max(0, person.amount - 10))}
                            className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-400 transition text-sm"
                          >
                            −
                          </button>
                          <div className="flex-1 text-center">
                            <p className="text-xl font-bold text-[#2f6b44]">৳{person.amount.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => handleParticipantAmountChange(person.id, person.amount + 10)}
                            className="w-8 h-8 bg-[#2f6b44] text-white rounded-full font-bold hover:bg-[#1a3d25] transition text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-r from-[#2f6b44] to-[#1a3d25] rounded-lg p-3 mb-3 border-2 border-[#2f6b44]">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">Total</span>
                    <span className="text-lg font-bold text-[#ddaf3f]">৳ {participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</span>
                  </div>
                </div>

                {splitMode === 'create' && parseFloat((participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2))) !== parseFloat(splitAmount) && (
                  <p className="text-center text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-3 mb-3">Total must equal ৳{splitAmount}</p>
                )}
              </>
            )}

            {/* Split Preview - Confirm */}
            {splitStep === 'split-preview' && (
              <>
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Confirm Payment Split</h4>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 space-y-3">
                    {participants.map((person) => (
                      <div key={person.id} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <span className="text-sm text-gray-700 font-semibold">{person.name}</span>
                        <span className="font-bold text-gray-900 text-lg">৳ {person.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 bg-linear-to-r from-[#2f6b44]/5 to-[#ddaf3f]/5 -mx-5 px-5 py-3 rounded-lg">
                      <span className="text-sm text-gray-700 font-bold">Total Amount</span>
                      <span className="font-bold text-[#2f6b44] text-2xl">৳ {participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-600 mb-8 text-sm font-semibold bg-yellow-50 border border-yellow-200 rounded-lg py-3 px-4">Double tap button below to confirm</p>

                <div className="space-y-2">
                  <button
                    onClick={handleSplitButtonTap}
                    className="w-full bg-[#2f6b44] text-white py-4 rounded-lg font-bold hover:bg-[#1a3d25] transition text-lg active:scale-95"
                  >
                    ✓ Complete Split
                  </button>
                  <button
                    onClick={() => setSplitStep('split-confirm')}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* Split Confirm Button - Always visible */}
            {splitStep === 'split-confirm' && (
              <div className="space-y-2">
                <button
                  onClick={() => setSplitStep('split-preview')}
                  disabled={splitMode === 'create' && parseFloat((participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2))) !== parseFloat(splitAmount)}
                  className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-bold hover:bg-[#1a3d25] transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review & Confirm
                </button>
                <button
                  onClick={() => {
                    setSplitStep(splitMode === 'create' ? 'qr-display' : 'qr-scan');
                  }}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition text-lg"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center pt-16">
          <div className="w-80 h-80 border-4 border-[#ddaf3f] rounded-lg flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Camera Background */}
            <div className="absolute inset-0 bg-linear-to-b from-gray-800 via-gray-900 to-gray-950 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <p className="text-sm mb-4">Point camera at QR code</p>
                {/* Animated scanning line */}
                <div className="w-64 h-1 bg-linear-to-r from-transparent via-[#ddaf3f] to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Corner markers */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#ddaf3f]"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#ddaf3f]"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#ddaf3f]"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#ddaf3f]"></div>
          </div>

          {/* Demo QR Code */}
          {!scanned && (
            <button
              onClick={() => setScanned(true)}
              className="mt-8 px-6 py-2 bg-[#ddaf3f] text-black rounded-lg font-semibold hover:bg-[#f0c856] transition"
            >
              Scan Demo QR Code
            </button>
          )}

          {/* Success Message */}
          {scanned && (
            <div className="mt-8 text-center text-white">
              <p className="text-2xl font-bold text-[#ddaf3f] mb-2">✓</p>
              <p className="text-white">Payment Confirmed</p>
              <p className="text-sm text-gray-400 mt-2">+৳ 5000 from Farhan Khan</p>
            </div>
          )}

        {/* Fixed Footer Back Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-gray-700 p-4 max-w-md mx-auto">
          <button
            onClick={() => {
              setShowQRScanner(false);
              setScanned(false);
            }}
            className="w-full bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition text-lg"
          >
            ← Back
          </button>
        </div>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestment && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden pt-16">
          {/* Header */}
          <div className="bg-[#2f6b44] text-white p-4 flex items-center">
            <h3 className="text-xl font-bold">Investment</h3>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-28">
            {investmentStep === 'options' && (
              <>
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Choose Investment Option</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Sanchaypatra */}
                    <button
                      onClick={() => window.open('https://nationalsavings.gov.bd/', '_blank')}
                      className="bg-linear-to-br from-[#2f6b44] to-[#1a3d25] text-white py-6 px-4 rounded-xl font-bold hover:shadow-lg transition flex flex-col items-center justify-center gap-2 shadow-md"
                    >
                      <span className="text-2xl">📊</span>
                      <span className="text-sm text-center">সঞ্চয়পত্র</span>
                    </button>

                    {/* Mutual Fund */}
                    <button
                      onClick={() => setInvestmentStep('mutual-fund')}
                      className="bg-linear-to-br from-[#2f6b44] to-[#1a3d25] text-white py-6 px-4 rounded-xl font-bold hover:shadow-lg transition flex flex-col items-center justify-center gap-2 shadow-md"
                    >
                      <span className="text-2xl">💼</span>
                      <span className="text-sm text-center">Mutual Fund</span>
                    </button>

                    {/* Alternative Investment */}
                    <button
                      onClick={() => setInvestmentStep('alternative')}
                      className="bg-linear-to-br from-[#2f6b44] to-[#1a3d25] text-white py-6 px-4 rounded-xl font-bold hover:shadow-lg transition flex flex-col items-center justify-center gap-2 shadow-md"
                    >
                      <span className="text-2xl">🌱</span>
                      <span className="text-sm text-center">Alternative</span>
                    </button>

                    {/* Open BO Account */}
                    <button
                      onClick={() => setShowUnderdevelopment(true)}
                      className="bg-linear-to-br from-[#2f6b44] to-[#1a3d25] text-white py-6 px-4 rounded-xl font-bold hover:shadow-lg transition flex flex-col items-center justify-center gap-2 shadow-md"
                    >
                      <span className="text-2xl">🏦</span>
                      <span className="text-sm text-center">Open BO</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowInvestment(false);
                    setInvestmentStep('options');
                  }}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-lg"
                >
                  Back
                </button>
              </>
            )}

            {investmentStep === 'mutual-fund' && (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Mutual Fund</h4>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center mb-6">
                  <p className="text-red-600 font-semibold mb-2">Account Required</p>
                  <p className="text-gray-700 text-sm mb-4">No attached BO account found, you need a BO account first</p>
                  <button
                    onClick={() => {
                      setInvestmentStep('options');
                      setShowUnderdevelopment(true);
                    }}
                    className="w-full bg-[#2f6b44] text-white py-3 rounded-lg font-bold hover:bg-[#1a3d25] transition"
                  >
                    Create BO Account
                  </button>
                </div>
                <button
                  onClick={() => setInvestmentStep('options')}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-lg"
                >
                  Back
                </button>
              </>
            )}

            {investmentStep === 'alternative' && (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Alternative Investment Platforms</h4>
                  <div className="space-y-3">
                    {/* WeGro */}
                    <button
                      onClick={() => window.open('https://wegro.global', '_blank')}
                      className="w-full bg-white border-2 border-[#2f6b44] rounded-xl p-4 hover:bg-[#2f6b44]/5 transition text-left"
                    >
                      <h5 className="font-bold text-gray-900 mb-1">WeGro</h5>
                      <p className="text-xs text-gray-600 mb-3">wegro.global</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-[#2f6b44] text-white px-3 py-1 rounded-full">Alternative Assets</span>
                        <span className="text-[#2f6b44]">→</span>
                      </div>
                    </button>

                    {/* iFarmer */}
                    <button
                      onClick={() => window.open('https://ifarmer.asia', '_blank')}
                      className="w-full bg-white border-2 border-[#2f6b44] rounded-xl p-4 hover:bg-[#2f6b44]/5 transition text-left"
                    >
                      <h5 className="font-bold text-gray-900 mb-1">iFarmer</h5>
                      <p className="text-xs text-gray-600 mb-3">ifarmer.asia</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-[#2f6b44] text-white px-3 py-1 rounded-full">Agri Investment</span>
                        <span className="text-[#2f6b44]">→</span>
                      </div>
                    </button>

                    {/* Biniyog.io */}
                    <button
                      onClick={() => window.open('https://biniyog.io', '_blank')}
                      className="w-full bg-white border-2 border-[#2f6b44] rounded-xl p-4 hover:bg-[#2f6b44]/5 transition text-left"
                    >
                      <h5 className="font-bold text-gray-900 mb-1">Biniyog.io</h5>
                      <p className="text-xs text-gray-600 mb-3">biniyog.io</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-[#2f6b44] text-white px-3 py-1 rounded-full">Investment Platform</span>
                        <span className="text-[#2f6b44]">→</span>
                      </div>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setInvestmentStep('options')}
                  className="w-full bg-white border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-lg mt-6"
                >
                  Back
                </button>
              </>
            )}
          </div>

          {/* Fixed Footer Back Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
            <button
              onClick={() => {
                setShowInvestment(false);
                setInvestmentStep('options');
              }}
              className="w-full bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition text-lg"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Show balance only on non-home pages and in modals */}
            {(activeTab !== 'home' || showSendMoney || showMobileRecharge || showCashOut || showPayment || showPaymentSplitting || showInvestment || showNotifications || showSettings) && (
              <div className="bg-[#ddaf3f]/15 border border-[#ddaf3f] rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                <div>
                  <p className="text-xs text-gray-600 leading-none">Balance</p>
                  <p className="text-xs font-bold text-[#ddaf3f]">
                    {showBalance ? `৳${accountData.balance.toLocaleString()}` : '••••••'}
                  </p>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1.5 hover:bg-[#ddaf3f]/20 rounded transition text-[#ddaf3f] shrink-0"
                >
                  {showBalance ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                </button>
              </div>
            )}

            {/* Logo only on home */}
            {activeTab === 'home' && (
              //next/image JSX type resolution in current TS setup
              <NextImage
                src="https://i.imgur.com/VfcHR6L.jpeg"
                alt="Paywave Logo"
                width={120}
                height={40}
                priority
                className="h-10 w-auto object-contain"
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle only on home and when no modal is open */}
            {activeTab === 'home' && !modalOpen && (
              <button
                type="button"
                onClick={() => setLanguage(language === 'EN' ? 'বাং' : 'EN')}
                className="relative flex h-9 w-24 items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden transition"
                aria-label="Toggle language"
              >
                <span
                  className={`absolute top-1 bottom-1 w-[calc(50%-6px)] rounded-full transition-all ${language === 'EN' ? 'left-1 bg-[#2f6b44]' : 'left-[calc(50%+2px)] bg-[#ddaf3f]'}`}
                />
                <span className={`z-10 flex-1 text-center text-xs font-semibold transition-colors ${language === 'EN' ? 'text-white' : 'text-gray-600'}`}>
                  EN
                </span>
                <span className={`z-10 flex-1 text-center text-xs font-semibold transition-colors ${language === 'EN' ? 'text-gray-600' : 'text-white'}`}>
                  বাং
                </span>
              </button>
            )}

            <div className="flex gap-2">
              <button onClick={() => setShowNotifications(true)} className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer text-gray-700">
                <FiBell size={24} />
              </button>
              <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer text-gray-700">
                <FiSettings size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HOME VIEW */}
      {activeTab === 'home' && !showQRScanner && !showSendMoney && !showMobileRecharge && !showCashOut && !showPayment && !showPaymentSplitting && !showInvestment && (
      <>

      {/* Balance Card */}
      <div className="max-w-md mx-auto px-4 pt-20 pb-1 relative z-40">
        <div className="bg-linear-to-br from-[#2f6b44] via-[#2f6b44] to-[#2f6b44] rounded-3xl shadow-xl p-4 text-white border-[3px] border-[#ddaf3f]">
          {/* User Info */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-90">Account Holder</p>
              <p className="text-xl font-bold">{accountData.name}</p>
              <p className="text-xs opacity-75">{accountData.phone}</p>
            </div>
            <div className="bg-[#ddaf3f]/20 text-[#ddaf3f] px-3 py-1 rounded-full text-sm font-semibold">
              {accountData.level}
            </div>
          </div>

          {/* Balance Section */}
          <div>
            <p className="text-sm mb-2 text-[#ddaf3f]">Available Balance</p>
            <div className="flex justify-between items-baseline gap-4">
              <p className="text-4xl font-bold">
                {showBalance ? `৳ ${accountData.balance.toLocaleString()}` : '••••••'}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg transition text-[#ddaf3f] hover:bg-[#ddaf3f]/20"
              >
                {showBalance ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const handleClick = () => {
              if (service.label === 'Send Money') {
                setShowSendMoney(true);
                setSendMoneyStep('input');
                setRecipientPhone('');
                setSendAmount('');
              } else if (service.label === 'Mobile Recharge') {
                setShowMobileRecharge(true);
                setRechargeStep('input');
                setRechargePhone('');
                setSelectedOperator('');
                setSelectedType('');
                setRechargeAmount('');
              } else if (service.label === 'Cash Out') {
                setShowCashOut(true);
                setCashoutTab('atm');
              } else if (service.label === 'Payment') {
                setShowPayment(true);
                setPaymentStep('input');
                setPaymentNumber('');
                setPaymentAmount('');
              } else if (service.label === 'Payment Splitting') {
                setShowPaymentSplitting(true);
                setSplitStep('input');
                setSplitAmount('');
                setParticipants([]);
                setParticipantCount(2);
                setSplitMode('create');
              } else if (service.label === 'Investment') {
                setShowInvestment(true);
                setInvestmentStep('options');
              } else {
                alert(`Service: ${service.label}`);
              }
            };
            return (
              <button
                key={idx}
                onClick={handleClick}
                className="bg-linear-to-br from-[#2f6b44] to-[#1a3d25] rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center gap-3 text-white cursor-pointer border border-[#ddaf3f]/30 hover:border-[#ddaf3f]/60"
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
          <button
            onClick={() => {
              setShowQRScanner(false);
              setShowSendMoney(false);
              setShowMobileRecharge(false);
              setShowCashOut(false);
              setShowAgentCashout(false);
              setShowPayment(false);
              setShowPaymentSplitting(false);
              setShowInvestment(false);
              setShowNotifications(false);
              setShowSettings(false);
              setScanned(false);
              setShowBalance(false);
              setActiveTab('transactions');
            }}
            className="text-[#ddaf3f] text-sm font-semibold hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
        <div className="space-y-2">
          {transactions.slice(0, 5).map((txn: any, idx: number) => {
            const Icon = txn.icon;
            const handleClick = () => alert(`Transaction: ${txn.recipient} - ${txn.type === 'send' ? '-' : '+'} ৳ ${txn.amount}`);
            return (
              <button
                key={idx}
                onClick={handleClick}
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition w-full cursor-pointer text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-full ${txn.type === 'send' ? 'bg-[#ddaf3f]/20' : 'bg-[#2f6b44]/20'}`}>
                    <Icon size={20} className={txn.type === 'send' ? 'text-[#ddaf3f]' : 'text-[#2f6b44]'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{txn.recipient}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${txn.type === 'send' ? 'text-[#ddaf3f]' : 'text-[#2f6b44]'}`}>
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
        <div className="bg-linear-to-r from-[#ddaf3f] to-[#f0c856] rounded-2xl p-6 text-gray-900 shadow-lg">
          <h3 className="text-lg font-bold mb-2">Send Money & Get Cashback!</h3>
          <p className="text-sm opacity-90 mb-4">Get up to 50 Taka cashback on your next 5 transfers</p>
          <button onClick={() => alert('Cashback offer details')} className="bg-[#2f6b44] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a3d25] transition cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
      </>
      )}

      {/* TRANSACTIONS VIEW */}
      {activeTab === 'transactions' && !showQRScanner && !showSendMoney && !showMobileRecharge && !showCashOut && !showPayment && !showPaymentSplitting && (
      <>
      <div className="max-w-md mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h2>
        <div className="space-y-2">
          {transactions.map((txn: any, idx: number) => {
            const Icon = txn.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition w-full"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-full ${txn.type === 'send' ? 'bg-[#ddaf3f]/20' : 'bg-[#2f6b44]/20'}`}>
                    <Icon size={20} className={txn.type === 'send' ? 'text-[#ddaf3f]' : 'text-[#2f6b44]'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{txn.recipient}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${txn.type === 'send' ? 'text-[#ddaf3f]' : 'text-[#2f6b44]'}`}>
                    {txn.type === 'send' ? '-' : '+'} ৳ {txn.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{txn.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}

      {/* Bottom Navigation */}
      <div className="max-w-md mx-auto fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t border-gray-200 flex justify-around items-center z-50">
        {[
          { icon: FiHome, label: 'Home', id: 'home' },
          { icon: FaQrcode, label: 'QR Code', id: 'qrcode' },
          { icon: MdReceiptLong, label: 'Transactions', id: 'transactions' },
        ].map((nav) => {
          const Icon = nav.icon;
          return (
            <button
              key={nav.id}
              onClick={() => {
                if (nav.id === 'qrcode') {
                  setShowQRScanner(true);
                  setShowInvestment(false);
                  setShowBalance(false);
                  setShowSettings(false);
                  setShowNotifications(false);
                } else {
                  setShowQRScanner(false);
                  setShowSendMoney(false);
                  setShowMobileRecharge(false);
                  setShowCashOut(false);
                  setShowAgentCashout(false);
                  setShowPayment(false);
                  setShowPaymentSplitting(false);
                  setShowInvestment(false);
                  setScanned(false);
                  setShowBalance(false);
                  setShowSettings(false);
                  setShowNotifications(false);
                  setActiveTab(nav.id);
                }
              }}
              className={`flex-1 py-1 flex flex-col items-center gap-0.5 transition ${
                activeTab === nav.id ? 'text-[#2f6b44]' : 'text-gray-600'
              } ${nav.id === 'qrcode' ? 'flex justify-center' : ''}`}
            >
              {nav.id === 'qrcode' ? (
                <div className={`bg-white rounded-full p-3 shadow-md border-2 border-[#2f6b44] ${activeTab === nav.id ? 'bg-[#2f6b44]' : ''}`}>
                  <Icon size={24} className={activeTab === nav.id ? 'text-white' : 'text-[#2f6b44]'} />
                </div>
              ) : (
                <Icon size={24} />
              )}
              <p className="text-xs font-semibold">{nav.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
