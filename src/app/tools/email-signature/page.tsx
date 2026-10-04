'use client';

import { useState } from 'react';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  Mail,
  Lock,
  Crown, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Shuffle, 
  Trash2, 
  Calendar, 
  Phone, 
  Globe,
  Linkedin,
  Twitter,
  Github,
  ShieldCheck,
  Star,
  Award,
  ExternalLink,
  User,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Building2,
  Users
} from 'lucide-react';

interface SignatureStyle {
  id: string;
  name: string;
  badge: 'Free' | 'Pro' | 'Agency';
  description: string;
  category: string;
}

const SIGNATURE_STYLES: SignatureStyle[] = [
  // FREE STYLES
  {
    id: 'classic',
    name: 'Minimal Classic',
    badge: 'Free',
    description: 'Clean left accent border, high ATS & inbox deliverability.',
    category: 'Standard'
  },
  {
    id: 'horizontal',
    name: 'Corporate Horizontal',
    badge: 'Free',
    description: 'Horizontal metadata layout with sleek divider dot bullets.',
    category: 'Corporate'
  },
  {
    id: 'compact',
    name: 'Compact Modern Card',
    badge: 'Free',
    description: 'Minimalist container card with lightweight contact grid.',
    category: 'Modern'
  },
  {
    id: 'mono',
    name: 'Tech Monospace',
    badge: 'Free',
    description: 'Developer and engineer focused ASCII-style terminal layout.',
    category: 'Developer'
  },
  // PRO EXCLUSIVE STYLES
  {
    id: 'executive',
    name: 'Executive Tech Leader',
    badge: 'Pro',
    description: 'Circular photo avatar, blue verified badge, social pills & booking CTA.',
    category: 'Executive'
  },
  {
    id: 'nordic',
    name: 'Nordic Luxury Minimal',
    badge: 'Pro',
    description: 'Editorial serif header, thin hairline border & luxury monochrome aesthetic.',
    category: 'Boutique'
  },
  {
    id: 'wallstreet',
    name: 'Wall Street & Legal',
    badge: 'Pro',
    description: 'Two-column corporate grid, confidentiality disclaimer & compliance seal.',
    category: 'Finance & Law'
  },
  {
    id: 'creative',
    name: 'Creative Agency Neon',
    badge: 'Pro',
    description: 'Vibrant dual-color accent bar, social tags, and interactive calendar pill.',
    category: 'Creative'
  },
  {
    id: 'closer',
    name: 'High-Impact Sales Closer',
    badge: 'Pro',
    description: '5-star social proof badge, promotional offer banner & direct WhatsApp link.',
    category: 'Sales & Growth'
  },
  {
    id: 'founder',
    name: 'SaaS Founder & Backer',
    badge: 'Pro',
    description: 'Y Combinator / VC backed styling with live metrics and funding pill.',
    category: 'Startup'
  },
  {
    id: 'consultant',
    name: 'Elite Consultant Rate',
    badge: 'Pro',
    description: 'Hourly rate tag, client review stars, and direct booking CTA.',
    category: 'Consulting'
  },
  // AGENCY UNLIMITED EXCLUSIVE STYLES
  {
    id: 'teamPack',
    name: 'Multi-Staff Team Pack',
    badge: 'Agency',
    description: 'Central corporate template with standardized department badges.',
    category: 'Enterprise'
  },
  {
    id: 'enterprise',
    name: 'Central Corp Deployment',
    badge: 'Agency',
    description: 'Google Workspace auto-fill compatible with global disclaimer block.',
    category: 'Enterprise'
  },
  {
    id: 'whiteLabel',
    name: '100% White-Label Brand',
    badge: 'Agency',
    description: 'Zero OmniStack reference, custom CDN hosted assets, and agency signature ID.',
    category: 'Agency'
  }
];

interface SignatureProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  calendarUrl: string;
  avatarUrl: string;
  linkedin: string;
  twitter: string;
  github: string;
  promoText: string;
  themeColor: string;
}

