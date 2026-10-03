'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, ShieldCheck, Globe, Star } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-accent-400">Simple Transparent Pricing</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
          One Membership. <br />
          <span className="text-gradient">All 6 Micro-SaaS Engines.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
          Say goodbye to \$150/month subscription fragmentation. Access our entire suite with predictable, high-value plans.
        </p>

        {/* Monthly / Annual Switcher */}
        <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-2xl glass border border-white/10">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
              !annual ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              annual ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual (20% OFF)</span>
            <span className="bg-emerald-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-extrabold">SAVE</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {/* Tier 1: Free Starter */}
        <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Starter</h3>
            <p className="text-xs text-slate-400 mt-1">Perfect to test the tools and generate outputs.</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">\$0</span>
              <span className="text-xs text-slate-400">/forever</span>
            </div>

            <div className="space-y-3 mt-8 text-xs text-slate-300">
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ATS Resume & PDF Builder</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bio Link Page Creator</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> HTML Email Signature Generator</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> URL Shortener + QR Codes</div>
              <div className="flex items-center gap-2.5 text-slate-500">✕ Custom Domains for Short Links</div>
              <div className="flex items-center gap-2.5 text-slate-500">✕ Embeddable Testimonials Widget</div>
            </div>
          </div>

          <Link
            href="/tools/resume-builder"
            className="mt-10 block text-center py-3 rounded-2xl glass text-xs font-bold text-white hover:bg-white/10 transition"
          >
            Get Started Free
          </Link>
        </div>

        {/* Tier 2: Pro (Featured) */}
        <div className="glass p-8 rounded-3xl border-2 border-brand-500 bg-[#0d1322]/95 flex flex-col justify-between relative shadow-2xl scale-105 z-10">
          <div className="absolute -top-3.5 right-8 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
            Best Value for Creators
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Pro Creator</h3>
            <p className="text-xs text-slate-400 mt-1">For freelancers and agencies servicing global clients.</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">
                {annual ? '\$7' : '\$9'}
              </span>
              <span className="text-xs text-slate-400">/month {annual && '(billed annually)'}</span>
            </div>

            <div className="space-y-3 mt-8 text-xs text-slate-200">
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> <strong>All 6 Micro-SaaS Tools Unlocked</strong></div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Unlimited AI Content & Copy Drafts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Wall-of-Love Testimonial Embed Script</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Branded Bio Links (No Watermarks)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Geographic URL Click Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400" /> Priority Edge CDN Delivery</div>
            </div>
          </div>

          <button
            onClick={() => alert('Stripe & Razorpay payment gateway checkout initiated for Pro Tier!')}
            className="mt-10 w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-extrabold text-xs shadow-xl shadow-brand-500/25 hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <span>Upgrade to Pro Plan</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Agency Unlimited</h3>
            <p className="text-xs text-slate-400 mt-1">For businesses managing multiple client brands.</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">
                {annual ? '\$24' : '\$29'}
              </span>
              <span className="text-xs text-slate-400">/month</span>
            </div>

            <div className="space-y-3 mt-8 text-xs text-slate-300">
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Everything in Pro Tier</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Workspaces & Team Seats</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Domain Mapping for Each Client</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated 1-on-1 WhatsApp/Slack Support</div>
            </div>
          </div>

          <button
            onClick={() => alert('Sales contact requested. Our team will contact you shortly!')}
            className="mt-10 w-full py-3 rounded-2xl glass text-xs font-bold text-white hover:bg-white/10 transition"
          >
            Contact Agency Sales
          </button>
        </div>
      </div>

      {/* Security & Guarantee */}
      <div className="glass rounded-3xl p-8 max-w-4xl mx-auto border border-white/5 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <div className="text-xs font-bold text-white">14-Day Money Back Guarantee</div>
            <div className="text-[11px] text-slate-400">No questions asked refund policy</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-xs font-bold text-white">Global & Indian Payment Ready</div>
            <div className="text-[11px] text-slate-400">Stripe, PayPal, UPI & Credit Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
