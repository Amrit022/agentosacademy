'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Link2, 
  PenTool, 
  Mail, 
  MessageSquareQuote, 
  Scissors, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Globe2, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Star,
  DollarSign,
  Calculator,
  Laptop,
  Check,
  X,
  Layers,
  ChevronRight,
  BarChart3,
  ExternalLink,
  Award,
  Activity,
  Copy,
  Eye,
  Smartphone,
  Flame,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [clientsCount, setClientsCount] = useState(15);
  const [pricePerProject, setPricePerProject] = useState(40);
  const [copiedLink, setCopiedLink] = useState(false);

  const monthlyUsd = clientsCount * pricePerProject;
  const annualUsd = monthlyUsd * 12;

  // Dynamic Revenue Tier Calculation (Micro-to-Macro Progression)
  const getRevenueTier = (monthly: number) => {
    if (monthly < 600) {
      return { 
        stage: 'Stage 1', 
        title: 'Starter Freelancer', 
        badge: '🌱 Building Momentum',
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' 
      };
    }
    if (monthly < 1800) {
      return { 
        stage: 'Stage 2', 
        title: 'High-Velocity Solo Pro', 
        badge: '⚡ Consistent Cashflow',
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' 
      };
    }
    if (monthly < 3500) {
      return { 
        stage: 'Stage 3', 
        title: 'Boutique Digital Agency', 
        badge: '🚀 High-Margin Scale',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' 
      };
    }
    return { 
      stage: 'Stage 4', 
      title: 'Global Enterprise Studio', 
      badge: '👑 Elite Global Tier',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
    };
  };

  const currentTier = getRevenueTier(monthlyUsd);
  const progressPercent = Math.min(Math.round((monthlyUsd / 6000) * 100), 100);

  const tools = [
    {
      id: 'resume',
      title: 'AI Resume & ATS Builder',
      shortName: 'Resume Builder',
      desc: 'Build resumes engineered to beat Fortune 500 ATS scanners. Features real-time keyword scoring, Harvard single-column formatting, and 1-click PDF compilation.',
      href: '/tools/resume-builder',
      icon: FileText,
      badge: 'High Earning Skill',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
      previewHeading: 'Harvard ATS Format + Real-Time Score',
      previewDetails: 'Scores each resume against 20+ keyword rules, action verbs, and single-column formatting. Export to PDF in 1 click.',
      metrics: 'Average Freelance Rate: $50 - $150 per resume',
    },
    {
      id: 'bio',
      title: 'Social Media Bio Link Page (Linktree Pro)',
      shortName: 'Bio Link Pro',
      desc: 'Create beautiful Bento-style link pages for creators, consultants, and brands. Zero branding, custom domain support, and real-time visitor analytics.',
      href: '/tools/bio-link',
      icon: Link2,
      badge: 'Creator Economy',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      previewHeading: 'omnistack.ai/u/yourname',
      previewDetails: 'Mobile-first Bento grid layouts, Spotify/YouTube embeds, custom neon themes, and live click tracking.',
      metrics: 'Sell Custom Bio Portfolios: $30 - $75 each',
    },
    {
      id: 'content',
      title: 'AI Content & Copywriting Engine',
      shortName: 'AI Copywriter',
      desc: 'Generate viral LinkedIn carousels, cold sales email sequences, SEO articles, and YouTube hooks engineered using proven viral formulas.',
      href: '/tools/content-writer',
      icon: PenTool,
      badge: 'Agency Workhorse',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-400',
      previewHeading: 'Multi-Format AI Copywriter',
      previewDetails: 'Outputs 8+ content formats with readability scoring, Flesch-Kincaid ratings, and instant markdown/text export.',
      metrics: 'Sell Content Packages: $200 - $500/month',
    },
    {
      id: 'signature',
      title: 'HTML Email Signature Generator',
      shortName: 'Email Signature',
      desc: 'Generate pixel-perfect, clickable email signatures for Gmail, Outlook, and Apple Mail with avatar styling and calendar booking links.',
      href: '/tools/email-signature',
      icon: Mail,
      badge: 'Corporate Deliverable',
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-400',
      previewHeading: '1-Click Rich HTML Clipboard Copy',
      previewDetails: 'Compliant table layout with social icons, avatar shapes, accent color pickers, and direct Gmail paste support.',
      metrics: 'Sell Team Signatures: $25 - $50 per person',
    },
    {
      id: 'testimonials',
      title: 'Testimonial Collector & Embed Widget',
      shortName: 'Testimonials',
      desc: 'Collect glowing video & text reviews asynchronously from clients, then embed an interactive Wall-of-Love widget on any client website.',
      href: '/tools/testimonials',
      icon: MessageSquareQuote,
      badge: 'High Conversion',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      previewHeading: 'Wall-of-Love Embed Script',
      previewDetails: 'Embed on Webflow, WordPress, Shopify, or custom Next.js sites with 1 line of script. Verified badges included.',
      metrics: 'Monthly Retainer to Manage Reviews: $100/mo',
    },
    {
      id: 'url',
      title: 'URL Shortener & Geo Analytics',
      shortName: 'URL Shortener',
      desc: 'Shorten links with custom slugs, generate scannable high-resolution QR codes, and measure visitor geographic traffic in real-time.',
      href: '/tools/url-shortener',
      icon: Scissors,
      badge: 'Growth Engine',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      previewHeading: 'Custom Slugs + Geographic Heatmaps',
      previewDetails: 'Real-time country breakdown, device distribution, referrer tracking, and scannable QR code downloads.',
      metrics: 'Campaign Tracking Service: $50 - $150 per project',
    },
  ];

  const competitors = [
    { tool: 'AI Resume Builder (Resume.io / Zety)', separateCost: '$25/mo' },
    { tool: 'Link-in-Bio Pro (Linktree / Beacons)', separateCost: '$15/mo' },
    { tool: 'AI Copywriter (Jasper / Copy.ai)', separateCost: '$49/mo' },
    { tool: 'Email Signature Pro (WiseStamp)', separateCost: '$12/mo' },
    { tool: 'Review Collector Widget (Testimonial.to)', separateCost: '$60/mo' },
    { tool: 'Branded Link Shortener (Bitly Pro)', separateCost: '$35/mo' },
  ];

  return (
    <div className="relative space-y-32 pb-24 overflow-hidden">
      {/* ======================================================== */}
      {/* 1. GLOBAL MULTI-LAYER AMBIENT BACKGROUND ANIMATION SYSTEM */}
      {/* ======================================================== */}
      
      {/* Radiant Horizon Glow at Header Top */}
      <div className="absolute top-0 left-0 right-0 h-72 horizon-glow pointer-events-none z-0" />

      {/* Cyber Grid Pattern with Soft Mask */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />

      {/* Multi-Layer Ambient Aurora Waves (GPU-accelerated drift) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1050px] h-[520px] bg-gradient-to-tr from-brand-600/35 via-indigo-500/30 to-purple-600/25 rounded-full blur-[110px] pointer-events-none z-0 animate-aurora-1" />
      <div className="absolute top-44 -left-28 w-[600px] h-[450px] bg-gradient-to-br from-fuchsia-600/28 via-pink-500/22 to-transparent rounded-full blur-[110px] pointer-events-none z-0 animate-aurora-2" />
      <div className="absolute top-80 -right-28 w-[600px] h-[450px] bg-gradient-to-bl from-cyan-500/28 via-sky-500/22 to-indigo-600/18 rounded-full blur-[110px] pointer-events-none z-0 animate-aurora-3" />

      {/* Mid-Page & Simulator Ambient Nebula Waves */}
      <div className="absolute top-[35%] left-1/4 -translate-x-1/2 w-[650px] h-[420px] bg-gradient-to-tr from-brand-500/20 via-purple-500/18 to-transparent rounded-full blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute top-[62%] right-1/4 translate-x-1/2 w-[650px] h-[420px] bg-gradient-to-bl from-accent-500/20 via-pink-500/18 to-cyan-500/12 rounded-full blur-[130px] pointer-events-none z-0 animate-float-slow" />

      {/* ======================================================== */}
      {/* 2. HERO SECTION: MICRO-TO-MACRO DETAILING & SPRING PHYSICS */}
      {/* ======================================================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 lg:pt-24 text-center">
        
        {/* Core Hero Ambient Cosmic Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[400px] bg-gradient-to-tr from-brand-600/35 via-indigo-500/28 to-accent-500/22 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse-slow" />
        
        {/* Floating Desktop Micro-Cards with Spring Physics */}
        <div className="hidden xl:flex absolute left-4 top-28 items-center gap-3 p-3.5 rounded-2xl glass border border-white/10 shadow-2xl animate-float pointer-events-none z-10 backdrop-blur-xl group hover:border-brand-500/40">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-brand-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>6-in-1 Suite</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Zero subscription fatigue</div>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-4 top-36 items-center gap-3 p-3.5 rounded-2xl glass border border-white/10 shadow-2xl animate-float-reverse pointer-events-none z-10 backdrop-blur-xl group hover:border-emerald-500/40">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>Global MoR Gateway</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">256-Bit</span>
            </div>
            <div className="text-[10px] text-slate-400">Cards, Apple Pay & PayPal</div>
          </div>
        </div>

        {/* Hero Pill Badge with Live Radar Ping */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-brand-300 text-xs font-semibold mb-8 shadow-inner transition-all hover:border-brand-500/40 group cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="group-hover:text-white transition-colors">OmniStack AI Suite · v2.4 Live & Accelerated</span>
          <span className="text-[10px] text-slate-400 border-l border-white/15 pl-2">USD Global Billing</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] max-w-5xl mx-auto break-words">
          Build Faster. <br />
          <span className="text-gradient-animated">Scale Globally. Monetize Smarter.</span>
        </h1>

        <p className="mt-7 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Stop paying $190/month across fragmented subscriptions. <strong className="text-white font-semibold">OmniStack AI</strong> packs 
          6 high-demand tools into one sleek platform: Resume Builder, Bio Links, AI Writer, Email Signatures, Testimonials, and URL Shortener.
        </p>

        {/* CTAs with Spring Physics & Glowing Shimmer Sweep */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/tools/resume-builder" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 flex items-center justify-center gap-2 btn-shimmer group relative overflow-hidden"
          >
            <span>Launch Free Tools Suite</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/pricing" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white font-semibold text-sm transition-all duration-200 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 flex items-center justify-center gap-2"
          >
            <span>Explore Unlimited Plans ($9/mo)</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Live Metrics Showcase: Elevated Micro Cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass card-glow p-6 rounded-2xl border border-white/5 text-center group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="text-3xl font-black text-white group-hover:text-brand-300 transition-colors">6-in-1</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Unified Engines</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="glass card-glow p-6 rounded-2xl border border-white/5 text-center group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="text-3xl font-black text-emerald-400 group-hover:scale-105 transition-transform">100% Free</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">To Start Creating</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="glass card-glow p-6 rounded-2xl border border-white/5 text-center group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="text-3xl font-black text-brand-400 group-hover:scale-105 transition-transform">$USD</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Global Revenue Model</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="glass card-glow p-6 rounded-2xl border border-white/5 text-center group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="text-3xl font-black text-accent-400 group-hover:scale-105 transition-transform">&lt; 90ms</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Vercel Edge Speed</div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-accent-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. INTERACTIVE TOOL SWITCHER: LIVING SIMULATION PREVIEWS */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-5 sm:p-10 lg:p-12 border border-white/10 bg-[#090e1d]/90 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber Grid Accent */}
          <div className="cyber-grid opacity-30" />

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Workspace Simulation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">Test All 6 Engines Right Here</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">Click below to preview live deliverables generated by each engine.</p>
          </div>

          {/* Smooth Tab Selector with Horizontal Swiping on Mobile */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-10 pb-2 px-1 justify-start sm:justify-center relative z-10">
            {tools.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 scale-105 border border-white/20'
                    : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <t.icon className={`w-3.5 h-3.5 shrink-0 ${activeTab === idx ? 'animate-pulse' : ''}`} />
                <span>{t.shortName}</span>
              </button>
            ))}
          </div>

          {/* Active Preview Display with Hardware Accelerated Switch Animation */}
          <div key={activeTab} className="glass p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#0c1224]/95 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10">
            
            {/* Left Column: Tool Specs & Monetization Value */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-brand-300 bg-brand-500/10 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tools[activeTab].badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {tools[activeTab].title}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {tools[activeTab].desc}
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="text-[11px] font-bold text-accent-400 uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Global Earning Potential:
                </div>
                <div className="text-xs font-semibold text-white">{tools[activeTab].metrics}</div>
              </div>

              <div className="pt-2">
                <Link
                  href={tools[activeTab].href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 btn-shimmer"
                >
                  <span>Launch {tools[activeTab].title.split(' ')[0]} Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: RICH LIVING SIMULATION PREVIEW */}
            <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#070b16] shadow-2xl space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Laptop className="w-4 h-4 text-brand-400" />
                  <span>{tools[activeTab].previewHeading}</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Preview
                </span>
              </div>

              {/* Dynamic Interactive Demo Rendered by Tab */}
              {activeTab === 0 && (
                /* Resume Builder Live Mockup */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Alex Morgan</div>
                      <div className="text-[11px] text-slate-400">Senior Full-Stack Engineer · San Francisco, CA</div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Award className="w-4 h-4" />
                      <div className="text-xs font-black">98% ATS</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Harvard Single-Column</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>24 Keyword Matches</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Quantified Metrics</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Action Verb Index: 96%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-brand-500/10 border border-brand-500/20 text-xs text-brand-300 flex items-center justify-between">
                    <span>Export Ready: PDF & LaTeX Compliant</span>
                    <span className="font-bold underline cursor-pointer">Preview Format</span>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                /* Bio Link Page Live Mockup */
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                      AM
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>@alexmorgan</span>
                        <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                      <div className="text-[10px] text-slate-400">Designer & Solo SaaS Founder</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-white text-xs font-semibold flex items-center justify-between hover:bg-purple-500/25 transition cursor-pointer">
                      <span>🚀 My 2026 SaaS Agency Stack</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center justify-between hover:bg-white/10 transition cursor-pointer">
                      <span>📅 Book 1-on-1 Consultation ($150)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center justify-between hover:bg-white/10 transition cursor-pointer">
                      <span>🎙️ Watch Latest Tech Podcast</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                    <span>omnistack.ai/u/alexmorgan</span>
                    <span className="text-emerald-400 font-bold">+1,420 visits this week</span>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                /* AI Copywriter Live Mockup */
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
                    <span className="text-pink-400 font-bold">Formula: Viral LinkedIn Hook</span>
                    <span>Tokens: 184</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#03060f] border border-white/10 font-mono text-xs text-slate-200 leading-relaxed">
                    <p className="text-pink-300 font-bold mb-1.5">
                      &quot;The secret to charging $2,500/mo retainer isn&apos;t working 80 hours a week.&quot;
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      It&apos;s having automated engines that deliver client deliverables in 15 minutes instead of 4 days. Here is the exact stack we use...
                      <span className="inline-block w-1.5 h-3 bg-brand-400 ml-1 animate-pulse align-middle" />
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="text-emerald-400 font-bold">Flesch-Kincaid: Grade 8 (Optimal Viral Flow)</span>
                    <button 
                      onClick={() => {
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="text-brand-300 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedLink ? 'Copied!' : 'Copy Copy'}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                /* Email Signature Live Mockup */
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-slate-950 text-base shadow-md shrink-0">
                      SJ
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white">Sarah Jenkins</div>
                      <div className="text-[11px] text-amber-400 font-medium">VP of Growth & Partnerships</div>
                      <div className="text-[10px] text-slate-400">OmniCorp Global · New York & London</div>
                      <div className="pt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-slate-300 font-medium">sarah@omnicorp.ai</span>
                        <span className="px-2 py-0.5 rounded bg-brand-500/20 text-[9px] text-brand-300 font-bold cursor-pointer">Book 15-Min</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">✓ 1-Click Paste Compatible</span>
                    <span className="text-slate-400">Gmail · Outlook · Apple Mail</span>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                /* Testimonial Widget Live Mockup */
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 space-y-2.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      &quot;OmniStack AI cut our client deliverable turnaround from 5 days to 20 minutes. We closed 3 new retainer clients worth $3,600/mo in our first week.&quot;
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                      <div className="font-bold text-white">Marcus Vance · Apex Media</div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Verified Buyer</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Embed Script: &lt;script src=&quot;omnistack.ai/w/apex&quot;&gt;</span>
                    <span className="text-brand-300 font-bold">Webflow / Shopify / Next.js</span>
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                /* URL Shortener Live Mockup */
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">omnistack.ai/launch-q4</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full font-bold">Active</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">Destination: https://youragency.com/campaign?ref=omnistack</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Geographic Traffic: <strong>14,892 visits</strong></span>
                      <span className="text-cyan-400">Real-time</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-cyan-500 h-full" style={{ width: '64%' }} title="USA 64%" />
                      <div className="bg-indigo-500 h-full" style={{ width: '22%' }} title="UK 22%" />
                      <div className="bg-emerald-500 h-full" style={{ width: '14%' }} title="EU 14%" />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>🇺🇸 USA 64%</span>
                      <span>🇬🇧 UK 22%</span>
                      <span>🇪🇺 EU 14%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Optimized for OmniStack AI with 100% clean deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. GLOBAL SAAS REVENUE SIMULATOR: "SMALL TO BIG" SCALING */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 sm:p-12 lg:p-14 border border-white/10 bg-gradient-to-br from-[#0c1224] via-[#090e1c] to-[#120e28] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-400 flex items-center justify-center gap-1.5">
              <Calculator className="w-4 h-4" /> Global Monetization Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Digital Revenue Simulator</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Calculate your projected revenue by packaging and delivering automated digital deliverables to global clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
            {/* Interactive Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Number of Client Projects per Month</span>
                  <span className="text-brand-400 text-sm font-black">{clientsCount} clients</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="50" 
                  value={clientsCount} 
                  onChange={(e) => setClientsCount(Number(e.target.value))}
                  className="w-full cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>3 clients/mo</span>
                  <span>25 clients/mo</span>
                  <span>50 clients/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Average Charge per Deliverable (USD)</span>
                  <span className="text-accent-400 text-sm font-black">${pricePerProject} USD</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={pricePerProject} 
                  onChange={(e) => setPricePerProject(Number(e.target.value))}
                  className="w-full cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
                  <span>$20 (e.g. Signature/Link)</span>
                  <span>$80 (e.g. Resume Package)</span>
                  <span>$150 (e.g. Monthly Retainer)</span>
                </div>
              </div>

              {/* Dynamic Scaling Progression Bar (Micro to Macro) */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Scaling Progression:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${currentTier.color}`}>
                    {currentTier.badge}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300 shadow-md"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Current: <strong>{currentTier.title}</strong></span>
                  <span>Target: $6,000/mo ARR</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1">
                <div className="font-bold text-slate-200">How to monetize this:</div>
                <div>Use OmniStack AI to generate polished client assets in minutes, and bill international clients via Stripe, PayPal, or Wise.</div>
              </div>
            </div>

            {/* Calculations Card with Dynamic Glowing Bloom */}
            <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#080c16] text-center space-y-6 shadow-2xl relative border-gradient-glow">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Estimated Monthly Run-Rate
              </span>

              <div>
                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  ${monthlyUsd.toLocaleString()} <span className="text-lg font-bold text-slate-400">USD</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-2 flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-5 h-5" />
                  <span>${annualUsd.toLocaleString()} USD / year ARR</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-left">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Estimated Time Saved</div>
                  <div className="text-base font-bold text-white mt-0.5">~{clientsCount * 6} hrs/mo</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Gross Margin</div>
                  <div className="text-base font-bold text-emerald-300 mt-0.5">96.8% Profit</div>
                </div>
              </div>

              <Link 
                href="/tools/resume-builder"
                className="block w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98] transition-transform btn-shimmer"
              >
                Start Generating Deliverables Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FEATURE COMPARISON MATRIX: HIGHLIGHTED VALUE DOMINANCE */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Subscription Consolidation</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">OmniStack AI vs Buying Separately</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">See how much you save every single month by consolidating onto one platform.</p>
        </div>

        <div className="sm:hidden text-center text-[11px] text-slate-400 mb-2 font-medium flex items-center justify-center gap-1.5">
          <span>👈 Swipe horizontally to view full matrix 👉</span>
        </div>

        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto no-scrollbar touch-pan-x">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-300">
                  <th className="p-4 sm:p-5 font-bold">Tool Functionality</th>
                  <th className="p-4 sm:p-5 font-bold">Separate SaaS Subscriptions</th>
                  <th className="p-4 sm:p-5 font-bold text-brand-300 bg-brand-500/10 border-l border-brand-500/20">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                      OmniStack AI (Consolidated)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {competitors.map((c, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{c.tool}</td>
                    <td className="p-4 sm:p-5 text-rose-400 font-bold">{c.separateCost}</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold flex items-center gap-1.5 bg-brand-500/[0.05] border-l border-brand-500/20">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> 
                      <span>Included in 1 Suite</span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.04] font-black text-sm">
                  <td className="p-4 sm:p-5 text-white">TOTAL MONTHLY COST</td>
                  <td className="p-4 sm:p-5 text-rose-400">$196 / month ($2,352/yr)</td>
                  <td className="p-4 sm:p-5 text-emerald-400 text-base bg-brand-500/15 border-l border-brand-500/30">
                    $0 Free / $9 Pro
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. 6 CORE ENGINES GRID: POLISHED HOVER STATES & ACCENTS */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white">The 6 Core Engines</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Each engine is built with client-ready presets and export options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <Link 
              key={t.id} 
              href={t.href}
              className="glass-card card-glow p-8 rounded-3xl relative flex flex-col justify-between group overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Hairline Glowing Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent group-hover:via-accent-400/80 transition-all duration-500" />

              {/* Glowing Corner Aura */}
              <div className={`absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br ${t.gradient} blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-60 transition-all duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                    <t.icon className={`w-6 h-6 ${t.iconColor}`} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full glass text-slate-300 group-hover:border-white/20 transition-colors">
                    {t.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-brand-400 group-hover:text-accent-300 transition-colors">
                <span>Launch Interactive Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. FINAL CALL TO ACTION: EXPANSIVE AMBIENT FINALE */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight relative z-10">
            Ready to Launch with OmniStack AI?
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto mt-4 leading-relaxed relative z-10">
            Join developers, creators, and freelancers building high-margin digital assets for the global economy.
          </p>
          <div className="mt-8 flex justify-center relative z-10">
            <Link
              href="/tools/resume-builder"
              className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all btn-shimmer flex items-center gap-2"
            >
              <span>Get Started Right Now (Free Access)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
