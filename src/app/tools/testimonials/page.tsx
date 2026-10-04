'use client';

import { useState } from 'react';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  Star,
  Lock,
  Crown, 
  MessageSquareQuote, 
  Copy, 
  Check, 
  Plus, 
  Code, 
  Eye, 
  Sparkles, 
  Filter, 
  BadgeCheck,
  LayoutGrid,
  SlidersHorizontal,
  Layers,
  Video,
  Globe,
  ShieldCheck,
  TrendingUp,
  Palette,
  Share2,
  Zap,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Flame,
  MousePointerClick
} from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  date: string;
  verified: boolean;
  avatarBg: string;
  source?: string;
  videoUrl?: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Growth Lead, SaaSForge (San Francisco, USA)',
    text: 'OmniStack AI replaced 3 separate tools for our team. The ATS resume builder alone helped our candidates score interview invitations at Stripe, Linear, and Vercel.',
    stars: 5,
    date: '2 days ago',
    verified: true,
    avatarBg: 'from-blue-500 to-indigo-500',
    source: 'Google Reviews'
  },
  {
    id: '2',
    name: 'Rohan Sharma',
    role: 'Senior Cloud Consultant (Toronto, Canada)',
    text: 'Using the Bio Link and Email Signature tools gave my consulting practice an instant executive finish. Closed two overseas contracts worth $3,800 this month.',
    stars: 5,
    date: '1 week ago',
    verified: true,
    avatarBg: 'from-purple-500 to-pink-500',
    source: 'LinkedIn Verified'
  },
  {
    id: '3',
    name: 'Marcus Vance',
    role: 'Founder, NextScale Media (London, UK)',
    text: 'The embed code took literally 30 seconds to paste into Webflow. Cleanest Wall-of-Love review widget on the market with zero intrusive watermarks.',
    stars: 5,
    date: '2 weeks ago',
    verified: true,
    avatarBg: 'from-emerald-500 to-teal-500',
    source: 'Product Hunt'
  },
  {
    id: '4',
    name: 'Elena Rostova',
    role: 'Product Designer (Berlin, Germany)',
    text: 'I used the AI Content Generator to draft our entire launch campaign on Product Hunt. The tone was sharp, persuasive, and completely nailed our value proposition.',
    stars: 5,
    date: '3 weeks ago',
    verified: true,
    avatarBg: 'from-amber-500 to-rose-500',
    source: 'Trustpilot'
  },
];

