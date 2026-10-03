import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiAssistantModal from '@/components/AiAssistantModal';

export const metadata: Metadata = {
  title: 'AgentOS Academy — 6 Powerful AI SaaS Tools Under One Roof',
  description: 'AI Resume Builder, Bio Link Creator, AI Content Writer, Email Signature Generator, Testimonials Widget, and URL Shortener. Build from India, earn globally in USD.',
  keywords: [
    'AI resume builder',
    'bio link page',
    'Linktree alternative',
    'AI content writer',
    'HTML email signature',
    'testimonial collector widget',
    'URL shortener analytics',
    'AgentOS Academy'
  ],
  authors: [{ name: 'AgentOS Academy' }],
  metadataBase: new URL('https://agentosacademy.com'),
  openGraph: {
    title: 'AgentOS Academy — Complete AI SaaS Platform',
    description: '6 high-impact micro-tools in one single dashboard. Designed for global freelancers and creators.',
    url: 'https://agentosacademy.com',
    siteName: 'AgentOS Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentOS Academy — AI Tools for Global Earnings',
    description: 'All-in-one suite: Resume Builder, Bio Links, AI Writer, Email Signatures, Testimonials & URL Shortener.',
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
