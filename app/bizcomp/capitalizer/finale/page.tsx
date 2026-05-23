"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Chart from "chart.js/auto";

const bestRev = [34.97, 61.2, 83.85, 100.62, 110.68];
const worstRev = [7.19, 12.58, 17.23, 20.68, 22.75];
const years = ["Yr 6", "Yr 7", "Yr 8", "Yr 9", "Yr 10"];

const revenueMix = [
	{ label: "Cashout fee", value: 38.04, className: "dot-cashout" },
	{ label: "API/Scoring fees", value: 32.89, className: "dot-api" },
	{ label: "Revenue share", value: 16.39, className: "dot-share" },
	{ label: "Loan processing", value: 11.81, className: "dot-loan" },
	{ label: "In-house lending", value: 0.88, className: "dot-lending" },
];

const revenueMixColors = [
	"#0b3b76",
	"#1d5da5",
	"#1b6a5a",
	"#c16a1b",
	"#6c7b93",
];

const exitValuationRange = { best: 5525.45, worst: 522.38 };

const exitRows = [
	{
		priority: "1st",
		best: "Premium cross-border strategic secondary sale (growth equity)",
		bestDetails: [
			"Sell 11.2% to growth equity/strategic investor",
			"Preserve founder control and long-term upside",
		],
		worst: "Structured consolidation / domestic asset purchase",
		worstDetails: [
			"Phase 1: Domestic asset purchase with valuation reset",
			"Phase 2: Regulatory + tax clearances and integration",
		],
		moicBest: 8.6,
		moicWorst: 0.81,
		status: "Preferred",
	},
	{
		priority: "2nd",
		best: "Structured share buyback via SPV (scheme of arrangement)",
		bestDetails: [
			"Scheme of arrangement with staged repurchase",
			"Maintain regulatory standing and avoid forced IPO",
		],
		worst: "Local consortia management buyout (MBO)",
		worstDetails: [
			"Phase 1: Bank-led financing + ownership transition",
			"Phase 2: Governance stabilization + runway extension",
		],
		moicBest: 5.13,
		moicWorst: 0.81,
		status: "Fallback",
	},
	{
		priority: "Last",
		best: "Fair market value forced drag-along sale",
		bestDetails: ["Only if all preferred options fail"],
		worst: "Sum-of-the-parts IP asset liquidation",
		worstDetails: ["License handback and IP disposal"],
		moicBest: null,
		moicWorst: null,
		status: "Last resort",
	},
];

const kpis = [
	{ label: "Active merchants", value: "400K", sub: "Tier 2 and 3 cities" },
	{ label: "Monthly transaction", value: "BDT 180 Cr", sub: "As of year 5" },
	{ label: "End borrowers", value: "2.1M+", sub: "Reached via partners" },
	{ label: "Banking/NBFI partners", value: "3", sub: "Live partners" },
	{ label: "IPO floor (2.5x)", value: "BDT 1,607 Cr", sub: "Clause threshold" },
	{ label: "MAGF investment", value: "BDT 180 Cr", sub: "28% stake" },
];

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

function formatCrore(value: number) {
	return `BDT ${value.toFixed(1)} Cr`;
}

