
export default function BtmIutLayout({ children }: { children: React.ReactNode }) {
	return (
		<div style={{ padding: '2rem', minHeight: '100vh', background: '#f9fafb' }}>
			{children}
		</div>
	);
}
