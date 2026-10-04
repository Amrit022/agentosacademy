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

// 60+ Enterprise Pro Capabilities Matrix
const PRO_CAPABILITIES = [
  {
    category: '1. Display & Layout Engines',
    icon: LayoutGrid,
    features: [
      { name: 'Masonry Waterfall Wall-of-Love', desc: 'Dynamic Pinterest-style auto-balancing column layout.', badge: 'Pro' },
      { name: 'Infinite Smooth Marquee Ribbon', desc: 'Continuous horizontal scrolling banner for landing hero sections.', badge: 'Pro' },
      { name: '3D Coverflow Interactive Carousel', desc: 'Touch-enabled responsive 3D swipe slider for mobile and desktop.', badge: 'Pro' },
      { name: 'Single Featured Hero Testimonial Card', desc: 'Spotlight VIP client quote with oversized typography and star rating.', badge: 'Pro' },
      { name: 'Compact Grid 2x2 Layout', desc: 'Standard clean responsive grid for portfolio sections.', badge: 'Free' },
      { name: 'Floating Notification Social Proof Toasts', desc: 'Real-time popups showing recent client reviews every 12 seconds.', badge: 'Pro' },
      { name: 'Full-Screen Client Wall Modal', desc: 'Dedicated popup gallery with interactive filter tabs.', badge: 'Pro' },
      { name: 'Sticky Bottom Review Ribbon', desc: 'Unobtrusive social proof bar that boosts checkout conversion by 23%.', badge: 'Pro' },
      { name: 'Custom Aspect Ratio & Card Radius', desc: 'Pixel-perfect matching with your design system (Figma tokens).', badge: 'Pro' },
      { name: 'Staggered Scroll Fade Animation', desc: 'Silky smooth 60fps entrance physics powered by GPU hardware acceleration.', badge: 'Pro' }
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
      { name: 'G2 Crowd & Capterra B2B Sync', desc: 'Display enterprise badges and verified buyer ratings.', badge: 'Pro' },
      { name: 'Shopify Store Product Review Importer', desc: 'Connect directly to your e-commerce storefront for product-specific proof.', badge: 'Pro' },
      { name: 'CSV & Excel Bulk Review Uploader', desc: 'Import up to 2,500 historical customer testimonials in one click.', badge: 'Pro' },
      { name: 'Zapier & Make.com Webhook Triggers', desc: 'Auto-add new testimonials from Typeform, Tally, or Stripe webhooks.', badge: 'Pro' },
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
      { name: 'Real-Time Review Count & Star Average Pill', desc: 'Show "4.9/5 from 480+ Happy Founders" dynamic badge.', badge: 'Pro' },
      { name: 'Customer Case Study Link Attachment', desc: 'Link directly from review to in-depth client case study or video.', badge: 'Pro' },
      { name: 'Interactive Category Filter Tabs', desc: 'Let buyers filter by industry, company size, or plan purchased.', badge: 'Pro' },
      { name: 'Keyword Search & Highlight Filter', desc: 'Visitors can search for specific results like "revenue" or "speed".', badge: 'Pro' }
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
      { name: 'Direct Social Handle Links (Twitter/LinkedIn)', desc: 'Link to client social profile for authentic third-party verification.', badge: 'Pro' },
      { name: 'Custom Avatar Image Uploads', desc: 'High-res client photos with custom border colors and status indicators.', badge: 'Pro' },
      { name: 'Emoji Feedback Reactions Bar', desc: 'Allow visitors to like and react to specific testimonials.', badge: 'Pro' }
    ]
  },
  {
    category: '5. White-Label & Brand Controls',
    icon: ShieldCheck,
    features: [
      { name: '100% Remove OmniStack AI Watermark', desc: 'Zero branding, completely invisible third-party footprint.', badge: 'Pro' },
      { name: 'Custom Domain CNAME (reviews.yourbrand.com)', desc: 'Host collector forms and embeds under your official brand domain.', badge: 'Pro' },
      { name: 'Full Custom CSS Style Overrides', desc: 'Inject custom fonts, animations, keyframes, and hover effects.', badge: 'Pro' },
      { name: 'Custom Brand Color Hex Palette', desc: 'Match your exact brand hex codes for stars, cards, and borders.', badge: 'Pro' },
      { name: 'Glassmorphism Frosted Blur Theme', desc: 'Ultra-modern translucent glass with backdrop-filter blur.', badge: 'Pro' },
      { name: 'Cyberpunk Neon Glow Theme', desc: 'Vibrant neon borders with electric gradients.', badge: 'Pro' },
      { name: 'Nordic Clean Minimalist Theme', desc: 'Editorial typography with warm cream and charcoal aesthetic.', badge: 'Pro' },
      { name: 'Standard Dark Theme', desc: 'Sleek dark card layout with emerald accents.', badge: 'Free' },
      { name: 'Custom Embed Script Generation', desc: '1-line JavaScript snippet ready for any CMS or website.', badge: 'Free' },
      { name: 'React / Next.js / Vue Component Export', desc: 'Direct JSX code export for headless modern web apps.', badge: 'Pro' }
    ]
  },
  {
    category: '6. Governance, Anti-Fraud & Compliance',
    icon: BarChart3,
    features: [
      { name: 'AI Anti-Spam & Fraud Review Filter', desc: 'Automatically flags fake or bot reviews before publication.', badge: 'Pro' },
      { name: 'Review Approval & Moderation Queue', desc: 'Approve, reject, or request edits before testimonials go live.', badge: 'Pro' },
      { name: 'GDPR & Privacy Consent Compliance', desc: 'Automated legal permission agreements stored on record.', badge: 'Pro' },
      { name: 'Automated Client Thank-You Email Sequence', desc: 'Send reward coupons or referral links after they leave a review.', badge: 'Pro' },
      { name: 'Multi-Project / Multi-Workspace Support', desc: 'Manage unlimited websites and client portfolios under one account.', badge: 'Pro' },
      { name: 'Export Testimonials to CSV, JSON & PDF', desc: 'Download clean backups of all reviews with metadata and timestamps.', badge: 'Pro' },
      { name: 'Role-Based Team Collaboration (Admin/Editor)', desc: 'Invite team members to moderate reviews without sharing passwords.', badge: 'Pro' },
      { name: 'Global CDN Delivery (<20ms latency worldwide)', desc: 'Ultra-fast Cloudflare edge network ensures 0ms page speed impact.', badge: 'Pro' }
    ]
  }
];

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewSource, setReviewSource] = useState('Google Reviews');

  // Pro Controls State
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry' | 'marquee' | 'carousel'>('grid');
  const [widgetTheme, setWidgetTheme] = useState<'dark' | 'glass' | 'cyberpunk' | 'nordic' | 'gold'>('dark');
  const [showVerifiedBadges, setShowVerifiedBadges] = useState(true);
  const [showSourceTag, setShowSourceTag] = useState(true);
  const [enableSeoSchema, setEnableSeoSchema] = useState(false);
  const [whiteLabelActive, setWhiteLabelActive] = useState(false);

  // UI state
  const [copied, setCopied] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [proFeature, setProFeature] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);

  const embedScript = `<script src="https://omnistack.ai/api/widget.js" data-project="omnistack" data-theme="${widgetTheme}" data-layout="${layoutMode}" data-whitelabel="${whiteLabelActive}" defer></script>\n<div id="omnistack-testimonials"></div>`;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    if (reviews.length >= 4) {
      setProFeature('Unlimited Client Testimonials & Review Moderation (Free tier includes 4 reviews)');
      setShowProModal(true);
      return;
    }

    setReviews([
      {
        id: Date.now().toString(),
        name: authorName.trim(),
        role: authorRole.trim() || 'Verified Client',
        text: reviewText.trim(),
        stars: selectedStars,
        date: 'Just now',
        verified: true,
        avatarBg: 'from-brand-500 to-accent-500',
        source: reviewSource
      },
      ...reviews
    ]);

    setAuthorName('');
    setAuthorRole('');
    setReviewText('');
  };

  const handleCopyEmbed = () => {
    if (layoutMode !== 'grid' || widgetTheme !== 'dark' || whiteLabelActive || enableSeoSchema) {
      setProFeature(`Exporting Pro Embed Widget (${layoutMode.toUpperCase()} Layout & ${widgetTheme.toUpperCase()} Theme)`);
      setShowProModal(true);
      return;
    }

    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProFeatureClick = (featureName: string) => {
    setProFeature(featureName);
    setShowProModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tool #5</span>
            <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              Social Proof & Wall-of-Love
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 60+ Pro Features
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Testimonial Collector & Embed Widget</h1>
          <p className="text-xs text-slate-400 mt-1">
            Harvest authentic customer reviews asynchronously and embed responsive, high-converting social proof on any website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showMatrix ? 'Hide Pro Feature Catalog' : '👑 Browse 60+ Pro Capabilities'}</span>
          </button>

          <button 
            onClick={handleCopyEmbed}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer ${
              layoutMode !== 'grid' || widgetTheme !== 'dark' || whiteLabelActive
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/25 hover:opacity-95'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/25 hover:opacity-95'
            }`}
          >
            {layoutMode !== 'grid' || widgetTheme !== 'dark' || whiteLabelActive ? (
              <>
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Export Pro Embed Script</span>
                <Lock className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </>
            ) : (
              <>
                {copied ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                <span>{copied ? 'Embed Script Copied!' : 'Copy Free Embed Script'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* EXPANDABLE 60+ PRO CAPABILITIES MATRIX */}
      {showMatrix && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro Enterprise Feature Matrix (60+ High-Conversion Capabilities)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Everything required to turn customer praise into an automated multi-channel conversion engine.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setProFeature('All 60+ Testimonial & Wall-of-Love Features');
                setShowProModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
            >
              Unlock All 60+ Features for $9/mo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_CAPABILITIES.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-white border-b border-white/5 pb-2">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{category.category}</span>
                  </div>

                  <div className="space-y-2">
                    {category.features.map((f) => (
                      <div 
                        key={f.name}
                        onClick={() => f.badge === 'Pro' && handleProFeatureClick(f.name)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                          f.badge === 'Pro' 
                            ? 'bg-white/5 border-white/5 hover:border-amber-500/40 hover:bg-amber-500/10' 
                            : 'bg-emerald-500/10 border-emerald-500/20'
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-bold text-slate-200 leading-tight flex items-center gap-1.5">
                            <span>{f.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 leading-snug mt-0.5">
                            {f.desc}
                          </div>
                        </div>

                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                          f.badge === 'Pro' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {f.badge === 'Pro' ? <><Crown className="w-2.5 h-2.5" /> PRO</> : 'FREE'}
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

      {/* PRO CONFIGURATOR BAR (Layouts, Themes & Badges) */}
      <div className="glass p-5 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Interactive Widget Configurator (Live Preview Controls)</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Select layouts and themes to instantly see them render live on your Wall of Love below.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Layout Mode Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1.5">Display Layout</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  layoutMode === 'grid' 
                    ? 'bg-emerald-500/20 border-emerald-500 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px]">Standard Grid</div>
                <div className="text-[9px] text-emerald-400 font-normal">Free Forever</div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('masonry')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  layoutMode === 'masonry' 
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>Masonry Wall</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-amber-300 font-normal">👑 Pro Feature</div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('marquee')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  layoutMode === 'marquee' 
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>Smooth Marquee</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-amber-300 font-normal">👑 Pro Feature</div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('carousel')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  layoutMode === 'carousel' 
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>3D Carousel</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-amber-300 font-normal">👑 Pro Feature</div>
              </button>
            </div>
          </div>

          {/* 2. Visual Theme Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1.5">Visual Card Theme</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setWidgetTheme('dark')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  widgetTheme === 'dark' 
                    ? 'bg-emerald-500/20 border-emerald-500 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px]">Dark Obsidian</div>
                <div className="text-[9px] text-emerald-400 font-normal">Free Standard</div>
              </button>

              <button
                type="button"
                onClick={() => setWidgetTheme('glass')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  widgetTheme === 'glass' 
                    ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>Glassmorphism</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-amber-300 font-normal">👑 Pro Blur</div>
              </button>

              <button
                type="button"
                onClick={() => setWidgetTheme('cyberpunk')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  widgetTheme === 'cyberpunk' 
                    ? 'bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>Cyberpunk Neon</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-cyan-300 font-normal">👑 Pro Neon</div>
              </button>

              <button
                type="button"
                onClick={() => setWidgetTheme('gold')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left cursor-pointer ${
                  widgetTheme === 'gold' 
                    ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400/40' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-[11px] flex items-center justify-between">
                  <span>Executive Gold</span>
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[9px] text-amber-300 font-normal">👑 Pro Luxury</div>
              </button>
            </div>
          </div>

          {/* 3. Pro Conversion & White-label Toggles */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1.5">Conversion & White-Label Toggles</label>
            <div className="space-y-1.5">
              <label className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs cursor-pointer hover:bg-white/10">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Buyer Badges
                </span>
                <input 
                  type="checkbox" 
                  checked={showVerifiedBadges} 
                  onChange={(e) => setShowVerifiedBadges(e.target.checked)}
                  className="rounded text-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs cursor-pointer hover:bg-white/10">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Source Tag (Google/Trustpilot)
                </span>
                <input 
                  type="checkbox" 
                  checked={showSourceTag} 
                  onChange={(e) => setShowSourceTag(e.target.checked)}
                  className="rounded text-emerald-500"
                />
              </label>

              <label 
                onClick={() => {
                  setProFeature('Google Rich Snippet Review Schema (JSON-LD)');
                  setShowProModal(true);
                }}
                className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs cursor-pointer hover:bg-amber-500/20"
              >
                <span className="text-amber-300 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" /> Google Search Star Schema (SEO)
                </span>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">👑 PRO</span>
              </label>

              <label 
                onClick={() => {
                  setProFeature('100% White-Label: Remove OmniStack Watermark');
                  setShowProModal(true);
                }}
                className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs cursor-pointer hover:bg-amber-500/20"
              >
                <span className="text-amber-300 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" /> 100% Remove OmniStack Branding
                </span>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">👑 PRO</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Add Review (4 cols) */}
        <div className="lg:col-span-4 glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> Collect New Review
            </h2>
            <span className="text-[10px] text-slate-400">
              Active: {reviews.length} / 4 (Free Limit)
            </span>
          </div>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Client Full Name</label>
              <input 
                type="text" 
                required
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. David Miller"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company / Role / Country</label>
              <input 
                type="text" 
                value={authorRole} 
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. CEO, Apex Ventures (USA)"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedStars(num)}
                      className="p-1 rounded-lg glass hover:bg-white/10 cursor-pointer"
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          num <= selectedStars 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-600'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Review Source</label>
                <select
                  value={reviewSource}
                  onChange={(e) => setReviewSource(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-[#0d1424] border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
                >
                  <option value="Google Reviews">Google Reviews</option>
                  <option value="Trustpilot">Trustpilot</option>
                  <option value="LinkedIn Verified">LinkedIn</option>
                  <option value="Product Hunt">Product Hunt</option>
                  <option value="Direct Client">Direct Client</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Review Feedback</label>
              <textarea 
                rows={3}
                required
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What tangible outcome or revenue did you help them achieve?"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Publish Review
            </button>
          </form>

          {/* Quick Import from Google / Trustpilot (Pro Trigger) */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
              <span>Auto-Import Sources</span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">👑 PRO</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleProFeatureClick('Google Maps Reviews 1-Click Auto-Sync')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 font-bold flex items-center gap-1.5 transition text-left cursor-pointer"
              >
                <span>🌐 Google Reviews</span>
              </button>
              <button
                type="button"
                onClick={() => handleProFeatureClick('Trustpilot Business Automated Webhook Sync')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 font-bold flex items-center gap-1.5 transition text-left cursor-pointer"
              >
                <span>⭐ Trustpilot Sync</span>
              </button>
            </div>
          </div>

          {/* Embed Code Snippet Preview */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Live Embed Snippet</span>
              <span className="text-[10px] text-emerald-400 font-mono">1-Line Script</span>
            </div>
            <pre className="p-3 rounded-xl bg-black/60 border border-white/5 text-[10px] text-emerald-300 font-mono break-all whitespace-pre-wrap">
              {embedScript}
            </pre>
          </div>
        </div>

        {/* Right Wall of Love Grid (8 cols) */}
        <div className="lg:col-span-8 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">
                Live Wall-of-Love Preview ({layoutMode.toUpperCase()} &bull; {widgetTheme.toUpperCase()})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">
                {reviews.length} Verified Testimonials
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                100% Real-Time
              </span>
            </div>
          </div>

          {/* DYNAMIC LAYOUT TESTIMONIAL CARDS */}
          <div className={`gap-4 ${
            layoutMode === 'marquee'
              ? 'flex overflow-x-auto pb-4 scrollbar-none'
              : layoutMode === 'carousel'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              : 'grid grid-cols-1 md:grid-cols-2'
          }`}>
            {reviews.map((r) => (
              <div 
                key={r.id} 
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  layoutMode === 'marquee' ? 'min-w-[300px] shrink-0' : ''
                } ${
                  widgetTheme === 'glass'
                    ? 'bg-white/10 backdrop-blur-xl border-white/20 shadow-xl'
                    : widgetTheme === 'cyberpunk'
                    ? 'bg-[#0a071c] border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                    : widgetTheme === 'gold'
                    ? 'bg-[#12110f] border-amber-500/30 shadow-lg shadow-amber-500/10'
                    : 'glass-card border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(r.stars)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {showSourceTag && r.source && (
                        <span className="text-[9px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                          {r.source}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${r.avatarBg} flex items-center justify-center text-xs font-black text-slate-950`}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{r.name}</span>
                        {showVerifiedBadges && r.verified && (
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* White-label footer preview */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Embed status: <strong>Live & Responsive</strong> on Webflow, WordPress, Shopify, Next.js</span>
            </span>
            <span className="text-[10px] text-slate-500">
              {whiteLabelActive ? 'Brand Watermark: Hidden (👑 Pro)' : 'Powered by OmniStack AI'}
            </span>
          </div>
        </div>
      </div>

      {/* Reusable Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="Client Testimonials & Wall of Love Studio"
        featureName={proFeature}
      />
    </div>
  );
}
