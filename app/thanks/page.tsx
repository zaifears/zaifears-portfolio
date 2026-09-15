import { Metadata } from 'next';
import ThanksClient from './ThanksClient';

export const metadata: Metadata = {
  title: 'Buy Me a Coffee | Md Al Shahoriar Hossain',
  description:
    'Have you used any of my services? If you liked what I do, you can buy me a cup of coffee! Direct support & remittance via bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
  alternates: {
    canonical: 'https://shahoriar.bd/thanks',
  },
  openGraph: {
    title: 'Buy Me a Coffee | Md Al Shahoriar Hossain',
    description:
      'Have you used any of my services? If you liked what I do, you can buy me a cup of coffee! Direct support & remittance via bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
    url: 'https://shahoriar.bd/thanks',
  },
};

export default function ThanksPage() {
  return <ThanksClient />;
}
