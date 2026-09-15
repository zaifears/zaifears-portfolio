import { Metadata } from 'next';
import ThanksClient from './ThanksClient';

export const metadata: Metadata = {
  title: 'Thank You & Payment Support',
  description:
    'Support, payment, and international remittance guide for Md Al Shahoriar Hossain. Instructions for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
  alternates: {
    canonical: 'https://shahoriar.bd/thanks',
  },
  openGraph: {
    title: 'Thank You & Payment Support | Md Al Shahoriar Hossain',
    description:
      'Support, payment, and international remittance guide for Md Al Shahoriar Hossain via bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
    url: 'https://shahoriar.bd/thanks',
  },
};

export default function ThanksPage() {
  return <ThanksClient />;
}
