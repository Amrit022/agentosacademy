'use client';

import Link from 'next/link';
import { Crown, CheckCircle2, ShieldCheck, X, Zap, ArrowLeft, ExternalLink } from 'lucide-react';
import { getDodoPlan, getDodoCheckoutUrl } from '@/lib/dodo-config';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName?: string;
  featureName?: string;
  tier?: 'pro' | 'agency';
}

export default function ProUpgradeModal({
  isOpen,
  onClose,
  toolName = 'OmniStack AI',
  featureName = 'this feature',
  tier = 'pro'
}: ProUpgradeModalProps) {
  if (!isOpen) return null;

  const isAgency = tier === 'agency';

  return (
    <div 
      className="fixed inset-0 !m-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-2.5 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`w-full max-w-2xl bg-[#0c1020] border ${
          isAgency ? 'border-cyan-500/40 shadow-cyan-500/10' : 'border-amber-500/40 shadow-amber-500/10'
        } rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Mobile/Desktop Header with Clean Back Button */}
        <div className="shrink-0 bg-[#0c1020] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between gap-2 shadow-sm z-20">
          <button 
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-white/10 active:scale-95 cursor-pointer"
            title="Back to tool"
          >
            <ArrowLeft className={`w-4 h-4 ${isAgency ? 'text-cyan-400' : 'text-amber-400'}`} />
            <span>Back</span>
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">
                {isAgency ? 'Agency Unlimited' : 'OmniStack AI Pro'}
              </span>
              <span className={`text-[9px] font-bold ${
                isAgency 
                  ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' 
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              } px-1.5 py-0.5 rounded-full border shrink-0`}>
                {isAgency ? 'Enterprise' : 'Unlock'}
              </span>
            </div>
            <div className={`text-[10px] ${isAgency ? 'text-cyan-300/90' : 'text-amber-300/90'} font-bold truncate`}>
              {isAgency ? '$29/mo or $288/year · Multi-Client Workspaces & White-Label' : '$9/mo or $84/year · 6-in-1 Suite'}
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition shrink-0 border border-white/10 active:scale-95 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Smoothly scrollable without clipping) */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-6 -webkit-overflow-scrolling-touch">
          {/* Header Banner */}
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl ${
              isAgency 
                ? 'bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white shadow-cyan-500/30' 
                : 'bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-amber-500/30'
            } flex items-center justify-center shadow-lg shrink-0`}>
              {isAgency ? <Zap className="w-6 h-6 font-black" /> : <Crown className="w-6 h-6 font-black" />}
            </div>
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                isAgency 
                  ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' 
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              } px-2.5 py-0.5 rounded-full border`}>
                {isAgency ? '⚡ Agency Unlimited Exclusive' : 'OmniStack AI Pro'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isAgency ? 'Unlock Agency Tier ($29/mo or $288/yr)' : 'Unlock Pro ($9/mo or $84/year)'}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className={isAgency ? 'text-cyan-400 font-semibold' : 'text-amber-400 font-semibold'}>{featureName}</strong> is part of <strong className="text-white font-semibold">{isAgency ? 'Agency Unlimited' : 'OmniStack AI Pro'}</strong>. Upgrading unlocks all enterprise capabilities across the complete 6-in-1 suite:
          </p>

          {/* Benefit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {isAgency ? (
              <>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>100% White-Label Client Handoff</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Completely remove all OmniStack AI watermarks, branding, and links from all 6 tools and client exports.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Unlimited Client Workspaces</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Organize deliverables, bio links, short links, and resumes into dedicated separate client accounts.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Custom Domain Mapping for Clients</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Hook up unlimited custom CNAME domains (e.g. links.clientbrand.com, review.clientbrand.com).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Bulk Batch Generation & Full API</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Batch upload CSVs for 1,000+ short links, resumes, or marketing copy with programmatic API endpoints.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated 1-on-1 Slack/WhatsApp Support</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Direct VIP channel to our engineering team with guaranteed priority SLA and custom feature requests.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>12+ Vector Resume Layouts & Colors</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tech Lead, Wall Street, Nordic Luxury, Executive & Creative layouts with 1:1 pixel-perfect vector PDF & ATS exports.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AI Scripts, SEO & Cold Pitching</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Full-length YouTube storyboards, 3,000+ word SEO pillar guides, and multi-touch outbound email campaigns.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>VIP Bio Link Themes & Analytics</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Sunset, Cyberpunk, Emerald & Gold themes, real-time click tracking, custom CNAME domains, and zero watermarks.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Wall of Love Embed Widget</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    1-click embed script for WordPress, Webflow, Shopify, Framer, and custom React sites with zero branding.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Global Payment Gateway · PayPal & Cards</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Accepts PayPal, Visa, MasterCard, and Amex worldwide with 0 paperwork. Includes 14-day 100% money-back guarantee.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {isAgency ? (
              (() => {
                const agencyUrl = getDodoCheckoutUrl('agency', false);
                return agencyUrl ? (
                  <a
                    href={agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-cyan-500/25 font-black text-xs shadow-lg text-center transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Instant Dodo Checkout ($29/mo) ↗</span>
                  </a>
                ) : (
                  <Link 
                    href="/pricing"
                    onClick={onClose}
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-cyan-500/25 font-black text-xs shadow-lg text-center transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Upgrade to Agency Unlimited ($29/mo) ↗</span>
                  </Link>
                );
              })()
            ) : (
              <a
                href={getDodoCheckoutUrl('pro', false) || 'https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-emerald-500/25 font-black text-xs shadow-lg text-center transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>🦤 Instant Card / Apple Pay Checkout ($9/mo) ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link 
              href="/pricing"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>All Payment Options (Cards / PayPal)</span>
            </Link>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Cancel and return to {toolName}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

