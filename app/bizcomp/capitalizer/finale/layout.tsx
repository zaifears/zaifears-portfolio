import type { ReactNode } from "react";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import styles from "./layout.module.css";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-display",
	weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	variable: "--font-body",
	weight: ["400", "500", "600"],
});

export default function FinaleLayout({ children }: { children: ReactNode }) {
	return (
		<div className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${styles.finaleBg}`}>
			<div className={styles.finaleShell}>{children}</div>
		</div>
	);
}
