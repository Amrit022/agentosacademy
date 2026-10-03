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
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [clientsCount, setClientsCount] = useState(15);
  const [pricePerProject, setPricePerProject] = useState(40);

  const monthlyUsd = clientsCount * pricePerProject;
  const monthlyInr = monthlyUsd * 86; // approximate exchange rate in INR

  const tools = [
    {
      id: 'resume',
      title: 'AI Resume & ATS Builder',
      desc: 'Build resumes that conquer ATS scanners. Featuring real-time keyword analysis, Harvard single-column formatting, and an integrated cover letter generator.',
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
      desc: 'Create beautiful Bento-style link pages for creators and brands. Zero branding, custom domain support, and integrated click analytics.',
      href: '/tools/bio-link',
      icon: Link2,
      badge: 'Creator Economy',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      previewHeading: 'agentosacademy.com/u/yourname',
      previewDetails: 'Mobile-first Bento grid layouts, Spotify/YouTube embeds, custom neon themes, and live click tracking.',
      metrics: 'Sell Custom Bio Portfolios: $30 - $75 each',
    },
    {
      id: 'content',
      title: 'AI Content & Copywriting Engine',
      desc: 'Generate viral LinkedIn carousels, cold sales email sequences, SEO articles, and YouTube hooks engineered using viral formulas.',
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
      desc: 'Generate pixel-perfect, clickable email signatures for Gmail, Outlook, and Apple Mail with calendar booking buttons.',
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
      desc: 'Collect glowing video & text reviews asynchronously from clients, then embed an interactive Wall-of-Love widget on any website.',
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
      desc: 'Shorten links with custom slugs, generate high-resolution scannable QR codes, and measure visitor geographic traffic in real-time.',
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
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 text-center">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-300 text-xs font-semibold mb-8 shadow-inner">
          <Zap className="w-3.5 h-3.5 text-accent-400" />
          <span>The All-In-One SaaS Suite for Global Creators & Agencies</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] max-w-5xl mx-auto">
          Start in India. <br />
          <span className="text-gradient">Monetize & Scale Globally.</span>
        </h1>

        <p className="mt-7 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Stop paying $190/month across fragmented subscriptions. <strong className="text-white font-semibold">AgentOS Academy</strong> packs 
          6 high-demand tools into one sleek platform: Resume Builder, Bio Links, AI Writer, Email Signatures, Testimonials, and URL Shortener.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/tools/resume-builder" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
          >
            <span>Launch Free Tools Suite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/pricing" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
          >
            Explore Unlimited Plans ($9/mo)
          </Link>
        </div>

        {/* Live Metrics Showcase */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-white">6-in-1</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Unified Engines</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-emerald-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">To Start Creating</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-brand-400">$USD</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Global Revenue Model</div>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-accent-400">&lt; 90ms</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Vercel Edge Speed</div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Switcher Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 sm:p-12 border border-white/10 bg-[#090e1d]/90 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Interactive Workspace</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">Test All 6 Engines Right Here</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">Click below to preview each tool before launching.</p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {tools.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 scale-105'
                    : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Preview Display */}
          <div className="glass p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0c1224]/95 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
                <div className="text-[11px] font-bold text-accent-400 uppercase tracking-wide">Freelance Earning Potential:</div>
                <div className="text-xs font-semibold text-white">{tools[activeTab].metrics}</div>
              </div>

              <div className="pt-2">
                <Link
                  href={tools[activeTab].href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition-all hover:scale-105"
                >
                  <span>Open {tools[activeTab].title.split(' ')[0]} Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#070b16] shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Laptop className="w-4 h-4 text-brand-400" />
                  <span>{tools[activeTab].previewHeading}</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                  Verified Feature
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {tools[activeTab].previewDetails}
              </p>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Optimized for agentosacademy.com with 100% clean deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Earning Calculator (India to World) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 sm:p-14 border border-white/10 bg-gradient-to-br from-[#0c1224] via-[#090e1c] to-[#120e28] shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-400 flex items-center justify-center gap-1.5">
              <Calculator className="w-4 h-4" /> Global Currency Arbitrage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Freelance Revenue Simulator</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Calculate how much you can make from India by selling these outputs to overseas clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Number of Client Projects per Month</span>
                  <span className="text-brand-400 text-sm">{clientsCount} clients</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="50" 
                  value={clientsCount} 
                  onChange={(e) => setClientsCount(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>3 clients/mo</span>
                  <span>25 clients/mo</span>
                  <span>50 clients/mo</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Average Charge per Deliverable (USD)</span>
                  <span className="text-accent-400 text-sm">${pricePerProject} USD</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={pricePerProject} 
                  onChange={(e) => setPricePerProject(Number(e.target.value))}
                  className="w-full accent-accent-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$20 (e.g. Signature/Link)</span>
                  <span>$80 (e.g. Resume Package)</span>
                  <span>$150 (e.g. Monthly Retainer)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1">
                <div className="font-bold text-slate-200">How to deliver this:</div>
                <div>Use AgentOS Academy to produce the deliverables in minutes, and charge foreign clients on Upwork, Fiverr, or PayPal.</div>
              </div>
            </div>

            {/* Calculations Card */}
            <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#080c16] text-center space-y-6">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Estimated Monthly Income</span>

              <div>
                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  ${monthlyUsd.toLocaleString()} <span className="text-lg font-bold text-slate-400">USD</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-2">
                  ≈ ₹{monthlyInr.toLocaleString('en-IN')} INR / month
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-left">
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Annual USD</div>
                  <div className="text-base font-bold text-white">${(monthlyUsd * 12).toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Annual INR</div>
                  <div className="text-base font-bold text-emerald-300">₹{((monthlyInr * 12) / 100000).toFixed(1)} Lakhs</div>
                </div>
              </div>

              <Link 
                href="/tools/resume-builder"
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:opacity-90 transition"
              >
                Start Generating Projects Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Subscription Consolidation</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">AgentOS Academy vs Buying Separately</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">See how much you save every single month.</p>
        </div>

        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-300">
                  <th className="p-4 sm:p-5 font-bold">Tool Functionality</th>
                  <th className="p-4 sm:p-5 font-bold">Separate SaaS Subscriptions</th>
                  <th className="p-4 sm:p-5 font-bold text-brand-300">AgentOS Academy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {competitors.map((c, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-4 sm:p-5 font-semibold text-white">{c.tool}</td>
                    <td className="p-4 sm:p-5 text-rose-400 font-bold">{c.separateCost}</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Included in 1 Suite
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.04] font-black text-sm">
                  <td className="p-4 sm:p-5 text-white">TOTAL MONTHLY COST</td>
                  <td className="p-4 sm:p-5 text-rose-400">$196 / month (~₹16,800)</td>
                  <td className="p-4 sm:p-5 text-emerald-400 text-base">$0 Free / $9 Pro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 Tools Grid */}
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
              className="glass-card p-8 rounded-3xl relative flex flex-col justify-between group overflow-hidden"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${t.gradient} blur-2xl group-hover:scale-150 transition-transform`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    <t.icon className={`w-6 h-6 ${t.iconColor}`} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full glass text-slate-300">
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

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>Launch Interactive Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 text-center text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Launch on agentosacademy.com?
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto mt-4 leading-relaxed">
            Join developers, creators, and freelancers building high-margin digital assets for the global economy.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/tools/resume-builder"
              className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:scale-105 transition"
            >
              Get Started Right Now (Free Access)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