export default function FinaleDashboardPage() {
	const [scenarioPct, setScenarioPct] = useState(50);

	const revenueChartRef = useRef<HTMLCanvasElement | null>(null);
	const donutChartRef = useRef<HTMLCanvasElement | null>(null);
	const moicChartRef = useRef<HTMLCanvasElement | null>(null);
	const revenueChart = useRef<Chart | null>(null);
	const donutChart = useRef<Chart | null>(null);
	const moicChart = useRef<Chart | null>(null);

	const scenarioData = useMemo(() => {
		const t = scenarioPct / 100;
		const series = years.map((_, i) =>
			Number(lerp(worstRev[i], bestRev[i], t).toFixed(2))
		);
		const rev10 = series[series.length - 1];
		const ebitdaMargin = lerp(0.12, 0.28, t);
		const ebitda = rev10 * ebitdaMargin;
		const valuation = lerp(exitValuationRange.worst, exitValuationRange.best, t);
		const magfProceeds = valuation * 0.28;
		const moic = magfProceeds / 180;
		return { series, rev10, ebitda, valuation, moic };
	}, [scenarioPct]);

	useEffect(() => {
		if (!revenueChartRef.current || !donutChartRef.current || !moicChartRef.current) {
			return;
		}

		// Initialize charts once on mount.
		revenueChart.current = new Chart(revenueChartRef.current, {
			type: "line",
			data: {
				labels: years,
				datasets: [
					{
						label: "Best case",
						data: bestRev,
						borderColor: "#1d5da5",
						backgroundColor: "rgba(29, 93, 165, 0.12)",
						borderWidth: 2,
						pointRadius: 3,
						tension: 0.35,
					},
					{
						label: "Worst case",
						data: worstRev,
						borderColor: "#c16a1b",
						backgroundColor: "rgba(193, 106, 27, 0.1)",
						borderWidth: 2,
						pointRadius: 3,
						borderDash: [4, 4],
						tension: 0.35,
					},
					{
						label: "Scenario",
						data: scenarioData.series,
						borderColor: "#0b3b76",
						borderWidth: 2,
						pointRadius: 3,
						borderDash: [2, 3],
						tension: 0.35,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					x: { grid: { display: false }, ticks: { color: "#5f6f86" } },
					y: {
						grid: { color: "rgba(0, 40, 90, 0.08)" },
						ticks: {
							color: "#5f6f86",
							callback: (value) => `${value} Cr`,
						},
					},
				},
			},
		});

		donutChart.current = new Chart(donutChartRef.current, {
			type: "doughnut",
			data: {
				labels: revenueMix.map((item) => item.label),
				datasets: [
					{
						data: revenueMix.map((item) => item.value),
						backgroundColor: revenueMixColors,
						borderWidth: 0,
						hoverOffset: 4,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: "62%",
				plugins: { legend: { display: false } },
			},
		});

		moicChart.current = new Chart(moicChartRef.current, {
			type: "bar",
			data: {
				labels: ["Best", "Base", "Worst"],
				datasets: [
					{
						label: "Scenario MOIC",
						data: [8.6, 5.13, 0.81],
						backgroundColor: "#1d5da5",
						borderRadius: 4,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: { legend: { display: false } },
				scales: {
					x: { grid: { display: false }, ticks: { color: "#5f6f86", font: { size: 10 } } },
					y: {
						min: 0,
						max: 9.5,
						grid: { color: "rgba(0, 40, 90, 0.08)" },
						ticks: { color: "#5f6f86", callback: (value) => `${value}x` },
					},
				},
			},
		});

		return () => {
			revenueChart.current?.destroy();
			donutChart.current?.destroy();
			moicChart.current?.destroy();
		};
	}, []);

	useEffect(() => {
		if (!revenueChart.current) {
			return;
		}
		revenueChart.current.data.datasets[2].data = scenarioData.series;
		revenueChart.current.update("none");
	}, [scenarioData]);

	return (
		<main className="page">
			<nav className="nav">
				<div className="nav-left">
					<Image
						src="/bizcomp/cap/aurin-logo.png"
						alt="Aurin Technologies"
						width={256}
						height={256}
						priority
					/>
				</div>
				<div className="nav-center">
					<p className="nav-brand">Investor dashboard for Capitalizer 26</p>
				</div>
				<div className="nav-right">
					<span className="nav-by">by</span>
					<Image
						src="/bizcomp/the-godfathers.png"
						alt="The Godfathers"
						width={150}
						height={60}
						priority
					/>
				</div>
			</nav>

			<section className="kpi-grid">
				{kpis.map((kpi) => (
					<div key={kpi.label} className="kpi-card">
						<p className="kpi-label">{kpi.label}</p>
						<p className="kpi-value">
							{kpi.value}
						</p>
						<p className="kpi-sub">{kpi.sub}</p>
					</div>
				))}
			</section>

			<section className="card matrix-card">
				<div className="section-title">Scenario slider - revenue and valuation</div>
				<div className="slider-row">
					<span>Worst</span>
					<label className="sr-only" htmlFor="scenario-slider">
						Scenario slider
					</label>
					<input
						id="scenario-slider"
						type="range"
						min={0}
						max={100}
						value={scenarioPct}
						onChange={(event) => setScenarioPct(Number(event.target.value))}
					/>
					<span>Best</span>
					<div className="slider-pill">{scenarioPct}%</div>
				</div>

				<div className="scenario-grid">
					<div>
						<div className="scenario-label">Projected revenue (Y10)</div>
						<div className="scenario-value">{formatCrore(scenarioData.rev10)}</div>
					</div>
					<div>
						<div className="scenario-label">EBITDA</div>
						<div className="scenario-value">{formatCrore(scenarioData.ebitda)}</div>
					</div>
					<div>
						<div className="scenario-label">Valuation estimate</div>
						<div className="scenario-value">{formatCrore(scenarioData.valuation)}</div>
					</div>
					<div>
						<div className="scenario-label">MAGF MOIC (full stake)</div>
						<div className="scenario-value">{scenarioData.moic.toFixed(2)}x</div>
					</div>
				</div>

				<div className="chart-wrap">
					<canvas
						ref={revenueChartRef}
						role="img"
						aria-label="Line chart of revenue projections for best case, worst case, and current scenario across years 6 to 10."
					/>
				</div>
			</section>

			<section className="grid-two">
				<div className="card">
					<div className="section-title">Revenue mix (base case)</div>
					<div className="legend">
						{revenueMix.map((item) => (
							<span key={item.label}>
								<span className={`legend-dot ${item.className}`} />
								{item.label} {item.value.toFixed(1)}%
							</span>
						))}
					</div>
					<div className="chart-wrap chart-sm">
						<canvas
							ref={donutChartRef}
							role="img"
							aria-label="Donut chart of Aurin revenue streams."
						/>
					</div>
				</div>

				<div className="card">
					<div className="section-title">Scenario MOIC comparison</div>
					<div className="legend">
						<span>
							<span className="legend-dot dot-api" />
							Scenario MOIC
						</span>
					</div>
					<div className="chart-wrap chart-sm">
						<canvas
							ref={moicChartRef}
							role="img"
							aria-label="Bar chart comparing MOIC across exit paths for best and worst case scenarios."
						/>
					</div>
				</div>
			</section>

			<section className="card">
				<div className="section-title">Exit priority matrix</div>
				<div className="table-wrap">
					<table className="matrix-table">
						<thead>
							<tr>
								<th>Priority</th>
								<th className="matrix-col">Best case path</th>
								<th className="matrix-col">Worst case path</th>
								<th>MOIC (BC)</th>
								<th>MOIC (WC)</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{exitRows.map((row) => (
								<tr key={row.priority}>
									<td>{row.priority}</td>
									<td className="matrix-cell">
										<div className="matrix-head">{row.best}</div>
										<ul className="matrix-list">
											{row.bestDetails.map((detail) => (
												<li key={detail}>{detail}</li>
											))}
										</ul>
									</td>
									<td className="matrix-cell">
										<div className="matrix-head">{row.worst}</div>
										<ul className="matrix-list">
											{row.worstDetails.map((detail) => (
												<li key={detail}>{detail}</li>
											))}
										</ul>
									</td>
									<td>{row.moicBest ? `${row.moicBest.toFixed(2)}x` : "-"}</td>
									<td>{row.moicWorst ? `${row.moicWorst.toFixed(2)}x` : "-"}</td>
									<td>
										<span className={`pill pill-${row.status.toLowerCase().replace(" ", "-")}`}>
											{row.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<style jsx>{`
				.page {
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.nav {
					display: grid;
					grid-template-columns: 1fr auto 1fr;
					align-items: center;
					gap: 16px;
					padding: 8px 0 18px;
					border-bottom: 1px solid var(--brand-border);
				}

				.nav-left {
					display: flex;
					align-items: center;
					justify-self: start;
				}

				.nav-center {
					display: flex;
					justify-self: center;
				}

				.nav-brand {
					font-family: var(--font-display), sans-serif;
					font-size: 18px;
					font-weight: 600;
					margin: 0;
					color: var(--brand-primary);
				}

				.nav-right {
					display: flex;
					align-items: center;
					justify-self: end;
					gap: 8px;
					background: var(--brand-secondary);
					padding: 6px 10px;
					border-radius: 12px;
					border: 1px solid var(--brand-border);
				}

				.nav-by {
					font-size: 11px;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					color: var(--brand-muted);
					font-weight: 600;
				}


				.kpi-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
					gap: 12px;
				}

				.kpi-card {
					background: var(--brand-card);
					border: 1px solid var(--brand-border);
					border-radius: 16px;
					padding: 14px 16px;
					box-shadow: 0 10px 24px rgba(0, 40, 90, 0.08);
				}

				.kpi-label {
					margin: 0 0 6px;
					font-size: 12px;
					color: var(--brand-muted);
				}

				.kpi-value {
					margin: 0;
					font-size: 22px;
					font-weight: 600;
					color: var(--brand-primary);
				}

				.kpi-sub {
					margin: 6px 0 0;
					font-size: 12px;
					color: var(--brand-muted);
				}

				.card {
					background: var(--brand-card);
					border: 1px solid var(--brand-border);
					border-radius: 20px;
					padding: 18px 20px;
					box-shadow: 0 16px 36px rgba(0, 40, 90, 0.08);
				}

				.section-title {
					text-transform: uppercase;
					font-size: 11px;
					letter-spacing: 0.08em;
					color: var(--brand-muted);
					margin-bottom: 12px;
					font-weight: 600;
				}

				.slider-row {
					display: flex;
					align-items: center;
					gap: 12px;
					font-size: 12px;
					color: var(--brand-muted);
				}

				input[type="range"] {
					flex: 1;
					accent-color: var(--brand-primary);
				}

				.slider-pill {
					background: var(--brand-primary);
					color: var(--brand-secondary);
					padding: 4px 10px;
					border-radius: 999px;
					font-size: 12px;
					font-weight: 600;
				}

				.scenario-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
					gap: 12px;
					margin: 14px 0 12px;
				}

				.scenario-label {
					font-size: 12px;
					color: var(--brand-muted);
				}

				.scenario-value {
					font-size: 18px;
					font-weight: 600;
					color: var(--brand-primary);
				}

				.chart-wrap {
					position: relative;
					width: 100%;
					height: 220px;
				}

				.chart-sm {
					height: 180px;
				}

				.grid-two {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 12px;
				}

				.legend {
					display: flex;
					flex-wrap: wrap;
					gap: 12px;
					margin-bottom: 10px;
					font-size: 11px;
					color: var(--brand-muted);
				}

				.matrix-head {
					font-weight: 600;
					color: var(--brand-primary);
					margin-bottom: 6px;
					font-size: 13px;
				}

				.matrix-list {
					margin: 0;
					padding-left: 16px;
					color: var(--brand-muted);
					font-size: 12px;
					line-height: 1.4;
				}

				.legend-dot {
					width: 10px;
					height: 10px;
					border-radius: 3px;
					display: inline-block;
					margin-right: 6px;
				}

				.dot-cashout {
					background: #0b3b76;
				}

				.dot-api {
					background: #1d5da5;
				}

				.dot-share {
					background: #1b6a5a;
				}

				.dot-loan {
					background: #c16a1b;
				}

				.dot-lending {
					background: #6c7b93;
				}


				.sr-only {
					position: absolute;
					width: 1px;
					height: 1px;
					padding: 0;
					margin: -1px;
					overflow: hidden;
					clip: rect(0, 0, 0, 0);
					white-space: nowrap;
					border: 0;
				}

				.table-wrap {
					overflow-x: auto;
					border-radius: 18px;
					border: 1px solid var(--brand-border);
					background: rgba(11, 59, 118, 0.04);
					box-shadow: inset 0 0 0 1px rgba(11, 59, 118, 0.03);
				}

				table {
					width: 100%;
					border-collapse: collapse;
					font-size: 12.5px;
					color: var(--brand-ink);
				}

				.matrix-table {
					min-width: 860px;
				}

				th,
				td {
					text-align: left;
					padding: 14px 14px;
					border-bottom: 1px solid rgba(13, 42, 92, 0.08);
					vertical-align: top;
				}

				th {
					font-weight: 600;
					color: var(--brand-muted);
					font-size: 11px;
					text-transform: uppercase;
					letter-spacing: 0.04em;
					background: rgba(11, 59, 118, 0.06);
				}

				.matrix-table tbody tr:nth-child(odd) {
					background: rgba(255, 255, 255, 0.55);
				}

				.matrix-table tbody tr:hover {
					background: rgba(11, 59, 118, 0.08);
				}

				.matrix-table th:nth-child(4),
				.matrix-table th:nth-child(5),
				.matrix-table th:nth-child(6),
				.matrix-table td:nth-child(4),
				.matrix-table td:nth-child(5),
				.matrix-table td:nth-child(6) {
					text-align: center;
					white-space: nowrap;
				}

				.matrix-col {
					width: 36%;
				}

				.matrix-cell {
					background: rgba(255, 255, 255, 0.65);
				}

				.pill {
					display: inline-block;
					padding: 4px 10px;
					border-radius: 999px;
					font-size: 11px;
					font-weight: 600;
				}

				.pill-preferred {
					background: rgba(27, 106, 90, 0.15);
					color: var(--brand-success);
				}

				.pill-fallback,
				.pill-floor {
					background: rgba(193, 106, 27, 0.15);
					color: var(--brand-warn);
				}

				.pill-last-resort {
					background: rgba(140, 42, 42, 0.15);
					color: var(--brand-danger);
				}

				.pill-avoid {
					background: rgba(140, 42, 42, 0.15);
					color: var(--brand-danger);
				}

				@media (max-width: 720px) {
					.hero {
						flex-direction: column;
						align-items: flex-start;
					}

					.nav {
						flex-direction: column;
						align-items: flex-start;
					}
				}
			`}</style>
		</main>
	);
}
