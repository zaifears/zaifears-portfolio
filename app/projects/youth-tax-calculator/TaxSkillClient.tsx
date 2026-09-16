"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Terminal,
  Sparkles,
  Bot,
  Calculator,
  ShieldCheck
} from "lucide-react";

const RAW_BASE = "https://raw.githubusercontent.com/zaifears/youth-tax-calculator/main";

export default function TaxSkillClient() {
  const [activeTab, setActiveTab] = useState<"skill" | "wizard" | "cli">("skill");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live Balance Sheet Calculator State
  const [salary, setSalary] = useState<number>(35000);
  const [stipend, setStipend] = useState<number>(18000);
  const [bankInterest, setBankInterest] = useState<number>(228);
  const [bankTds, setBankTds] = useState<number>(31);
  const [livingExpenses, setLivingExpenses] = useState<number>(170000);
  const [closingSavings, setClosingSavings] = useState<number>(63864);
  const [openingWealth, setOpeningWealth] = useState<number>(56759);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Tax Math calculations
  const salaryExemption = Math.min(salary / 3, 450000);
  const taxableSalary = Math.max(0, salary - salaryExemption);
  const netTaxableIncome = taxableSalary + bankInterest;
  const taxPayable = netTaxableIncome <= 350000 ? 0 : Math.round((netTaxableIncome - 350000) * 0.05);
  const refundableTds = taxPayable === 0 ? bankTds : Math.max(0, bankTds - taxPayable);

  // Balance Sheet Math (Difference = 0)
  const changeInWealth = closingSavings - openingWealth;
  const totalOutflow = changeInWealth + livingExpenses;
  const declaredIncome = netTaxableIncome + stipend;
  const parentalSupportNeeded = Math.max(0, totalOutflow - declaredIncome);
  const totalSources = declaredIncome + parentalSupportNeeded;
  const finalDifference = totalOutflow - totalSources;

  const installCommands = {
    windows: ".\\install.ps1",
    unix: "chmod +x install.sh && ./install.sh",
    claude: `curl -s ${RAW_BASE}/llms-full.txt > tax_skill.md`,
    pythonWizard: "python calculator.py",
    cliCommand: "python calculator.py --salary 35000 --stipend 18000 --interest 228 --bank-tds 31 --bank-balance 34908 --expenses 170000 --opening-wealth 56759",
  };

  const aiPrompt =
    "I am filing my Bangladesh individual income tax return on etaxnbr.gov.bd under the Income Tax Act 2023. Please load and use the youth-tax-calculator skill (GitHub: https://github.com/zaifears/youth-tax-calculator, or read https://raw.githubusercontent.com/zaifears/youth-tax-calculator/main/llms-full.txt) to calculate my tax liability, maximize legal exemptions (Sixth Schedule Part 1 Para 8 stipends, Section 32 salary exemption), claim bank TDS refunds, and reconcile my IT-10B balance sheet to an exact difference of 0.00.";

  return (
    <div className="space-y-12">
      {/* ── INTERACTIVE INSTALLATION & EXECUTION TABS ── */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5 sm:p-7 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Deployment & Tooling
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              How to Install & Run
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setActiveTab("skill")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "skill"
                  ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>1. AI Skill (Primary)</span>
            </button>
            <button
              onClick={() => setActiveTab("wizard")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "wizard"
                  ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>2. Terminal Wizard</span>
            </button>
            <button
              onClick={() => setActiveTab("cli")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "cli"
                  ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>3. CLI Flags</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AI Skill */}
        {activeTab === "skill" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              This project is an <strong>AI Skill first</strong>. Instead of asking generic LLMs that hallucinate portal screens, this skill loads the complete statutory rules of the Income Tax Act 2023, the official NBR e-Return portal architecture, and delegates all multi-line arithmetic to Python to keep your tax expense at minimum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Windows PowerShell */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Windows (PowerShell) One-Click
                  </span>
                  <button
                    onClick={() => copyToClipboard(installCommands.windows, "win-install")}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {copiedId === "win-install" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "win-install" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  {installCommands.windows}
                </code>
              </div>

              {/* macOS / Linux Bash */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    macOS / Linux (Bash) One-Click
                  </span>
                  <button
                    onClick={() => copyToClipboard(installCommands.unix, "unix-install")}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {copiedId === "unix-install" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "unix-install" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  {installCommands.unix}
                </code>
              </div>
            </div>

            {/* Ingestion for Claude Code / Cursor / Terminal Agents */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Direct Ingestion for AI Agents (Claude Code / Cursor / CLI):
                </span>
                <button
                  onClick={() => copyToClipboard(installCommands.claude, "claude-curl")}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === "claude-curl" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "claude-curl" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto">
                {installCommands.claude}
              </code>
            </div>

            {/* Prompt for Web AI (ChatGPT, Claude, Gemini, Perplexity) */}
            <div className="rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    Ask Your AI to Calculate (ChatGPT, Claude, Gemini)
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(aiPrompt, "web-ai-prompt")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all shrink-0"
                >
                  {copiedId === "web-ai-prompt" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "web-ai-prompt" ? "Copied Prompt!" : "Copy Prompt"}</span>
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Paste this into your AI chat window so it uses the official Income Tax Act 2023 rules and avoids common filing mistakes:
              </p>
              <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {aiPrompt}
              </code>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                What to ask your AI after installation:
              </div>
              <ul className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1 list-disc list-inside">
                <li>I am a university student in Bangladesh with an internship, walk me through my return on etaxnbr.gov.bd</li>
                <li>Calculate my parent support figure under Section 56(g) so my IT-10B difference is exactly 0.00</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Terminal Wizard */}
        {activeTab === "wizard" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you just want the exact numbers without using an AI assistant, run the standalone Python wizard. It asks you a series of friendly questions and outputs the exact figures to copy-paste into each screen.
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Interactive Terminal Command
                </span>
                <button
                  onClick={() => copyToClipboard(installCommands.pythonWizard, "py-wiz")}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === "py-wiz" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "py-wiz" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto">
                {installCommands.pythonWizard}
              </code>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Zero external dependencies. Works on pure Python 3.8+ standard library.</span>
            </div>
          </div>
        )}

        {/* Tab 3: CLI Flags */}
        {activeTab === "cli" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              For developers, batch jobs, and scripting: pass all variables in one line. Add <code>--output-json</code> for structured machine consumption.
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  One-Line Execution
                </span>
                <button
                  onClick={() => copyToClipboard(installCommands.cliCommand, "cli-cmd")}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {copiedId === "cli-cmd" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === "cli-cmd" ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <code className="block text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-2.5 rounded border border-gray-200 dark:border-gray-800 overflow-x-auto whitespace-pre-wrap">
                {installCommands.cliCommand}
              </code>
            </div>
          </div>
        )}
      </section>

      {/* ── LIVE INTERACTIVE BALANCE SHEET RECONCILIATION SIMULATOR ── */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 sm:p-7 shadow-sm">
        <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Live Statutory Simulation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            The Zero-Difference Balance Sheet Engine
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Adjust the sliders below to see how Form IT-10B keeps tax expense at minimum and automatically solves for parental support under Section 56(g).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Annual Internship Salary: <strong>BDT {salary.toLocaleString()}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400">1/3rd Auto-Exempt (Sec 32)</span>
              </div>
              <input
                type="range"
                min={0}
                max={300000}
                step={5000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>University Stipend / Scholarship: <strong>BDT {stipend.toLocaleString()}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400">100% Tax-Free (6th Sch)</span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={5000}
                value={stipend}
                onChange={(e) => setStipend(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Annual Living Expenses (IT-10BB): <strong>BDT {livingExpenses.toLocaleString()}</strong></span>
                <span>Food, rent, tuition</span>
              </div>
              <input
                type="range"
                min={50000}
                max={400000}
                step={10000}
                value={livingExpenses}
                onChange={(e) => setLivingExpenses(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Bank TDS (Credit)
                </label>
                <input
                  type="number"
                  value={bankTds}
                  onChange={(e) => setBankTds(Number(e.target.value))}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Closing Bank/Cash
                </label>
                <input
                  type="number"
                  value={closingSavings}
                  onChange={(e) => setClosingSavings(Number(e.target.value))}
                  className="w-full text-xs font-mono p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Computed Output Cards */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/80 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
                <span className="text-gray-600 dark:text-gray-400">Net Taxable Income</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                  BDT {Math.round(netTaxableIncome).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
                <span className="text-gray-600 dark:text-gray-400">Tax Payable</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  BDT {taxPayable.toLocaleString()} (Kept at Minimum)
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
                <span className="text-gray-600 dark:text-gray-400">Bank TDS Status</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  BDT {refundableTds.toLocaleString()} (100% Refundable)
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
                <span className="text-gray-600 dark:text-gray-400">Total Fund Outflow</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                  BDT {totalOutflow.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800 text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Enter in Other Receipts (Sec 56g)
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  BDT {parentalSupportNeeded.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Portal difference banner */}
            <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center">
              <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                NBR Portal Validation Check
              </div>
              <div className="text-xl font-extrabold font-mono text-emerald-900 dark:text-emerald-200 mt-0.5">
                Difference = {finalDifference.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
                Form IT-10B passes submission checks without triggering audit alerts.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
