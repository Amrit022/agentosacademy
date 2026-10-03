'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Globe, Star, Sparkles, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Tier',
      tagline: 'Ideal for trying out the tools & personal projects.',
      monthlyPrice: '$0',
      annualPrice: '$0',
      period: '/forever',
      badge: 'Free Forever',
      popular: false,
      ctaText: 'Start Building Free',
      ctaHref: '/tools/resume-builder',
      features: [
        'ATS Resume & Cover Letter Builder',
        'Bio Link Page Creator (agentosacademy.com/u/)',
        'HTML Email Signature Generator',
        'Standard URL Shortener + QR Codes',
        'Direct PDF & HTML Exports',
        'Community Discord Support',
      ],
      unavailable: [
        'Custom Domain Mapping for Bio Links',
        'Embeddable Testimonial Collector Widgets',
        'Unlimited AI Content Generation Prompts',
        'Geographic Visitor Analytics',
      ],
    },
    {
      name: 'Pro Creator',
      tagline: 'Engineered for freelancers and digital solopreneurs.',
      monthlyPrice: '$9',
      annualPrice: '$7',
      period: '/month',
      badge: 'Most Popular',
      popular: true,
      ctaText: 'Upgrade to Pro Plan',
      ctaHref: '#checkout',
      features: [
        'All 6 Micro-SaaS Tools Unlocked',
        'Unlimited AI Content & Copy Generation',
        'Wall-of-Love Testimonial Embed Script',
        'White-Label Bio Links (Zero Platform Branding)',
        'Full Geographic Click & Device Analytics',
        'Priority Edge CDN Delivery (<90ms globally)',
        'Commercial Usage Rights for Client Deliverables',
      ],
      unavailable: [],
    },
    {
      name: 'Agency Unlimited',
      tagline: 'For boutique agencies managing multiple client brands.',
      monthlyPrice: '$29',
      annualPrice: '$24',
      period: '/month',
      badge: 'Power Agency',
      popular: false,
      ctaText: 'Start Agency Plan',
      ctaHref: '#agency',
      features: [
        'Everything in Pro Tier Included',
        'Unlimited Client Workspaces & Sub-Accounts',
        'Custom Domain Mapping for Every Client',
        'Bulk Short Link & QR Code Generation',
        'High-Rate AI Prompt Quotas',
        'Dedicated 1-on-1 Slack/WhatsApp Support',
        'Early Access to Upcoming Micro-Tools',
      ],
      unavailable: [],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          One Membership. <br />
          <span className="text-gradient">All 6 Micro-SaaS Engines.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Say goodbye to paying $190/month across Canva, Jasper, Bitly, and Linktree. Get our full suite with predictable, high-value plans.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl glass border border-white/10 shadow-lg">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                !annual ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                annual ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black">20% OFF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
              p.popular
                ? 'bg-[#0e1428]/95 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 scale-105 z-10'
                : 'glass border border-white/10 hover:border-white/20'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                {p.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">{p.name}</h3>
                {!p.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full glass text-slate-400">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 min-h-[32px]">{p.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {annual ? p.annualPrice : p.monthlyPrice}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {p.period} {annual && p.annualPrice !== '$0' && '(billed annually)'}
                </span>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 mt-8 text-xs">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.popular ? 'text-brand-400' : 'text-emerald-400'}`} />
                    <span>{f}</span>
                  </div>
                ))}
                {p.unavailable?.map((u, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-500 line-through">
                    <span className="w-4 text-center">✕</span>
                    <span>{u}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              {p.ctaHref.startsWith('#') ? (
                <button
                  onClick={() => alert(`Stripe & Razorpay checkout initiated for ${p.name}! Accepting international USD cards and Indian UPI.`)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                    p.popular
                      ? 'bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white shadow-brand-500/25 hover:opacity-90'
                      : 'glass hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href={p.ctaHref}
                  className="block text-center w-full py-3.5 rounded-2xl font-bold text-xs glass hover:bg-white/10 text-white border border-white/10 transition"
                >
                  {p.ctaText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="glass rounded-3xl p-8 max-w-4xl mx-auto border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white">14-Day Money Back Guarantee</div>
            <div className="text-[11px] text-slate-400">Zero hassle refund policy if unsatisfied</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-cyan-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white">Global & Indian Payments</div>
            <div className="text-[11px] text-slate-400">Stripe USD, Credit Cards & Razorpay UPI</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white">Instant Account Activation</div>
            <div className="text-[11px] text-slate-400">No manual setup or waiting periods</div>
          </div>
        </div>
      </div>
    </div>
  );
}
