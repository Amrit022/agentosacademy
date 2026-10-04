import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiAssistantModal from '@/components/AiAssistantModal';

export const metadata: Metadata = {
  title: 'OmniStack AI — 6 Powerful AI SaaS & Productivity Tools Under One Roof',
  description: 'Universal AI Assistant, AI Resume Builder, Bio Link Creator, AI Copywriting Suite, HTML Email Signature Generator, Testimonials Widget, and URL Shortener with Analytics.',
  keywords: [
    'OmniStack AI',
    'AI resume builder',
    'ChatGPT alternative',
    'bio link page',
    'Linktree alternative',
    'AI content writer',
    'HTML email signature',
    'testimonial collector widget',
    'URL shortener analytics'
  ],
  authors: [{ name: 'OmniStack AI' }],
  metadataBase: new URL('https://agentosacademy.com'),
  openGraph: {
    title: 'OmniStack AI — The All-in-One Global AI SaaS Platform',
    description: '6 high-impact micro-tools and universal AI assistant in one single dashboard. Designed for global freelancers, founders, and creators.',
    url: 'https://agentosacademy.com',
    siteName: 'OmniStack AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniStack AI — 6-in-1 AI Productivity Suite',
    description: 'All-in-one suite: Universal AI, Resume Builder, Bio Links, AI Writer, Email Signatures, Testimonials & URL Shortener.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-mesh min-h-screen flex flex-col justify-between text-slate-100 antialiased selection:bg-brand-500/30 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <AiAssistantModal />
      </body>
    </html>
  );
}
