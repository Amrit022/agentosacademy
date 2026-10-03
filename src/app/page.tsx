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
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  const tools = [
    {
      id: 'resume',
      title: 'AI Resume & Cover Letter Builder',
      desc: 'Beat ATS screening algorithms with formatted, keyword-optimized resumes. Export directly to PDF for US and international remote jobs.',
      href: '/tools/resume-builder',
      icon: FileText,
      badge: 'Job Seekers',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
      previewHeading: 'Generate ATS-Scored PDF',
      previewDetails: 'Produces clean, single-column resumes that score 95%+ on Greenhouse, Lever, and Workday recruiters.',
    },
    {
      id: 'bio',
      title: 'Social Media Bio Link Page',
      desc: 'The next-generation Linktree alternative. Showcase client portfolios, services, YouTube videos, and receive USD payments.',
      href: '/tools/bio-link',
      icon: Link2,
      badge: 'Creators & Influencers',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      previewHeading: 'agentosacademy.com/u/yourname',
      previewDetails: 'Beautiful mobile-first layout with live click counters, custom themes, and zero platform branding.',
    },
    {
      id: 'content',
      title: 'AI Blog & Content Generator',
      desc: 'Draft viral LinkedIn posts, newsletters, and high-ranking SEO blogs in seconds using pre-engineered prompt workflows.',
      href: '/tools/content-writer',
      icon: PenTool,
      badge: 'Marketers & Ghostwriters',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-400',
      previewHeading: 'Instant AI Drafting',
      previewDetails: 'Transforms one idea into a 5-part LinkedIn carousel, an email newsletter, and an SEO-friendly blog post.',
    },
    {
      id: 'signature',
      title: 'HTML Email Signature Generator',
      desc: 'Design beautiful, clickable email signatures with social badges, calendar booking links, and professional avatar branding.',
      href: '/tools/email-signature',
      icon: Mail,
      badge: 'Freelancers & Founders',
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-400',
      previewHeading: 'One-Click Gmail/Outlook Copy',
      previewDetails: 'Copy raw compliant HTML that renders flawlessly on mobile and desktop email clients.',
    },
    {
      id: 'testimonials',
      title: 'Testimonial Collector & Embed Widget',
      desc: 'Collect glowing reviews from clients with a simple link, then embed a responsive Wall-of-Love widget on your website.',
      href: '/tools/testimonials',
      icon: MessageSquareQuote,
      badge: 'Agencies & SaaS',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      previewHeading: 'Embed Anywhere with 1 Script',
      previewDetails: 'Works on Webflow, WordPress, Shopify, and custom React sites with zero coding required.',
    },
    {
      id: 'url',
      title: 'URL Shortener & Geo Analytics',
      desc: 'Track marketing campaign clicks with custom branded links, automatic QR code generator, and geo-location metrics.',
      href: '/tools/url-shortener',
      icon: Scissors,
      badge: 'Growth Marketers',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
      previewHeading: 'Custom Slugs + Instant QR Codes',
      previewDetails: 'Real-time country breakdown, device distribution, and instant downloadable vector QR codes.',
    },
  ];

  const faqs = [
    {
      q: 'Can I start using all 6 tools from India without a credit card?',
      a: 'Yes! All tools are free to launch directly in your browser. You can create resumes, generate email signatures, test bio link pages, and shorten URLs immediately without entering billing details.',
    },
    {
      q: 'How does this help me earn money globally in USD?',
      a: 'You can sell these outputs as freelancing services on Upwork, Fiverr, or directly to overseas clients (e.g., charging \$50 for professional ATS resumes, \$30 for custom email signatures, or managing review widgets for local businesses).',
    },
    {
      q: 'Is this configured for agentosacademy.com?',
      a: 'Yes, the codebase is fully customized with metadata, routing, and assets designed to run seamlessly on agentosacademy.com via Vercel or Render.',
    },
    {
      q: 'Can I deploy this on GitHub and Vercel?',
      a: 'Yes! We have included `vercel.json` for one-click Vercel Edge deployment, and `render.yaml` for Render service hosting.',
    },
  ];

  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold mb-8 animate-pulse">
          <Zap className="w-3.5 h-3.5 text-accent-400" />
          <span>The All-In-One SaaS Suite for Global Creators</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-5xl mx-auto">
          Start in India. <br />
          <span className="text-gradient">Monetize & Scale Globally.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Stop paying \$150/month across separate subscriptions. <strong className="text-white">AgentOS Academy</strong> packs 
          6 high-demand tools into one sleek platform: Resume Builder, Bio Links, AI Writer, Email Signatures, Testimonials, and URL Shortener.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/tools/resume-builder" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Launch Free Tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/pricing" 
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold text-sm transition-all"
          >
            Explore Unlimited Plans (\$9/mo)
          </Link>
        </div>

        {/* Live Metrics Showcase */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass p-5 rounded-2xl border border-white/5">
            <div className="text-2xl font-extrabold text-white">6-in-1</div>
            <div className="text-xs text-slate-400 mt-1">Unified Tool Engine</div>
          </div>
          <div className="glass p-5 rounded-2xl border border-white/5">
            <div className="text-2xl font-extrabold text-emerald-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">Instant Access</div>
          </div>
          <div className="glass p-5 rounded-2xl border border-white/5">
            <div className="text-2xl font-extrabold text-brand-400">Global</div>
            <div className="text-xs text-slate-400 mt-1">USD Monetization</div>
          </div>
          <div className="glass p-5 rounded-2xl border border-white/5">
            <div className="text-2xl font-extrabold text-purple-400">&lt; 100ms</div>
            <div className="text-xs text-slate-400 mt-1">Edge Latency</div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Switcher Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#090e1a]/80 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Interactive Preview</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Click to Experience the 6 Engines</h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {tools.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 scale-105'
                    : 'glass text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.title.split(' ')[1] || t.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Preview Display */}
          <div className="glass p-8 rounded-2xl border border-white/10 bg-[#0c1222]/90 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full glass text-brand-300 border border-brand-500/30">
                {tools[activeTab].badge}
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                {tools[activeTab].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {tools[activeTab].desc}
              </p>
              <div className="pt-2">
                <Link
                  href={tools[activeTab].href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition"
                >
                  Open Live {tools[activeTab].title.split(' ')[0]} Tool <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 bg-slate-950/60 shadow-xl space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-400" />
                {tools[activeTab].previewHeading}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {tools[activeTab].previewDetails}
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Ready to run on agentosacademy.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Tools Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Complete Digital Toolbox</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            Everything you need to run an automated services agency, build personal brands, and monetize global clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <Link 
              key={t.id} 
              href={t.href}
              className="glass-card p-7 rounded-3xl relative flex flex-col justify-between group overflow-hidden"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${t.gradient} blur-2xl group-hover:scale-150 transition-transform`} />

              <div>
                <div className="flex items-center justify-between mb-5">
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

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>Open Interactive Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-8 sm:p-14 border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-400">Simple Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Start Free, Upgrade for Scale</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            Never pay for expensive separate subscriptions again. Single price, unlimited utility.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {/* Free Tier */}
            <div className="glass p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Starter</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">\$0</span>
                  <span className="text-xs text-slate-400">/forever</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Full access to generate resumes, links, signatures and short URLs.</p>
                <div className="space-y-2 mt-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ATS Resume Builder</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Personal Bio Link Page</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> HTML Signature Generator</div>
                </div>
              </div>
              <Link href="/tools/resume-builder" className="mt-8 text-center py-2.5 rounded-xl glass text-xs font-semibold text-white hover:bg-white/10">
                Start Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="glass p-7 rounded-3xl border-2 border-brand-500 bg-[#0e1424]/90 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Pro Creator</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">\$9</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">For freelancers and creators scaling client revenue.</p>
                <div className="space-y-2 mt-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> All 6 Micro-SaaS Tools</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> Unlimited AI Content Writes</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> Testimonial Collector Widgets</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-brand-400" /> Branded Custom Short Links</div>
                </div>
              </div>
              <Link href="/pricing" className="mt-8 text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-xs font-bold text-white shadow-lg shadow-brand-500/25">
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="glass p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Agency / Unlimited</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">\$29</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">For marketing agencies managing multiple client brands.</p>
                <div className="space-y-2 mt-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Client Workspaces</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Priority Global Edge CDN</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated 1-on-1 Support</div>
                </div>
              </div>
              <Link href="/pricing" className="mt-8 text-center py-2.5 rounded-xl glass text-xs font-semibold text-white hover:bg-white/10">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-brand-600 via-accent-600 to-indigo-700 text-center text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Build and Earn Globally?
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto mt-4 leading-relaxed">
            Join the creators and developers building digital assets on <span className="underline font-bold">agentosacademy.com</span>.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/tools/resume-builder"
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-xl hover:scale-105 transition"
            >
              Get Started Right Now (100% Free)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
