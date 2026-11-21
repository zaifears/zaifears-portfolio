import type { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import styles from "./layout.module.css";

const ibmPlexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

export default function FinaleLayout({ children }: { children: ReactNode }) {
	return (
		<div className={`${ibmPlexSans.variable} ${styles.finaleBg}`}>
			<div className={styles.finaleShell}>{children}</div>
		</div>
	);
}
