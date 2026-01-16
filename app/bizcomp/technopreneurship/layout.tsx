import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyLink - Cyber Security & Academy Platform",
  description: "360° Digital Protection and Cybersecurity Academy. Recover hacked accounts, secure websites, and learn cyber security.",
  keywords: "Cybersecurity, Cyber Security Academy, Facebook Recovery, Website Security, CyLink",
  openGraph: {
    title: "CyLink - Complete Digital Protection",
    description: "Recover hacked accounts, secure your digital assets, and learn cybersecurity with CyLink Academy.",
    type: "website",
  },
};

export default function TechnopreneurshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
