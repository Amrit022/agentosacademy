'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  Link2,
  Lock,
  Crown, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone, 
  Eye, 
  BarChart2, 
  Palette, 
  Shuffle,
  DollarSign,
  Zap,
  Layers,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Share2,
  SlidersHorizontal,
  ShieldCheck,
  Video,
  Mail,
  Target
} from 'lucide-react';

const SAMPLE_LINK_PRESETS = [
  [
    { id: '1', title: '💼 Hire Me for Custom Development ($60/hr)', url: 'https://upwork.com', icon: '💻', clicks: 1420 },
    { id: '2', title: '📄 Download My ATS Tech Resume (PDF)', url: '/tools/resume-builder', icon: '📄', clicks: 980 },
    { id: '3', title: '🎥 Watch My System Architecture Tutorials', url: 'https://youtube.com', icon: '🎥', clicks: 610 },
    { id: '4', title: '☕ Support My Work via PayPal / Coffee', url: 'https://paypal.me', icon: '☕', clicks: 310 },
  ],
  [
    { id: '1', title: '🎨 Explore My Figma UI/UX Design Portfolio', url: 'https://dribbble.com', icon: '🎨', clicks: 2150 },
    { id: '2', title: '📅 Book a 30-Min Discovery Call', url: 'https://cal.com', icon: '📅', clicks: 1120 },
    { id: '3', title: '⭐ Client Wall-of-Love Reviews', url: '/tools/testimonials', icon: '⭐', clicks: 740 },
    { id: '4', title: '💌 Subscribe to My Design Substack', url: 'https://substack.com', icon: '💌', clicks: 490 },
  ],
  [
    { id: '1', title: '📈 Read My B2B SaaS Growth Playbook', url: 'https://linkedin.com', icon: '📈', clicks: 3400 },
    { id: '2', title: '🚀 Micro-SaaS Content Generator Engine', url: '/tools/content-writer', icon: '🚀', clicks: 1820 },
    { id: '3', title: '🔗 Branded Link Analytics Dashboard', url: '/tools/url-shortener', icon: '🔗', clicks: 920 },
    { id: '4', title: '💳 Send Global USD Payments (PayPal)', url: 'https://paypal.me', icon: '💳', clicks: 530 },
  ]
];

export type BioTheme = 
  | 'midnight' | 'minimal' | 'daylight' | 'monochrome'
  | 'sunset' | 'emerald' | 'cyberpunk' | 'gold' | 'velvet' | 'tokyo'
  | 'agencyHex' | 'dynamicMotion';

export type BioLayout = 'stack' | 'grid2' | 'bento' | 'carousel' | 'agencyHub';