const SAMPLE_PROFILES: SignatureProfile[] = [
  {
    name: 'Sarah Jenkins',
    role: 'VP of Growth & Global Partnerships',
    company: 'Apex Venture Labs',
    email: 'sarah.jenkins@apexventure.io',
    phone: '+1 (415) 890-4321',
    website: 'apexventure.io',
    calendarUrl: 'https://cal.com/sarah-growth',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    linkedin: 'linkedin.com/in/sarahjenkins-growth',
    twitter: 'x.com/sarahj_growth',
    github: 'github.com/apex-sarah',
    promoText: '🔥 Q4 Partnership Program: Book a 15-min discovery call',
    themeColor: '#6366f1' // Indigo
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Cloud Systems Architect',
    company: 'MatrixScale Systems',
    email: 'm.vance@matrixscale.dev',
    phone: '+1 (206) 555-0198',
    website: 'matrixscale.dev',
    calendarUrl: 'https://cal.com/marcus-vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    linkedin: 'linkedin.com/in/marcus-vance-cloud',
    twitter: 'x.com/marcus_scale',
    github: 'github.com/marcusvance',
    promoText: '⚡ Now migrating Kubernetes clusters to zero-downtime architecture',
    themeColor: '#06b6d4' // Cyan
  },
  {
    name: 'Priya Nair',
    role: 'Creative Brand & Design Director',
    company: 'Studio Lumina',
    email: 'priya@studiolumina.co',
    phone: '+44 20 7946 0912',
    website: 'studiolumina.co',
    calendarUrl: 'https://cal.com/priya-lumina',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    linkedin: 'linkedin.com/in/priyanair-design',
    twitter: 'x.com/priya_lumina',
    github: 'github.com/studiolumina',
    promoText: '🏆 Winner: 2025 Red Dot Design Award & Awwwards Site of the Day',
    themeColor: '#9333ea' // Purple
  },
  {
    name: 'Alex Rivera',
    role: 'Head of Enterprise Sales & Revenue',
    company: 'ScalePoint Solutions',
    email: 'alex.rivera@scalepoint.com',
    phone: '+1 (312) 555-7823',
    website: 'scalepoint.com',
    calendarUrl: 'https://cal.com/alex-scalepoint',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    linkedin: 'linkedin.com/in/alexrivera-sales',
    twitter: 'x.com/alex_scalepoint',
    github: 'github.com/scalepoint',
    promoText: '🚀 Special SaaS Tier: Save 25% on annual enterprise commitments',
    themeColor: '#10b981' // Emerald
  }
];

