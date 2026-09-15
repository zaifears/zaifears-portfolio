import { Metadata } from 'next';
import ThanksClient from './ThanksClient';

export const metadata: Metadata = {
  title: 'Thank You | Support My Projects & Tools',
  description:
    'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people. Direct payment and remittance guide for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
  alternates: {
    canonical: 'https://shahoriar.bd/thanks',
  },
  openGraph: {
    title: 'Thank You | Support My Projects & Tools',
    description:
      'Did you love using any of my apps? Thank you very much. I enjoy solving problems and building free tools for people. Direct payment and remittance guide for bKash, Standard Chartered Bank, Wise, Remitly, PayPal (Xoom), and Revolut.',
    url: 'https://shahoriar.bd/thanks',
  },
};

export default function ThanksPage() {
  return <ThanksClient />;
}