// 50+ Capabilities Matrix
const PRO_CAPABILITIES = [
  {
    category: '1. Display & Layout Engines',
    icon: LayoutGrid,
    features: [
      { name: 'Masonry Waterfall Wall-of-Love', desc: 'Dynamic Pinterest-style auto-balancing column layout.', badge: 'Free' },
      { name: 'Compact Grid 2x2 Layout', desc: 'Standard clean responsive grid for portfolio sections.', badge: 'Free' },
      { name: 'Infinite Smooth Marquee Ribbon', desc: 'Continuous horizontal scrolling banner for landing hero sections.', badge: 'Pro' },
      { name: '3D Coverflow Interactive Carousel', desc: 'Touch-enabled responsive 3D swipe slider for mobile and desktop.', badge: 'Pro' },
      { name: 'Floating Notification Social Proof Toasts', desc: 'Real-time popups showing recent client reviews every 12 seconds.', badge: 'Pro' },
      { name: 'Sticky Bottom Review Ribbon', desc: 'Unobtrusive social proof bar that boosts checkout conversion by 23%.', badge: 'Pro' },
      { name: 'Full-Screen Client Wall Modal', desc: 'Dedicated popup gallery with interactive filter tabs.', badge: 'Pro' },
      { name: 'Agency Multi-Brand Portfolio Hub', desc: 'Unified portal grouping client reviews by company department.', badge: 'Agency' }
    ]
  },
  {
    category: '2. Auto-Import & Integrations',
    icon: Globe,
    features: [
      { name: 'Google Maps Business Reviews Auto-Sync', desc: 'Sync verified 5-star Google reviews with live star rating score.', badge: 'Pro' },
      { name: 'Trustpilot Automated Feed Importer', desc: 'Fetch verified Trustpilot reviews via webhook or direct API sync.', badge: 'Pro' },
      { name: 'Twitter / X Post & Thread Embedder', desc: 'Render authentic tweets directly inside your review grid.', badge: 'Pro' },
      { name: 'Product Hunt Upvote & Review Sync', desc: 'Showcase authentic praise from your launch day community.', badge: 'Pro' },
      { name: 'LinkedIn Recommendations Importer', desc: 'Import professional recommendations with verified profile badges.', badge: 'Pro' },
      { name: 'CSV & Excel Bulk Review Uploader', desc: 'Import up to 2,500 historical customer testimonials in one click.', badge: 'Pro' },
      { name: 'Manual Review Submission Form', desc: 'Submit and publish text reviews directly through the editor.', badge: 'Free' }
    ]
  },
  {
    category: '3. CRO & Conversion Boosters',
    icon: TrendingUp,
    features: [
      { name: 'Google Rich Snippet Review Schema (JSON-LD)', desc: 'Displays golden review stars directly in Google organic search results.', badge: 'Pro' },
      { name: 'Exit-Intent Social Proof Overlay', desc: 'Triggers top customer reviews when visitors move mouse to leave.', badge: 'Pro' },
      { name: 'Checkout Page High-Trust Widget', desc: 'Compact social proof ribbon optimized for Stripe/PayPal payment flows.', badge: 'Pro' },
      { name: 'Verified Buyer Trust Badges', desc: 'Display cryptographic verification and confirmed purchase tags.', badge: 'Pro' },
      { name: 'Click-Through-Rate (CTR) Heatmap Tracker', desc: 'See which testimonials drive the highest sales conversion.', badge: 'Pro' },
      { name: 'Review Sentiment AI Tagging', desc: 'Gemini AI automatically tags reviews (Speed, Quality, ROI, Support).', badge: 'Pro' },
      { name: 'Interactive Category Filter Tabs', desc: 'Let buyers filter by industry, company size, or plan purchased.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Media & Rich Video Proof',
    icon: Video,
    features: [
      { name: 'HD Video Testimonial Player with Subtitles', desc: 'Stream video testimonials directly in-browser with zero latency.', badge: 'Pro' },
      { name: 'One-Click Customer Video Recording Portal', desc: 'Send a link where clients record 60-second video testimonials from phone.', badge: 'Pro' },
      { name: 'Audio Voice Note Playback', desc: 'Let customers speak their feedback with custom audio waveform player.', badge: 'Pro' },
      { name: 'Before / After Image Slider Attachment', desc: 'Showcase visual transformation proof for design and fitness agencies.', badge: 'Pro' },
      { name: 'Client Company Logo Watermark', desc: 'Render monochrome or full-color logos of top brands you worked with.', badge: 'Pro' },
      { name: 'Custom Avatar Image Uploads', desc: 'High-res client photos with custom border colors and status indicators.', badge: 'Pro' }
    ]
  },
  {
    category: '5. White-Label & Card Visual Themes',
    icon: ShieldCheck,
    features: [
      { name: 'Glassmorphism Frosted Blur Theme', desc: 'Ultra-modern translucent glass with backdrop-filter blur.', badge: 'Free' },
      { name: 'Clean White Minimalist Card Theme', desc: 'Crisp light mode aesthetic suited for lifestyle websites.', badge: 'Free' },
      { name: 'Cyberpunk Neon Glow Theme', desc: 'Vibrant neon borders with electric gradients.', badge: 'Pro' },
      { name: 'Emerald Verified Trust Theme', desc: 'Deep botanical greens with verified buyer checkmark styling.', badge: 'Pro' },
      { name: 'Nordic Clean Minimalist Theme', desc: 'Editorial typography with warm cream and charcoal aesthetic.', badge: 'Pro' },
      { name: 'Champagne Metallic Gold Theme', desc: 'Executive luxury gold palette with fine hairline borders.', badge: 'Pro' },
      { name: '100% Remove OmniStack AI Watermark', desc: 'Zero branding, completely invisible third-party footprint.', badge: 'Agency' },
      { name: 'Agency Custom Brand Hex & CSS Override', desc: 'Inject custom fonts, animations, keyframes, and hover effects.', badge: 'Agency' }
    ]
  },
  {
    category: '6. Governance, Anti-Fraud & Compliance',
    icon: BarChart3,
    features: [
      { name: 'AI Anti-Spam & Fraud Review Filter', desc: 'Automatically flags fake or bot reviews before publication.', badge: 'Pro' },
      { name: 'Review Approval & Moderation Queue', desc: 'Approve, reject, or request edits before testimonials go live.', badge: 'Pro' },
      { name: 'GDPR & Privacy Consent Compliance', desc: 'Automated legal permission agreements stored on record.', badge: 'Pro' },
      { name: 'Export Testimonials to CSV, JSON & PDF', desc: 'Download clean backups of all reviews with metadata and timestamps.', badge: 'Pro' },
      { name: 'Global CDN Delivery (<20ms latency worldwide)', desc: 'Ultra-fast Cloudflare edge network ensures 0ms page speed impact.', badge: 'Pro' },
      { name: 'Standard Embed Script Generator', desc: '1-line JavaScript snippet ready for Webflow, Framer, WordPress, and Shopify.', badge: 'Free' }
    ]
  },
  {
    category: '7. Agency Unlimited Multi-Brand Enterprise Hub',
    icon: Zap,
    features: [
      { name: 'Multi-Client Brand Workspaces (50+ Sites)', desc: 'Organize reviews and collection forms under isolated client accounts.', badge: 'Agency' },
      { name: '100% White-Label (No OmniStack Links)', desc: 'Zero branding or links anywhere in the embed widget.', badge: 'Agency' },
      { name: 'Custom CNAME Embed Host (reviews.client.com)', desc: 'Serve embed assets entirely from your agency or client domain.', badge: 'Agency' },
      { name: 'Automated Webhooks to Slack & Discord', desc: 'Receive instant notifications when clients submit praise.', badge: 'Agency' },
      { name: 'Unlimited 4K Video Testimonial Storage', desc: 'Store high-bitrate customer recordings without video bandwidth limits.', badge: 'Agency' },
      { name: 'Client Co-Branded Collection Portals', desc: 'Send review request forms featuring your agency and client logos.', badge: 'Agency' },
      { name: 'VIP Direct Slack Channel Support', desc: 'Priority onboarding and custom widget tuning from our engineering team.', badge: 'Agency' }
    ]
  }
];

export type TestimonialLayout = 'grid' | 'masonry' | 'marquee' | 'carousel' | 'toasts' | 'ribbon' | 'modal' | 'agencyHub';
export type TestimonialTheme = 'dark' | 'clean' | 'glass' | 'cyberpunk' | 'emerald' | 'nordic' | 'gold' | 'agencyBrand';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewSource, setReviewSource] = useState('Google Reviews');

  // Pro Controls State
  const [layoutMode, setLayoutMode] = useState<TestimonialLayout>('grid');
  const [widgetTheme, setWidgetTheme] = useState<TestimonialTheme>('dark');
  const [showVerifiedBadges, setShowVerifiedBadges] = useState(true);
  const [showSourceTag, setShowSourceTag] = useState(true);
  const [enableSeoSchema, setEnableSeoSchema] = useState(false);
  const [whiteLabelActive, setWhiteLabelActive] = useState(false);

  // UI state
  const [copied, setCopied] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [proModalTier, setProModalTier] = useState<'pro' | 'agency'>('pro');
  const [proFeature, setProFeature] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);

  const isProLayout = ['marquee', 'carousel', 'toasts', 'ribbon', 'modal'].includes(layoutMode);
  const isAgencyLayout = layoutMode === 'agencyHub';
  const isLockedLayout = isProLayout || isAgencyLayout;

  const isProTheme = ['glass', 'cyberpunk', 'emerald', 'nordic', 'gold'].includes(widgetTheme);
  const isAgencyTheme = widgetTheme === 'agencyBrand';
  const isLockedTheme = isProTheme || isAgencyTheme;

  const embedScript = `<script src="https://omnistack.ai/api/widget.js" data-project="omnistack" data-theme="${widgetTheme}" data-layout="${layoutMode}" data-whitelabel="${whiteLabelActive}" defer></script>\n<div id="omnistack-testimonials"></div>`;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newReview: ReviewItem = {
      id: Date.now().toString(),
      name: authorName.trim(),
      role: authorRole.trim() || 'Client Partner',
      text: reviewText.trim(),
      stars: selectedStars,
      date: 'Just now',
      verified: true,
      avatarBg: 'from-blue-600 to-indigo-600',
      source: reviewSource
    };

    setReviews([newReview, ...reviews]);
    setAuthorName('');
    setAuthorRole('');
    setReviewText('');
  };

  const handleCopyEmbed = () => {
    if (isLockedLayout || isLockedTheme || whiteLabelActive) {
      setProModalTier(isAgencyLayout || isAgencyTheme || whiteLabelActive ? 'agency' : 'pro');
      setProFeature(`Publishing with Premium Configuration (${layoutMode.toUpperCase()} / ${widgetTheme.toUpperCase()})`);
      setShowProModal(true);
      return;
    }
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeatureClick = (badge?: string, name?: string) => {
    if (badge === 'Free') return;
    setProModalTier(badge === 'Agency' ? 'agency' : 'pro');
    if (name) setProFeature(name);
    setShowProModal(true);
  };

  const handleSelectLayout = (l: TestimonialLayout, tier: 'Free' | 'Pro' | 'Agency') => {
    setLayoutMode(l);
    if (tier !== 'Free') {
      setProModalTier(tier === 'Agency' ? 'agency' : 'pro');
    }
  };

  const handleSelectTheme = (t: TestimonialTheme, tier: 'Free' | 'Pro' | 'Agency') => {
    setWidgetTheme(t);
    if (tier !== 'Free') {
      setProModalTier(tier === 'Agency' ? 'agency' : 'pro');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tool #5</span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full font-bold">
              Senja & Testimonial.to Alternative
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 8 Layouts · 8 Themes · 50+ Capabilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Wall of Love & Review Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Collect, curate, and embed high-converting client reviews with zero revenue share or intrusive platform branding.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showMatrix ? 'Hide Capabilities' : '👑 Browse 50+ Capabilities'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyEmbed}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              isLockedLayout || isLockedTheme || whiteLabelActive
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/25 hover:opacity-95'
            }`}
          >
            {isLockedLayout || isLockedTheme || whiteLabelActive ? <Lock className="w-4 h-4 text-amber-400" /> : copied ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            <span>{isLockedLayout || isLockedTheme || whiteLabelActive ? 'Copy Embed (🔒 Locked)' : copied ? 'Copied Embed Code!' : 'Copy Embed Script'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE 50+ PRO & AGENCY CAPABILITIES MATRIX */}
      {showMatrix && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro & Agency Social Proof Infrastructure (50+ Advanced Tools)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                From video testimonial collection to Google rich review schema, automated review sync, and multi-client brand workspaces.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setProModalTier('pro');
                  setShowProModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                👑 Pro ($9/mo)
              </button>
              <button
                type="button"
                onClick={() => {
                  setProModalTier('agency');
                  setShowProModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                ⚡ Agency ($29/mo)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_CAPABILITIES.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="text-xs font-black text-white border-b border-white/5 pb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{category.category}</span>
                  </div>

                  <div className="space-y-2">
                    {category.features.map((f) => (
                      <div 
                        key={f.name}
                        onClick={() => handleFeatureClick(f.badge, f.name)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                          f.badge === 'Agency'
                            ? 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/15'
                            : f.badge === 'Pro' 
                              ? 'bg-white/5 border-white/5 hover:border-amber-500/40 hover:bg-amber-500/10' 
                              : 'bg-emerald-500/10 border-emerald-500/20'
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-bold text-slate-200 leading-tight">
                            {f.name}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-snug mt-0.5">
                            {f.desc}
                          </div>
                        </div>

                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-0.5 ${
                          f.badge === 'Agency'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : f.badge === 'Pro' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {f.badge === 'Agency' ? <><Zap className="w-2.5 h-2.5" /> AGENCY</> : f.badge === 'Pro' ? <><Crown className="w-2.5 h-2.5" /> PRO</> : 'FREE'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pro & Agency Add-ons Badges (Image 1 style) */}
      <div className="glass p-4 rounded-2xl border border-white/10 space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold mr-1">👑 Pro Add-ons:</span>
          {[
            'Video Testimonials (Loom / MP4)',
            '1-Click Embed Script',
            'Source Badges (G2 / PH)',
            'Public Collection Form',
            'AI Sentiment Filter'
          ].map((addon) => (
            <button
              key={addon}
              type="button"
              onClick={() => handleFeatureClick('Pro', addon)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Crown className="w-2.5 h-2.5 text-amber-400" />
              <span>{addon}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1 border-t border-white/5">
          <span className="text-cyan-400 font-semibold mr-1">⚡ Agency Only:</span>
          {[
            '100% White-Label',
            'Multi-Client Workspaces',
            'Custom CNAME Embed Host',
            'Webhook CRM Sync',
            'Unlimited 4K Video Storage'
          ].map((agencyAddon) => (
            <button
              key={agencyAddon}
              type="button"
              onClick={() => handleFeatureClick('Agency', agencyAddon)}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Zap className="w-2.5 h-2.5 text-cyan-400" />
              <span>{agencyAddon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layout & Visual Theme Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Layout Modes */}
        <div className="glass p-5 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-amber-400" />
              <span>Display Layout Mode (8 Modes):</span>
            </label>
            <span className="text-[10px] text-amber-300 font-semibold">2 Free · 5 Pro · 1 Agency</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'grid', label: '2x2 Grid', tier: 'Free' as const },
              { id: 'masonry', label: '3-Col Masonry', tier: 'Free' as const },
              { id: 'marquee', label: 'Infinite Marquee', tier: 'Pro' as const },
              { id: 'carousel', label: '3D Carousel', tier: 'Pro' as const },
              { id: 'toasts', label: 'Social Toasts', tier: 'Pro' as const },
              { id: 'ribbon', label: 'Bottom Ribbon', tier: 'Pro' as const },
              { id: 'modal', label: 'Wall Modal', tier: 'Pro' as const },
              { id: 'agencyHub', label: 'Agency Hub', tier: 'Agency' as const }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectLayout(m.id as TestimonialLayout, m.tier)}
                className={`p-2 rounded-xl text-left border text-xs font-bold transition flex flex-col justify-between gap-1 cursor-pointer ${
                  layoutMode === m.id
                    ? m.tier === 'Agency'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white'
                      : m.tier === 'Pro'
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'glass text-slate-300 border-white/5 hover:text-white'
                }`}
              >
                <span className={`text-[8px] font-black uppercase ${
                  m.tier === 'Agency' ? 'text-cyan-300' : m.tier === 'Pro' ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {m.tier === 'Agency' ? '⚡' : m.tier === 'Pro' ? '🔒' : 'FREE'}
                </span>
                <span className="text-[11px] truncate">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Visual Themes */}
        <div className="glass p-5 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Card Visual Theme (8 Themes):</span>
            </label>
            <span className="text-[10px] text-amber-300 font-semibold">2 Free · 5 Pro · 1 Agency</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'dark', label: 'Glass Dark', tier: 'Free' as const },
              { id: 'clean', label: 'Clean White', tier: 'Free' as const },
              { id: 'glass', label: 'Frosted Glass', tier: 'Pro' as const },
              { id: 'cyberpunk', label: 'Cyber Neon', tier: 'Pro' as const },
              { id: 'emerald', label: 'Emerald Trust', tier: 'Pro' as const },
              { id: 'nordic', label: 'Nordic Luxury', tier: 'Pro' as const },
              { id: 'gold', label: 'Champagne Gold', tier: 'Pro' as const },
              { id: 'agencyBrand', label: 'Agency Brand', tier: 'Agency' as const }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTheme(t.id as TestimonialTheme, t.tier)}
                className={`p-2 rounded-xl text-left border text-xs font-bold transition flex flex-col justify-between gap-1 cursor-pointer ${
                  widgetTheme === t.id
                    ? t.tier === 'Agency'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white'
                      : t.tier === 'Pro'
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'bg-purple-600/30 border-purple-500 text-white'
                    : 'glass text-slate-300 border-white/5 hover:text-white'
                }`}
              >
                <span className={`text-[8px] font-black uppercase ${
                  t.tier === 'Agency' ? 'text-cyan-300' : t.tier === 'Pro' ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {t.tier === 'Agency' ? '⚡' : t.tier === 'Pro' ? '🔒' : 'FREE'}
                </span>
                <span className="text-[11px] truncate">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Customer Review</span>
          </h2>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Full Name</label>
              <input 
                type="text" 
                required
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Michael Jordan"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Client Title & Company</label>
              <input 
                type="text" 
                value={authorRole} 
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. CTO at Horizon Robotics (London, UK)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Testimonial Quote / Feedback</label>
              <textarea 
                rows={3}
                required
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What specific outcome or revenue lift did your service achieve for this client?"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 leading-relaxed font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedStars(star)}
                      className="cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${star <= selectedStars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Verified Source Tag</label>
                <select
                  value={reviewSource}
                  onChange={(e) => setReviewSource(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-medium cursor-pointer"
                >
                  <option value="Google Reviews" className="bg-slate-900">Google Reviews</option>
                  <option value="Product Hunt" className="bg-slate-900">Product Hunt</option>
                  <option value="Trustpilot" className="bg-slate-900">Trustpilot</option>
                  <option value="LinkedIn Verified" className="bg-slate-900">LinkedIn</option>
                  <option value="G2 Verified" className="bg-slate-900">G2 Crowd</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Review to Wall
            </button>
          </form>
        </div>

        {/* Right: Live Wall Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Wall Preview ({reviews.length} Verified Reviews)
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">100% Responsive</span>
            </div>

            {/* Testimonials Wall Simulation */}
            <div className={`p-4 rounded-2xl border transition-all ${
              widgetTheme === 'clean' 
                ? 'bg-slate-100 border-slate-300' 
                : widgetTheme === 'glass'
                  ? 'bg-white/5 backdrop-blur-xl border-white/20'
                  : widgetTheme === 'cyberpunk'
                    ? 'bg-[#0a051b] border-cyan-500/40 shadow-cyan-500/10'
                    : widgetTheme === 'emerald'
                      ? 'bg-[#041a17] border-emerald-500/40'
                      : widgetTheme === 'nordic'
                        ? 'bg-[#fafaf8] border-stone-300'
                        : widgetTheme === 'gold'
                          ? 'bg-[#0f0e0c] border-amber-500/40'
                          : widgetTheme === 'agencyBrand'
                            ? 'bg-[#090b14] border-cyan-400/50'
                            : 'bg-black/40 border-white/5'
            }`}>
              <div className={`grid gap-3.5 ${
                layoutMode === 'masonry' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
              }`}>
                {reviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      widgetTheme === 'clean' || widgetTheme === 'nordic'
                        ? 'bg-white text-slate-900 border-slate-200 shadow-sm'
                        : 'bg-white/5 text-white border-white/10'
                    }`}
                  >
                    <div>
                      {/* Rating Stars & Source */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.stars)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        {showSourceTag && rev.source && (
                          <span className="text-[9px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {rev.source}
                          </span>
                        )}
                      </div>

                      <p className={`text-xs leading-relaxed ${
                        widgetTheme === 'clean' || widgetTheme === 'nordic' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center gap-2.5 pt-3 mt-3 border-t border-white/10">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {rev.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-bold truncate flex items-center gap-1 ${
                          widgetTheme === 'clean' || widgetTheme === 'nordic' ? 'text-slate-900' : 'text-white'
                        }`}>
                          <span>{rev.name}</span>
                          {showVerifiedBadges && <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embed Code Display */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">Embed Snippet (Ready to Paste):</span>
                <button
                  type="button"
                  onClick={handleCopyEmbed}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-cyan-300 font-mono overflow-x-auto p-2 bg-black/40 rounded-xl">
                {embedScript}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Pro/Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="Wall of Love & Review Studio"
        featureName={proFeature}
        tier={proModalTier}
      />
    </div>
  );
}