// 50+ Capabilities Matrix
const PRO_BIO_CAPABILITIES = [
  {
    category: '1. Visual Themes & Design Styling Engine',
    features: [
      { name: 'Midnight Cyber Dark Theme', desc: 'Sleek dark violet background with glowing neon highlights.', badge: 'Free' },
      { name: 'Obsidian Minimalist Theme', desc: 'Understated matte dark slate designed for high contrast.', badge: 'Free' },
      { name: 'Clean Daylight White Theme', desc: 'Crisp light mode aesthetic suited for lifestyle creators.', badge: 'Free' },
      { name: 'Modern Monochrome High-Contrast', desc: 'Timeless black & white architectural styling.', badge: 'Free' },
      { name: 'Sunset Neon Gradient (VIP)', desc: 'Warm violet-to-pink gradient inspired by California skies.', badge: 'Pro' },
      { name: 'Emerald Glassmorphism (VIP)', desc: 'Translucent glass layers over deep emerald botanical darks.', badge: 'Pro' },
      { name: 'Cyberpunk Tokyo Glow (VIP)', desc: 'High-energy acid-lime and cyan laser accents.', badge: 'Pro' },
      { name: 'Nordic Gold Metallic (VIP)', desc: 'Executive luxury champagne gold with fine hairline borders.', badge: 'Pro' },
      { name: 'Velvet Aura Royalty (VIP)', desc: 'Opulent deep purple and magenta luxury styling.', badge: 'Pro' },
      { name: 'Dynamic Video Motion Loop Background', desc: 'Silent streaming video loop behind your profile buttons.', badge: 'Agency' },
      { name: 'Agency Custom Brand Hex & CSS Override', desc: 'Direct CSS injection for 100% brand guideline match.', badge: 'Agency' }
    ]
  },
  {
    category: '2. Button Layouts & Interactive Widgets',
    features: [
      { name: 'Classic Vertical Stack', desc: 'Full-width high-converting mobile buttons.', badge: 'Free' },
      { name: '2-Column Compact Grid', desc: 'Dense 2x2 layout suited for stores and multi-product links.', badge: 'Free' },
      { name: 'Bento Box Dynamic Grid', desc: 'Modern Apple-style mixed small and large featured tiles.', badge: 'Pro' },
      { name: 'Interactive Swipe Carousel', desc: 'Horizontal swipe cards for portfolio screenshots.', badge: 'Pro' },
      { name: 'Agency Multi-Tier Categorized Hub', desc: 'Collapsible accordions separating links into distinct client departments.', badge: 'Agency' },
      { name: 'Animated Pulsing Spotlight Link', desc: 'Draws 3x more eyes to your highest-value offer.', badge: 'Pro' },
      { name: 'Schedule Link Active Windows', desc: 'Auto-publish and expire links at specific launch dates.', badge: 'Pro' }
    ]
  },
  {
    category: '3. Lead Generation, Forms & Payments',
    features: [
      { name: '1-Click PayPal / Stripe Tip Jar & Pay', desc: 'Collect USD coffee tips or client retainers with zero platform cut.', badge: 'Free' },
      { name: 'Embedded Email / Newsletter Signup Form', desc: 'Collect subscriber leads directly into Mailchimp, ConvertKit or Beehiiv.', badge: 'Pro' },
      { name: 'Calendar Booking Modal (Cal.com / Calendly)', desc: 'Visitors book 15-min discovery calls without leaving your bio page.', badge: 'Pro' },
      { name: 'Digital Download Gated Link (PDF/Zip)', desc: 'Visitors unlock file download in exchange for their email address.', badge: 'Pro' },
      { name: 'SMS & WhatsApp Direct Chat Button', desc: '1-tap to start customer support conversation.', badge: 'Pro' },
      { name: 'Password Protected VIP Gated Content', desc: 'Restrict premium link access to paying community members.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Media Streaming & Social Audio',
    features: [
      { name: 'YouTube / Vimeo Video Player Embed', desc: 'Stream video teasers directly on page without redirecting.', badge: 'Pro' },
      { name: 'Spotify / Apple Music Track Player', desc: 'Play your latest single or podcast episode right on page.', badge: 'Pro' },
      { name: 'SoundCloud & Podbean Audio Feed', desc: 'Embedded audio waveform player with background streaming.', badge: 'Pro' },
      { name: 'Substack & Medium Article Previews', desc: 'Dynamic rich preview cards pulling your latest written articles.', badge: 'Pro' },
      { name: 'NFT & Web3 Crypto Wallet Address Pill', desc: '1-click copy ENS / Solana wallet address for web3 creators.', badge: 'Pro' }
    ]
  },
  {
    category: '5. Tracking Pixels, UTM & Attribution',
    features: [
      { name: 'Meta Pixel (Facebook/Instagram Ads)', desc: 'Track page view and button click events for retargeting campaigns.', badge: 'Pro' },
      { name: 'Google Tag Manager & GA4 Integration', desc: 'Capture detailed user journey events across your analytics dashboard.', badge: 'Pro' },
      { name: 'TikTok & Pinterest Ad Pixel Tracking', desc: 'Retarget visitors who arrived from short-form video ads.', badge: 'Pro' },
      { name: 'Custom UTM Parameter Tagging', desc: 'Automatically append source, medium, and campaign to outbound clicks.', badge: 'Pro' },
      { name: 'Link-Level Click Analytics & CTR Heatmap', desc: 'Identify which button generates highest revenue.', badge: 'Pro' },
      { name: 'Referrer Traffic Source Breakdown', desc: 'See whether visitors came from TikTok, Instagram, Twitter or Email.', badge: 'Pro' }
    ]
  },
  {
    category: '6. Custom Domains & Vanity SEO',
    features: [
      { name: 'Custom Domain CNAME (links.yourbrand.com)', desc: 'Host your bio link entirely under your official brand domain.', badge: 'Pro' },
      { name: 'Custom Open Graph Meta Title & Banner', desc: 'Customize the preview thumbnail shown when shared on Twitter/iMessage.', badge: 'Pro' },
      { name: 'Custom Browser Favicon Upload', desc: 'Display your company icon in browser tabs instead of OmniStack.', badge: 'Pro' },
      { name: 'Search Engine Indexing Control (noindex toggle)', desc: 'Keep secret client portfolios private from Google searches.', badge: 'Pro' },
      { name: 'Free Subdomain (omnistack.ai/u/yourhandle)', desc: 'Instant live vanity link accessible globally.', badge: 'Free' }
    ]
  },
  {
    category: '7. Agency Unlimited Multi-Client Studio',
    features: [
      { name: '100% White-Label (Remove omnistack.ai Watermark)', desc: 'Completely unbranded footer with optional "Powered by YourAgency" credit.', badge: 'Agency' },
      { name: 'Multi-Client Workspaces (Manage 25+ Creator Accounts)', desc: 'Organize rosters, clients, and talent under isolated client sub-accounts.', badge: 'Agency' },
      { name: 'Unlimited Custom CNAME Brand Domains (10+ Domains)', desc: 'Connect unique client domains without paying per-seat add-on fees.', badge: 'Agency' },
      { name: 'White-Label PDF Traffic & ROI Reports', desc: 'Auto-generate monthly click performance summaries with client branding.', badge: 'Agency' },
      { name: 'Full REST API & Webhook Dispatchers', desc: 'Programmatically create, update, and sync links with client CMS databases.', badge: 'Agency' },
      { name: 'Role-Based Client Access (View-Only / Edit)', desc: 'Invite clients to manage their own buttons without touching agency settings.', badge: 'Agency' },
      { name: 'VIP Direct Slack Channel Support', desc: 'Priority onboarding and custom CSS assistance from our development team.', badge: 'Agency' }
    ]
  }
];

export default function BioLinkPage() {
  const [handle, setHandle] = useState('elenarostova');
  const [displayName, setDisplayName] = useState('Elena Rostova');
  const [bio, setBio] = useState('Product Designer & Design Systems Lead. Building user-centered interfaces for global startups 🇩🇪 🌍');
  const [theme, setTheme] = useState<BioTheme>('midnight');
  const [layout, setLayout] = useState<BioLayout>('stack');
  const [activeTab, setActiveTab] = useState<'editor' | 'analytics'>('editor');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [presetIndex, setPresetIndex] = useState(0);
  
  const [links, setLinks] = useState(SAMPLE_LINK_PRESETS[0]);
  const [copied, setCopied] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [proModalTier, setProModalTier] = useState<'pro' | 'agency'>('pro');
  const [proFeature, setProFeature] = useState('');
  const [showCapabilities, setShowCapabilities] = useState(false);

  const totalClicks = links.reduce((acc, curr) => acc + curr.clicks, 0);

  const isProTheme = ['sunset', 'emerald', 'cyberpunk', 'gold', 'velvet', 'tokyo'].includes(theme);
  const isAgencyTheme = ['agencyHex', 'dynamicMotion'].includes(theme);
  const isLockedTheme = isProTheme || isAgencyTheme;

  const isProLayout = ['bento', 'carousel'].includes(layout);
  const isAgencyLayout = layout === 'agencyHub';
  const isLockedLayout = isProLayout || isAgencyLayout;

  const handleFeatureClick = (badge?: string) => {
    if (badge === 'Free') return;
    setProModalTier(badge === 'Agency' ? 'agency' : 'pro');
    setShowProModal(true);
  };

  const handleSelectTheme = (t: BioTheme) => {
    setTheme(t);
    if (['agencyHex', 'dynamicMotion'].includes(t)) {
      setProModalTier('agency');
    } else if (['sunset', 'emerald', 'cyberpunk', 'gold', 'velvet', 'tokyo'].includes(t)) {
      setProModalTier('pro');
    }
  };

  const handleSelectLayout = (l: BioLayout) => {
    setLayout(l);
    if (l === 'agencyHub') {
      setProModalTier('agency');
    } else if (['bento', 'carousel'].includes(l)) {
      setProModalTier('pro');
    }
  };

  const loadPreset = () => {
    const next = (presetIndex + 1) % SAMPLE_LINK_PRESETS.length;
    setPresetIndex(next);
    setLinks(SAMPLE_LINK_PRESETS[next]);
    if (next === 0) {
      setHandle('alexdev');
      setDisplayName('Alex Rivera');
      setBio('Full Stack SaaS Architect & Product Engineer. Shipping modern web apps and micro-tools globally 🚀');
    } else if (next === 1) {
      setHandle('elenadesign');
      setDisplayName('Elena Rostova');
      setBio('Lead Product Designer & Design Systems Specialist. Creating sleek fintech apps in Berlin 🇩🇪');
    } else {
      setHandle('priyagrowth');
      setDisplayName('Priya Sharma');
      setBio('Head of Organic Growth & Content Strategy. Scaling B2B SaaS pipelines to $5M+ ARR 🌍');
    }
  };

  const addLink = () => {
    if (links.length >= 3) {
      setProFeature('Unlimited Bio Link Buttons (Free tier includes 3 links)');
      setProModalTier('pro');
      setShowProModal(true);
      return;
    }
    setLinks([
      ...links,
      { 
        id: Date.now().toString(), 
        title: 'New Featured Deliverable', 
        url: 'https://', 
        icon: '🔗', 
        clicks: 0
      }
    ]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const copyUrl = () => {
    if (isLockedTheme || isLockedLayout) {
      setProModalTier(isAgencyTheme || isAgencyLayout ? 'agency' : 'pro');
      setProFeature(`Publishing with Premium Configuration (${theme.toUpperCase()})`);
      setShowProModal(true);
      return;
    }
    navigator.clipboard.writeText(`https://omnistack.ai/u/${handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tool #2</span>
            <span className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full font-bold">
              Linktree & Beacons Alternative
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 12 Themes · 5 Layouts · 50+ Capabilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Bio Link Page Creator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Host your customized, zero-commission portfolio link under <strong className="text-white">omnistack.ai/u/{handle}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowCapabilities(!showCapabilities)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showCapabilities ? 'Hide 50+ Capabilities' : '👑 Browse 50+ Capabilities'}</span>
          </button>

          <button
            type="button"
            onClick={loadPreset}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Sample Creator</span>
          </button>

          <button 
            type="button"
            onClick={copyUrl}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              isLockedTheme || isLockedLayout
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:opacity-90'
            }`}
          >
            {isLockedTheme || isLockedLayout ? <Lock className="w-4 h-4 text-amber-400" /> : copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{isLockedTheme || isLockedLayout ? 'Publish (🔒 Locked)' : copied ? 'Copied Bio URL!' : 'Copy Public Bio URL'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE 50+ PRO & AGENCY CAPABILITIES MATRIX */}
      {showCapabilities && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro & Agency Bio Link Infrastructure (50+ Advanced Capabilities)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                From high-converting VIP theme aesthetics to pixel retargeting, CNAME domains, and multi-client workspaces.
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
            {PRO_BIO_CAPABILITIES.map((category) => (
              <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="text-xs font-black text-white border-b border-white/5 pb-2">
                  {category.category}
                </div>

                <div className="space-y-2">
                  {category.features.map((f) => (
                    <div 
                      key={f.name}
                      onClick={() => handleFeatureClick(f.badge)}
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
            ))}
          </div>
        </div>
      )}

      {/* Editor & Analytics Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'editor' 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Page Builder & Buttons</span>
        </button>
        <button
          onClick={() => {
            setProFeature('Real-Time Traffic & Click Analytics');
            setProModalTier('pro');
            setShowProModal(true);
          }}
          className="glass text-slate-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Traffic & Click Analytics (🔒 Pro)</span>
        </button>
      </div>

      {/* Mobile / Tablet Toggle between Builder & Phone Preview */}
      {activeTab === 'editor' && (
        <div className="lg:hidden flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl mb-2">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'editor'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Page Builder & Links</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'preview'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone Preview</span>
          </button>
        </div>
      )}

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (7 cols) */}
          <div className={`lg:col-span-7 glass p-5 sm:p-8 rounded-3xl border border-white/10 space-y-6 ${
            mobileView === 'preview' ? 'hidden lg:block' : 'block'
          }`}>
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="w-4 h-4 text-purple-400" /> Page Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Custom Handle</label>
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-400">
                  <span>/u/</span>
                  <input 
                    type="text" 
                    value={handle} 
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    className="bg-transparent text-white outline-none font-bold ml-1 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Bio Tagline</label>
              <textarea 
                rows={2} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500 font-sans"
              />
            </div>

            {/* Visual Theme Selector (12 Themes: 4 Free · 6 Pro · 2 Agency) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-400" />
                  <span>Visual Theme (12 Themes: 4 Free · 6 Pro · 2 Agency)</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setProModalTier('pro');
                    setShowProModal(true);
                  }}
                  className="text-[10px] text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  👑 VIP Themes
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {[
                  { id: 'midnight', name: 'Midnight Cyber', tier: 'Free' },
                  { id: 'minimal', name: 'Obsidian Matte', tier: 'Free' },
                  { id: 'daylight', name: 'Daylight White', tier: 'Free' },
                  { id: 'monochrome', name: 'Monochrome', tier: 'Free' },
                  { id: 'sunset', name: 'Sunset Neon', tier: 'Pro' },
                  { id: 'emerald', name: 'Emerald Glass', tier: 'Pro' },
                  { id: 'cyberpunk', name: 'Cyberpunk Glow', tier: 'Pro' },
                  { id: 'gold', name: 'Nordic Gold', tier: 'Pro' },
                  { id: 'velvet', name: 'Velvet Royalty', tier: 'Pro' },
                  { id: 'tokyo', name: 'Tokyo Acid', tier: 'Pro' },
                  { id: 'agencyHex', name: 'Custom Brand HEX', tier: 'Agency' },
                  { id: 'dynamicMotion', name: 'Video Motion Loop', tier: 'Agency' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTheme(t.id as BioTheme)}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                      theme === t.id
                        ? t.tier === 'Agency'
                          ? 'bg-cyan-500/30 border-cyan-400 text-white ring-1 ring-cyan-400'
                          : t.tier === 'Pro'
                            ? 'bg-amber-500/30 border-amber-400 text-white ring-1 ring-amber-400'
                            : 'bg-purple-600/30 border-purple-500 text-white ring-1 ring-purple-500'
                        : 'glass text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`text-[9px] font-extrabold uppercase tracking-wider ${
                      t.tier === 'Agency' ? 'text-cyan-300' : t.tier === 'Pro' ? 'text-amber-300' : 'text-emerald-300'
                    }`}>
                      {t.tier === 'Agency' ? '⚡ Agency' : t.tier === 'Pro' ? '👑 Pro' : 'Free'}
                    </div>
                    <div className="text-[11px] truncate mt-0.5">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Button Layout Styles (5 Styles) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Button Layout Style (5 Styles)</span>
                </label>
                <span className="text-[10px] text-slate-400">2 Free · 2 Pro · 1 Agency</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {[
                  { id: 'stack', label: 'Classic Stack', tier: 'Free' },
                  { id: 'grid2', label: '2-Col Grid', tier: 'Free' },
                  { id: 'bento', label: 'Bento Grid', tier: 'Pro' },
                  { id: 'carousel', label: 'Swipe Cards', tier: 'Pro' },
                  { id: 'agencyHub', label: 'Agency Hub', tier: 'Agency' }
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleSelectLayout(l.id as BioLayout)}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                      layout === l.id
                        ? l.tier === 'Agency'
                          ? 'bg-cyan-500/30 border-cyan-400 text-white'
                          : l.tier === 'Pro'
                            ? 'bg-amber-500/30 border-amber-400 text-white'
                            : 'bg-purple-600/30 border-purple-500 text-white'
                        : 'glass text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`text-[9px] font-extrabold uppercase ${
                      l.tier === 'Agency' ? 'text-cyan-300' : l.tier === 'Pro' ? 'text-amber-300' : 'text-emerald-300'
                    }`}>
                      {l.tier === 'Agency' ? '⚡ Agency' : l.tier === 'Pro' ? '👑 Pro' : 'Free'}
                    </div>
                    <div className="text-[11px] truncate mt-0.5">{l.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pro & Agency Add-ons Badges (Image 1 style) */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold mr-1">👑 Pro Add-ons:</span>
                {[
                  'Unlimited Links',
                  'Custom Domain (CNAME)',
                  'Meta Pixel Retargeting',
                  'Email / Lead Capture',
                  'Media Audio & Video Embed',
                  'Custom CSS Theming'
                ].map((addon) => (
                  <button
                    key={addon}
                    type="button"
                    onClick={() => handleFeatureClick('Pro')}
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
                  'Custom Favicon & Meta Tags',
                  '10+ CNAME Domains',
                  'Full REST API & Webhooks'
                ].map((agencyAddon) => (
                  <button
                    key={agencyAddon}
                    type="button"
                    onClick={() => handleFeatureClick('Agency')}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <Zap className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{agencyAddon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Link Items */}
            <div>
              <div className="flex items-center justify-between mb-3 border-t border-white/5 pt-4">
                <label className="text-xs font-bold text-slate-200">Active Links ({links.length})</label>
                <button 
                  type="button"
                  onClick={addLink} 
                  className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Link Button
                </button>
              </div>

              <div className="space-y-3">
                {links.map((link, idx) => (
                  <div key={link.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <input
                      type="text"
                      value={link.icon}
                      onChange={(e) => {
                        const next = [...links];
                        next[idx].icon = e.target.value;
                        setLinks(next);
                      }}
                      className="w-10 text-center py-1.5 rounded-lg bg-white/5 text-base border border-white/10 outline-none"
                      title="Emoji Icon"
                    />

                    <div className="flex-1 space-y-1.5">
                      <input 
                        type="text" 
                        value={link.title}
                        onChange={(e) => {
                          const next = [...links];
                          next[idx].title = e.target.value;
                          setLinks(next);
                        }}
                        className="w-full text-xs font-bold text-white bg-transparent outline-none"
                        placeholder="Link Label"
                      />
                      <input 
                        type="text" 
                        value={link.url}
                        onChange={(e) => {
                          const next = [...links];
                          next[idx].url = e.target.value;
                          setLinks(next);
                        }}
                        className="w-full text-[11px] text-slate-400 bg-transparent outline-none font-mono"
                        placeholder="https://"
                      />
                    </div>

                    <div className="text-right flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{link.clicks} clicks</span>
                      <button 
                        type="button"
                        onClick={() => removeLink(link.id)} 
                        className="text-slate-500 hover:text-rose-400 p-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Live Mobile Phone Simulation (5 cols) */}
          <div className={`lg:col-span-5 flex flex-col items-center lg:sticky lg:top-28 ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <span>Live Interactive Mobile Preview ({theme.toUpperCase()})</span>
            </div>

            {/* Mobile Device Mockup */}
            <div className={`w-full max-w-[340px] rounded-[44px] sm:rounded-[50px] p-3.5 sm:p-4 border-[5px] sm:border-[6px] shadow-2xl relative min-h-[580px] sm:min-h-[620px] flex flex-col justify-between transition-all ${
              theme === 'sunset'
                ? 'bg-gradient-to-b from-[#2a0845] to-[#6441a5] border-pink-500/40'
                : theme === 'emerald'
                ? 'bg-gradient-to-b from-[#062925] to-[#041a17] border-emerald-500/40'
                : theme === 'cyberpunk'
                ? 'bg-gradient-to-b from-[#0a051b] via-[#12072b] to-[#1a0a3a] border-cyan-500/40 shadow-cyan-500/10'
                : theme === 'gold'
                ? 'bg-gradient-to-b from-[#0b0c10] via-[#121318] to-[#1f1d19] border-amber-500/50 shadow-amber-500/10'
                : theme === 'velvet'
                ? 'bg-gradient-to-b from-[#230735] via-[#1b052a] to-[#0f0219] border-fuchsia-500/40'
                : theme === 'tokyo'
                ? 'bg-gradient-to-b from-[#021b10] via-[#04131a] to-[#020b08] border-emerald-400/40'
                : theme === 'agencyHex'
                ? 'bg-[#090b14] border-cyan-400/50 ring-1 ring-cyan-500/40'
                : theme === 'dynamicMotion'
                ? 'bg-gradient-to-br from-[#120c2b] via-[#210936] to-[#0a1826] border-purple-400/40 animate-pulse'
                : theme === 'daylight'
                ? 'bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] border-slate-300 text-slate-900'
                : theme === 'monochrome'
                ? 'bg-[#000000] border-white/30'
                : theme === 'minimal'
                ? 'bg-[#0f1117] border-slate-800'
                : 'bg-[#0a0c18] border-slate-800'
            }`}>
              {/* Dynamic island bar */}
              <div className="w-32 h-5 bg-black/60 rounded-full mx-auto mb-6" />

              {/* Profile Header */}
              <div className="text-center space-y-3 px-3">
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-black shadow-xl border-2 ${
                  theme === 'gold' 
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-amber-500/30' 
                    : theme === 'cyberpunk'
                    ? 'bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white border-cyan-300 shadow-cyan-500/30'
                    : theme === 'daylight'
                    ? 'bg-slate-900 text-white border-slate-700'
                    : theme === 'agencyHex'
                    ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white border-cyan-300'
                    : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white border-white/20 shadow-purple-500/30'
                }`}>
                  {displayName.charAt(0)}
                </div>
                <div>
                  <h3 className={`text-base font-black tracking-tight ${theme === 'daylight' ? 'text-slate-900' : 'text-white'}`}>{displayName}</h3>
                  <div className={`text-[11px] font-bold mt-0.5 ${
                    theme === 'gold' 
                      ? 'text-amber-400' 
                      : theme === 'cyberpunk' 
                        ? 'text-cyan-400' 
                        : theme === 'daylight' 
                          ? 'text-indigo-600'
                          : theme === 'agencyHex'
                            ? 'text-cyan-400'
                            : 'text-purple-300'
                  }`}>
                    @{handle}
                  </div>
                </div>
                <p className={`text-[11px] leading-relaxed px-2 font-medium ${theme === 'daylight' ? 'text-slate-600' : 'text-slate-200'}`}>{bio}</p>
              </div>

              {/* Links Stack or Grid */}
              <div className={`my-6 px-1 ${layout === 'grid2' ? 'grid grid-cols-2 gap-2' : 'space-y-3'}`}>
                {links.map((l) => (
                  <a
                    key={l.id}
                    href={l.url}
                    target={l.url.startsWith('/') ? '_self' : '_blank'}
                    rel="noreferrer"
                    className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between text-xs font-bold transition-all shadow-md group ${
                      theme === 'sunset'
                        ? 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:scale-105'
                        : theme === 'emerald'
                        ? 'bg-emerald-950/80 text-emerald-100 border border-emerald-500/30 hover:border-emerald-400'
                        : theme === 'cyberpunk'
                        ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-400/40 hover:border-fuchsia-400 hover:shadow-cyan-500/20 shadow-md'
                        : theme === 'gold'
                        ? 'bg-amber-950/40 text-amber-100 border border-amber-500/30 hover:border-amber-400 hover:shadow-amber-500/20 shadow-md'
                        : theme === 'velvet'
                        ? 'bg-fuchsia-950/60 text-fuchsia-100 border border-fuchsia-500/40 hover:border-fuchsia-300'
                        : theme === 'tokyo'
                        ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-400/40 hover:border-cyan-300'
                        : theme === 'agencyHex'
                        ? 'bg-cyan-950/60 text-cyan-100 border border-cyan-400/40 hover:border-cyan-200'
                        : theme === 'daylight'
                        ? 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm'
                        : theme === 'monochrome'
                        ? 'bg-white text-black border border-white hover:bg-slate-200'
                        : theme === 'minimal'
                        ? 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                        : 'glass text-white border-white/15 hover:border-purple-400/50 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-sm">{l.icon}</span>
                      <span className="line-clamp-1">{l.title}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>

              {/* Watermark / Agency Footer */}
              <div className={`text-center text-[10px] pb-3 border-t pt-3 font-mono ${
                theme === 'daylight' ? 'text-slate-500 border-slate-300' : 'text-slate-400 border-white/10'
              }`}>
                {isAgencyTheme ? (
                  <span className="text-cyan-400 font-bold">⚡ Powered by {displayName}</span>
                ) : (
                  <span>omnistack.ai/u/{handle}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Analytics View */
        <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass p-5 rounded-2xl border border-white/5">
              <div className="text-xs font-bold text-slate-400">Total Profile Views</div>
              <div className="text-3xl font-black text-white mt-1">4,892</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-bold">+28% this week</div>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/5">
              <div className="text-xs font-bold text-slate-400">Total Outbound Clicks</div>
              <div className="text-3xl font-black text-purple-400 mt-1">{totalClicks}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-bold">57.6% CTR</div>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/5">
              <div className="text-xs font-bold text-slate-400">Top Performing Link</div>
              <div className="text-base font-bold text-emerald-300 mt-1 truncate">{links[0]?.title}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-bold">{links[0]?.clicks} clicks</div>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Pro/Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="Bio Link Page Creator"
        featureName={proFeature}
        tier={proModalTier}
      />
    </div>
  );
}
