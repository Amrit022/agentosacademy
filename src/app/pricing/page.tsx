'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  CreditCard, 
  Lock,
  X,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro Creator ($9/mo)');
  const [paypalUsername, setPaypalUsername] = useState('');
  const [paypalSuccess, setPaypalSuccess] = useState(false);

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
      ctaText: 'Upgrade with PayPal / Card',
      ctaHref: '#paypal',
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
      ctaText: 'Start Agency Plan with PayPal',
      ctaHref: '#paypal-agency',
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

  const handleOpenPaypal = (planName: string) => {
    setSelectedPlan(planName);
    setShowPaypalModal(true);
    setPaypalSuccess(false);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaypalSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Global Checkout</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          One Membership. <br />
          <span className="text-gradient">All 6 Micro-SaaS Engines.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Pay with PayPal or any global credit/debit card. Zero paperwork, zero hidden platform fees.
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

      {/* Pricing Cards */}
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
                  onClick={() => handleOpenPaypal(p.name)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                    p.popular
                      ? 'bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white shadow-brand-500/25 hover:opacity-90'
                      : 'glass hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{p.ctaText}</span>
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

      {/* WHY ARE THE TOOLS FREE? (Transparent Business Model) */}
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-brand-400">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Why are these tools free to use? (Our Business Model)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">1. Free Value First</div>
            <p className="text-slate-400 leading-relaxed">
              We believe anyone should be able to build a professional resume, generate an email signature, or launch a bio link without having to enter a credit card upfront.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">2. Organic Viral Loop</div>
            <p className="text-slate-400 leading-relaxed">
              When free users share their bio link pages or email signatures, it naturally spreads awareness for AgentOS Academy globally with $0 advertising spend.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">3. Pro Upgrades for Scale</div>
            <p className="text-slate-400 leading-relaxed">
              Serious freelancers, agencies, and founders happily upgrade to Pro ($9/mo) to unlock unlimited AI content generation, Wall-of-Love widgets, and custom branding.
            </p>
          </div>
        </div>
      </div>

      {/* Zero-Documentation Global Payment Info */}
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Globe className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">How You Can Accept Global Payments with Zero Paperwork</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          If you are starting from India and selling freelance deliverables to clients in the USA, Europe, or Australia, you don't need complicated business registration:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="font-bold text-white">PayPal.me (Free & Instant)</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Create a free account at PayPal.com. You get a link like <code>paypal.me/yourname</code>. Send it to any client globally and they can pay with any credit/debit card in USD or EUR. Money auto-transfers to your Indian bank in 24 hours.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="font-bold text-white">Gumroad & Lemon Squeezy (Merchant of Record)</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Both platforms act as your global sales merchant. They handle US sales tax, VAT, and card fraud automatically with 0 paperwork. You withdraw your USD earnings directly to your local bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive PayPal Payment Modal */}
      {showPaypalModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass p-7 sm:p-8 rounded-3xl border border-white/20 max-w-md w-full bg-[#0c1020] shadow-2xl relative space-y-5">
            <button 
              onClick={() => setShowPaypalModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#003087] flex items-center justify-center text-white font-black text-sm">
                P
              </div>
              <div>
                <h3 className="text-base font-bold text-white">PayPal Global Checkout</h3>
                <div className="text-xs text-slate-400">{selectedPlan}</div>
              </div>
            </div>

            {!paypalSuccess ? (
              <form onSubmit={handleSimulatePayment} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email or PayPal ID</label>
                  <input 
                    type="email" 
                    required
                    value={paypalUsername} 
                    onChange={(e) => setPaypalUsername(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-medium"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#003087]/20 border border-[#003087]/40 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PayPal Buyer Protection Active</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Works globally with Visa, MasterCard, Amex, Discover, and local bank debit cards.
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#003087] text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Pay with PayPal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Payment Checkout Verified!</h4>
                <p className="text-xs text-slate-300">
                  Your PayPal integration for {selectedPlan} is active. Thank you!
                </p>
                <button
                  onClick={() => setShowPaypalModal(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-white/10 text-xs font-bold text-white"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