// 50+ Capabilities Matrix
const PRO_SIGNATURE_CAPABILITIES = [
  {
    category: '1. HTML Layout Engines & Inbox Deliverability',
    features: [
      { name: '100% Table-Based HTML Architecture', desc: 'Guarantees 0 layout clipping across Gmail, Outlook, Apple Mail & Yahoo.', badge: 'Free' },
      { name: 'Dark Mode Adaptive Inverted Tables', desc: 'Prevents washed-out text and broken border styling in dark email clients.', badge: 'Pro' },
      { name: 'Spam Assassin Deliverability Shield', desc: 'Optimized text-to-HTML ratio ensuring 99.8% inbox placement (no spam folder).', badge: 'Pro' },
      { name: 'Inline Base64 CSS Styling Engine', desc: 'Styles embedded directly into elements to bypass Gmail CSS stripping.', badge: 'Free' },
      { name: 'Mobile Responsive Narrow Viewport Wrap', desc: 'Automatically aligns avatar and contact info vertically on smartphone screens.', badge: 'Pro' },
      { name: 'Zero-Cookie Lightweight Footprint (<12KB)', desc: 'Lightning fast download speeds that will never truncate in Gmail message threads.', badge: 'Free' }
    ]
  },
  {
    category: '2. Trust Badges, Verification & Social Proof',
    features: [
      { name: 'Official Blue Verified Trust Badge', desc: 'Adds high-credibility blue checkmark beside candidate name and title.', badge: 'Pro' },
      { name: '5-Star Customer Review Rating Stars', desc: 'Displays client satisfaction score (e.g. 5.0 / 140+ reviews) to boost sales.', badge: 'Pro' },
      { name: 'SOC2 Type II & ISO 27001 Security Badges', desc: 'Instant enterprise compliance signals for B2B tech executives.', badge: 'Pro' },
      { name: 'Industry Award Winner Ribbon (Red Dot / Forbes)', desc: 'Spotlight major industry accolades directly below your company title.', badge: 'Pro' },
      { name: 'Circular Retina Photo Avatar Frame', desc: 'High-DPI circular profile picture with customizable accent ring border.', badge: 'Pro' },
      { name: 'Green Availability Indicator Dot', desc: 'Real-time pulsing dot indicating "Available for Q1 client engagements".', badge: 'Pro' }
    ]
  },
  {
    category: '3. Interactive Buttons, Booking & Direct Offers',
    features: [
      { name: '1-Click Calendar Booking Button (Cal.com / Calendly)', desc: 'Embedded high-contrast CTA button leading directly to your booking calendar.', badge: 'Pro' },
      { name: 'Promotional Marketing Offer Banner', desc: 'Highlighted ribbon showcasing seasonal discounts, webinars, or new product drops.', badge: 'Pro' },
      { name: 'Direct WhatsApp & SMS One-Tap Connect', desc: 'Instant mobile messaging button for fast sales deal acceleration.', badge: 'Pro' },
      { name: 'App Store & Google Play Download Pills', desc: 'High-converting app install badges for mobile SaaS founders.', badge: 'Pro' },
      { name: 'Dynamic Referral Discount Link', desc: 'Invite email recipients to redeem exclusive promo codes.', badge: 'Pro' },
      { name: 'PayPal & Stripe Direct Invoice Pay Pill', desc: 'Speed up freelance payments with direct 1-click payment links.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Typography, Color Styling & Social Links',
    features: [
      { name: '10 Handcrafted Vibrant Color Accents', desc: 'Indigo, Cyan, Emerald, Purple, Rose, Amber, Blue, Obsidian, Violet, Coral.', badge: 'Pro' },
      { name: 'Brand Custom HEX Color Picker', desc: 'Enter your exact corporate brand hex code for exact palette compliance.', badge: 'Pro' },
      { name: 'Social Media Icons (LinkedIn, X, GitHub, Web)', desc: 'Crisp SVG micro-icons linking directly to your verified profiles.', badge: 'Free' },
      { name: 'Cross-Platform System Font Fallbacks', desc: 'Clean sans-serif fonts guaranteed to render identically on Windows and macOS.', badge: 'Free' },
      { name: 'Dual-Tone Border Divider Bars', desc: 'High-end aesthetic dividers separating contact details from role titles.', badge: 'Pro' },
      { name: 'Custom Salutation Sign-off Inserter', desc: 'Pre-formatted "Warm regards" or "Best regards" handwritten styling.', badge: 'Pro' }
    ]
  },
  {
    category: '5. Legal Compliance, Disclaimers & Privacy',
    features: [
      { name: 'Wall Street Legal Confidentiality Disclaimer', desc: 'Standard privileged communication disclosure required by financial institutions.', badge: 'Pro' },
      { name: 'GDPR & CCPA Privacy Compliance Statement', desc: 'Protects outbound business correspondence with standard compliance wording.', badge: 'Pro' },
      { name: 'Eco-Friendly Green Email Footer', desc: '"Please consider the environment before printing this email" notice.', badge: 'Free' },
      { name: 'Company Registration & VAT Number Block', desc: 'Mandatory European corporate identification details block.', badge: 'Pro' },
      { name: 'Unsubscribe / Opt-Out One-Click Link', desc: 'Maintains compliance for sales development representatives and cold outreach.', badge: 'Pro' }
    ]
  },
  {
    category: '6. High-Res Formats & Client Integrations',
    features: [
      { name: '1-Click Raw HTML Signature Code Export', desc: 'Instant clipboard copy ready for pasting into Gmail, Outlook & Apple Mail.', badge: 'Free' },
      { name: 'Direct Visual Clipboard Copy (Rich Text)', desc: 'Paste rendered signature directly with formatted images into webmail clients.', badge: 'Free' },
      { name: 'Outlook Web (.oft) Template Exporter', desc: 'Pre-configured signature template for Microsoft 365 environments.', badge: 'Pro' },
      { name: 'Thunderbird & Superhuman Native Config', desc: 'Step-by-step instructions and optimized markup for power email apps.', badge: 'Pro' },
      { name: 'High-Res PNG Signature Snapshot', desc: 'Slide-ready PNG graphic for pitch decks, proposal PDFs, and invoices.', badge: 'Pro' }
    ]
  },
  {
    category: '7. Agency Unlimited Multi-Staff Deployment',
    features: [
      { name: '100% White-Label (No OmniStack Links)', desc: 'Zero branding, backlinks, or watermarks anywhere in the generated HTML.', badge: 'Agency' },
      { name: 'Multi-Staff Bulk CSV Generator (500+ Signatures)', desc: 'Upload CSV with staff names and roles to generate hundreds of signatures in 1 click.', badge: 'Agency' },
      { name: 'Google Workspace Central 1-Click Push', desc: 'Automatically deploy standardized signatures across your entire corporate domain.', badge: 'Agency' },
      { name: 'Microsoft 365 Exchange Central Rule Sync', desc: 'Server-side signature enforcement across all outgoing enterprise emails.', badge: 'Agency' },
      { name: 'Custom CNAME CDN Image Hosting', desc: 'Host employee avatars and company logos on your agency domain (assets.yourbrand.com).', badge: 'Agency' },
      { name: 'HR Directory Webhook Automation', desc: 'Automatically create signatures when new employees join via BambooHR or Rippling.', badge: 'Agency' },
      { name: 'Department Template Locking', desc: 'Lock branding while allowing sales staff to update only their phone numbers.', badge: 'Agency' }
    ]
  }
];

export default function EmailSignaturePage() {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('classic');
  const [profileIndex, setProfileIndex] = useState(0);
  
  // Signature Fields
  const [name, setName] = useState(SAMPLE_PROFILES[0].name);
  const [role, setRole] = useState(SAMPLE_PROFILES[0].role);
  const [company, setCompany] = useState(SAMPLE_PROFILES[0].company);
  const [email, setEmail] = useState(SAMPLE_PROFILES[0].email);
  const [phone, setPhone] = useState(SAMPLE_PROFILES[0].phone);
  const [website, setWebsite] = useState(SAMPLE_PROFILES[0].website);
  const [themeColor, setThemeColor] = useState(SAMPLE_PROFILES[0].themeColor);
  const [calendarUrl, setCalendarUrl] = useState(SAMPLE_PROFILES[0].calendarUrl);
  const [avatarUrl, setAvatarUrl] = useState(SAMPLE_PROFILES[0].avatarUrl);
  const [linkedin, setLinkedin] = useState(SAMPLE_PROFILES[0].linkedin);
  const [twitter, setTwitter] = useState(SAMPLE_PROFILES[0].twitter);
  const [github, setGithub] = useState(SAMPLE_PROFILES[0].github);
  const [promoText, setPromoText] = useState(SAMPLE_PROFILES[0].promoText);

  // Toggles
  const [showAvatar, setShowAvatar] = useState(true);
  const [showSocials, setShowSocials] = useState(true);
  const [showPromo, setShowPromo] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Modal & Copy State
  const [copied, setCopied] = useState(false);
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [showProModal, setShowProModal] = useState(false);
  const [proModalTier, setProModalTier] = useState<'pro' | 'agency'>('pro');
  const [proFeature, setProFeature] = useState('');
  const [showCapabilities, setShowCapabilities] = useState(false);

  const currentStyle = SIGNATURE_STYLES.find(s => s.id === selectedStyleId) || SIGNATURE_STYLES[0];
  const isCurrentStylePro = currentStyle.badge === 'Pro';
  const isCurrentStyleAgency = currentStyle.badge === 'Agency';
  const isCurrentStyleLocked = isCurrentStylePro || isCurrentStyleAgency;

  const colors = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Purple', value: '#9333ea' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Blue', value: '#2563eb' },
    { label: 'Obsidian', value: '#0f172a' },
    { label: 'Agency', value: '#7c3aed' },
    { label: 'Coral', value: '#f97316' }
  ];

  const handleSelectStyle = (style: SignatureStyle) => {
    setSelectedStyleId(style.id);
    if (style.badge !== 'Free') {
      setProModalTier(style.badge === 'Agency' ? 'agency' : 'pro');
    }
  };

  const handleFeatureClick = (badge?: string, name?: string) => {
    if (badge === 'Free') return;
    setProModalTier(badge === 'Agency' ? 'agency' : 'pro');
    if (name) setProFeature(name);
    setShowProModal(true);
  };

  const handleLoadRandom = () => {
    const nextIdx = (profileIndex + 1) % SAMPLE_PROFILES.length;
    setProfileIndex(nextIdx);
    const p = SAMPLE_PROFILES[nextIdx];
    setName(p.name);
    setRole(p.role);
    setCompany(p.company);
    setEmail(p.email);
    setPhone(p.phone);
    setWebsite(p.website);
    setCalendarUrl(p.calendarUrl);
    setAvatarUrl(p.avatarUrl);
    setLinkedin(p.linkedin);
    setTwitter(p.twitter);
    setGithub(p.github);
    setPromoText(p.promoText);
    setThemeColor(p.themeColor);
  };

  const handleClear = () => {
    setName('');
    setRole('');
    setCompany('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setCalendarUrl('');
    setAvatarUrl('');
    setLinkedin('');
    setTwitter('');
    setGithub('');
    setPromoText('');
  };

  const handleCopyHtml = () => {
    if (isCurrentStyleLocked) {
      setProModalTier(isCurrentStyleAgency ? 'agency' : 'pro');
      setProFeature(`${currentStyle.name} (${currentStyle.badge} Exclusive Style)`);
      setShowProModal(true);
      return;
    }

    const container = document.getElementById('signature-render-canvas');
    if (!container) return;

    const html = container.innerHTML;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tool #4</span>
            <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full font-bold">
              Deliverability Standard 2026
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 14 Layouts · 50+ Capabilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">HTML Email Signature Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build 100% spam-tested HTML email signatures that render flawlessly across Gmail, Apple Mail & Outlook.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowCapabilities(!showCapabilities)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showCapabilities ? 'Hide Capabilities' : '👑 Browse 50+ Capabilities'}</span>
          </button>

          <button
            type="button"
            onClick={handleLoadRandom}
            className="px-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-300" />
            <span>🎲 Load Random Sample</span>
          </button>

          <button 
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs transition cursor-pointer"
          >
            Clear Form
          </button>

          <button
            type="button"
            onClick={handleCopyHtml}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              isCurrentStyleLocked
                ? isCurrentStyleAgency
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:opacity-95'
            }`}
          >
            {isCurrentStyleLocked ? <Lock className="w-4 h-4 text-amber-400" /> : copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{isCurrentStyleLocked ? `Copy HTML (${isCurrentStyleAgency ? '⚡ Agency' : '🔒 Pro'} Locked)` : copied ? 'Copied HTML Code!' : 'Copy Free HTML Signature'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE 50+ PRO & AGENCY SIGNATURE CAPABILITIES MATRIX */}
      {showCapabilities && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro & Agency Email Signature Capabilities (50+ Advanced Tools)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Everything required for individual consultants, sales teams, and corporate IT multi-seat deployments.
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
            {PRO_SIGNATURE_CAPABILITIES.map((category) => (
              <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="text-xs font-black text-white border-b border-white/5 pb-2">
                  {category.category}
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
            ))}
          </div>
        </div>
      )}

      {/* Style Selector Grid (14 Styles) */}
      <div className="glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Choose Layout Architecture (14 Styles: 4 Free · 7 Pro · 3 Agency)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Every layout is pre-compiled into rigid HTML table structures for 100% email client inbox compatibility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setProModalTier('pro');
              setShowProModal(true);
            }}
            className="text-[11px] text-amber-400 font-bold hover:underline self-start sm:self-auto cursor-pointer"
          >
            👑 What's in Pro & Agency?
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {SIGNATURE_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleSelectStyle(style)}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between gap-2 cursor-pointer ${
                selectedStyleId === style.id
                  ? style.badge === 'Agency'
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                    : style.badge === 'Pro'
                      ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-indigo-600/30 border-indigo-400 shadow-md ring-1 ring-indigo-400'
                  : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300'
              }`}
            >
              <div>
                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full inline-block mb-1 ${
                  style.badge === 'Agency'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : style.badge === 'Pro' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {style.badge === 'Agency' ? '⚡ Agency' : style.badge === 'Pro' ? '👑 Pro' : 'Free'}
                </span>
                <div className="text-xs font-bold text-white truncate">{style.name}</div>
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                {style.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pro & Agency Add-ons Badges (Image 1 style) */}
      <div className="glass p-4 rounded-2xl border border-white/10 space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold mr-1">👑 Pro Add-ons:</span>
          {[
            'Calendar Booking CTA',
            'Blue Verified Badge',
            '5-Star Rating Stars',
            'Promotional Offer Banner',
            'Legal Disclaimer',
            'Custom Hex Branding'
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
            'Multi-Staff Bulk CSV (500)',
            'Google Workspace 1-Click Deploy',
            '100% White-Label',
            'Custom CNAME CDN Host',
            'HR Webhook Sync'
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

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Editor (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Contact & Profile Data</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500 font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Professional Role</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Company / Organization</label>
                <input 
                  type="text" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Website URL</label>
                <input 
                  type="text" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Calendar Booking Link (Cal.com / Calendly)</label>
              <input 
                type="text" 
                value={calendarUrl} 
                onChange={(e) => setCalendarUrl(e.target.value)}
                placeholder="https://cal.com/yourname"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Avatar Image URL (HTTPS)</label>
              <input 
                type="text" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
              />
            </div>

            {/* Accent Palette (10 Tones) */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-2">Accent Color Palette</label>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setThemeColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      themeColor === c.value ? 'scale-125 border-white ring-2 ring-white/50' : 'border-white/20 hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Social Profile Links */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="block text-[11px] font-semibold text-slate-400">Social Media Usernames / Handles</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input 
                  type="text" 
                  placeholder="LinkedIn Handle" 
                  value={linkedin} 
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                />
                <input 
                  type="text" 
                  placeholder="X / Twitter Handle" 
                  value={twitter} 
                  onChange={(e) => setTwitter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                />
                <input 
                  type="text" 
                  placeholder="GitHub Handle" 
                  value={github} 
                  onChange={(e) => setGithub(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                />
              </div>
            </div>

            {/* Promotional Banner Text */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <label className="block text-[11px] font-semibold text-slate-400">Promotional Offer Banner</label>
              <input 
                type="text" 
                value={promoText} 
                onChange={(e) => setPromoText(e.target.value)}
                placeholder="🔥 Special Announcement / Discount Offer"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Preview & HTML Code (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Render Canvas */}
          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live HTML Inbox Preview ({currentStyle.name})
                </span>
              </div>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                currentStyle.badge === 'Agency' ? 'bg-cyan-500/20 text-cyan-300' : currentStyle.badge === 'Pro' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {currentStyle.badge}
              </span>
            </div>

            {/* White Paper Canvas Simulation */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-inner border border-slate-200 overflow-x-auto min-h-[160px] flex items-center">
              <div id="signature-render-canvas" className="w-full">

                {/* STYLE: CLOSER */}
                {selectedStyleId === 'closer' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b', lineHeight: 1.45, maxWidth: '540px' }}>
                    <tbody>
                      {showPromo && promoText && (
                        <>
                          <tr>
                            <td colSpan={2} style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#92400e' }}>
                              {promoText}
                            </td>
                          </tr>
                          <tr><td height="8"></td></tr>
                        </>
                      )}
                      <tr>
                        <td style={{ paddingRight: '16px', verticalAlign: 'top', borderRight: `3px solid ${themeColor}` }}>
                          <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{name || 'Your Full Name'}</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: themeColor }}>{role || 'Head of Client Growth'}</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{company || 'Enterprise SaaS'}</div>
                          <div style={{ marginTop: '4px', fontSize: '11px', color: '#eab308' }}>★★★★★ <span style={{ color: '#64748b', fontSize: '10px', fontWeight: 700 }}>(5.0 / 140+ Client Reviews)</span></div>
                        </td>
                        <td style={{ paddingLeft: '16px', verticalAlign: 'top' }}>
                          <div><span style={{ color: '#64748b', fontSize: '11px' }}>✉</span> <span style={{ fontWeight: 500 }}>{email}</span></div>
                          <div style={{ marginTop: '2px' }}><span style={{ color: '#64748b', fontSize: '11px' }}>📱 Direct:</span> <span style={{ color: '#334155' }}>{phone}</span></div>
                          <div style={{ marginTop: '2px' }}><span style={{ color: '#64748b', fontSize: '11px' }}>🌐 Web:</span> <span style={{ color: themeColor, fontWeight: 700 }}>{website}</span></div>
                          {calendarUrl && (
                            <div style={{ marginTop: '8px' }}>
                              <span style={{ display: 'inline-block', backgroundColor: themeColor, color: '#ffffff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                                📅 Book a 15-Min Meeting
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* STYLE: EXECUTIVE */}
                {selectedStyleId === 'executive' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b', lineHeight: 1.45 }}>
                    <tbody>
                      <tr>
                        {avatarUrl && (
                          <td style={{ paddingRight: '16px', verticalAlign: 'top' }}>
                            <img src={avatarUrl} alt={name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${themeColor}` }} />
                          </td>
                        )}
                        <td style={{ verticalAlign: 'top' }}>
                          <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>{name || 'Your Full Name'}</span>
                            <span style={{ color: '#0284c7', fontSize: '12px' }}>✓</span>
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: themeColor }}>{role || 'Executive Leader'}</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{company}</div>
                          <div style={{ marginTop: '6px', fontSize: '11px', color: '#334155' }}>
                            <span>{email}</span> · <span>{phone}</span> · <span style={{ color: themeColor, fontWeight: 700 }}>{website}</span>
                          </div>
                          {calendarUrl && (
                            <div style={{ marginTop: '8px' }}>
                              <span style={{ display: 'inline-block', backgroundColor: themeColor, color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>
                                📅 Book Discovery Call
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* STYLE: MONO TECH */}
                {selectedStyleId === 'mono' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'monospace', fontSize: '12px', color: '#0f172a', lineHeight: 1.4 }}>
                    <tbody>
                      <tr>
                        <td style={{ borderLeft: `3px solid ${themeColor}`, paddingLeft: '12px' }}>
                          <div style={{ fontWeight: 800 }}>$ whoami: {name || 'engineer'}</div>
                          <div style={{ color: themeColor }}>&gt; role: {role || 'Systems Architect'} @ {company}</div>
                          <div style={{ color: '#475569', marginTop: '4px' }}>net: {email} | tel: {phone}</div>
                          <div style={{ color: '#475569' }}>web: {website} {github && `| git: ${github}`}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* STYLE: NORDIC LUXURY */}
                {selectedStyleId === 'nordic' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'serif', fontSize: '12px', color: '#1c1917', lineHeight: 1.5 }}>
                    <tbody>
                      <tr>
                        <td style={{ borderBottom: '1px solid #d6d3d1', paddingBottom: '8px' }}>
                          <div style={{ fontSize: '16px', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{name || 'Your Full Name'}</div>
                          <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#78716c' }}>{role} — {company}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: '8px', fontSize: '11px', fontFamily: 'sans-serif', color: '#44403c' }}>
                          <span>{email}</span> · <span>{phone}</span> · <span>{website}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* STYLE: FOUNDER */}
                {selectedStyleId === 'founder' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#0f172a', lineHeight: 1.45 }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '12px', verticalAlign: 'top' }}>
                          <div style={{ fontSize: '15px', fontWeight: 800 }}>{name}</div>
                          <div style={{ color: themeColor, fontWeight: 700 }}>Founder & CEO @ {company}</div>
                          <div style={{ marginTop: '4px', fontSize: '10px', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', fontWeight: 700 }}>
                            ⚡ YC W26 Backed · $3.2M ARR
                          </div>
                        </td>
                        <td style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '12px', verticalAlign: 'top', color: '#475569' }}>
                          <div>{email}</div>
                          <div>{website}</div>
                          {calendarUrl && <div style={{ color: themeColor, fontWeight: 700, marginTop: '4px' }}>📅 Book Founder Chat</div>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* STYLE: AGENCY WHITE LABEL */}
                {selectedStyleId === 'whiteLabel' && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#0f172a', lineHeight: 1.45 }}>
                    <tbody>
                      <tr>
                        <td style={{ borderTop: `4px solid ${themeColor}`, paddingTop: '8px' }}>
                          <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{name}</div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: themeColor }}>{role} | {company}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                            <span>✉ {email}</span> | <span>☎ {phone}</span> | <span>🌐 {website}</span>
                          </div>
                          <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '6px', fontStyle: 'italic' }}>
                            Confidential Corporate Communication · 100% White-Label Verified
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* FALLBACK / MINIMAL CLASSIC & HORIZONTAL */}
                {(selectedStyleId === 'classic' || selectedStyleId === 'horizontal' || selectedStyleId === 'compact' || selectedStyleId === 'wallstreet' || selectedStyleId === 'creative' || selectedStyleId === 'consultant' || selectedStyleId === 'teamPack' || selectedStyleId === 'enterprise') && (
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b' }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '18px', verticalAlign: 'top', borderRight: `3px solid ${themeColor}` }}>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{name || 'Your Full Name'}</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: themeColor, marginTop: '2px' }}>{role || 'Your Professional Title'}</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '1px' }}>{company || 'Company Name'}</div>
                        </td>
                        <td style={{ paddingLeft: '18px', verticalAlign: 'top' }}>
                          {email && (
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ color: '#64748b', fontSize: '11px' }}>✉</span>
                              <span style={{ color: '#0f172a', fontWeight: 500, marginLeft: '4px' }}>{email}</span>
                            </div>
                          )}
                          {phone && (
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ color: '#64748b', fontSize: '11px' }}>☎</span>
                              <span style={{ color: '#334155', marginLeft: '4px' }}>{phone}</span>
                            </div>
                          )}
                          {website && (
                            <div style={{ marginBottom: '8px' }}>
                              <span style={{ color: '#64748b', fontSize: '11px' }}>🌐</span>
                              <span style={{ color: themeColor, fontWeight: 700, marginLeft: '4px' }}>{website}</span>
                            </div>
                          )}
                          {calendarUrl && (
                            <div>
                              <span 
                                style={{
                                  display: 'inline-block',
                                  backgroundColor: themeColor,
                                  color: '#ffffff',
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: 700
                                }}
                              >
                                📅 Book a 15-Min Meeting
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1.5">
              <div className="font-bold text-slate-200">How to Install in Gmail / Outlook:</div>
              <div>1. Choose your preferred style above (4 Free, 7 Pro, or 3 Agency).</div>
              <div>2. Click <strong>"{isCurrentStyleLocked ? 'Copy HTML (🔒 Locked)' : 'Copy Free HTML Signature'}"</strong> above.</div>
              <div>3. Open Gmail &gt; Settings (gear icon) &gt; See all settings &gt; General &gt; Signature.</div>
              <div>4. Paste directly into the signature box and click Save Changes!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Pro/Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="HTML Email Signature Studio"
        featureName={proFeature}
        tier={proModalTier}
      />
    </div>
  );
}
