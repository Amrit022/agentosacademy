'use client';

import { useState } from 'react';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  Scissors,
  Lock,
  Crown, 
  Copy, 
  Check, 
  BarChart2, 
  Globe2, 
  QrCode, 
  ArrowRight, 
  ExternalLink,
  Smartphone,
  Laptop,
  Tablet,
  Download,
  Share2,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  Target,
  FileSpreadsheet,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const PRO_URL_CAPABILITIES = [
  {
    category: '1. Branded Domains & Vanity Slugs',
    features: [
      { name: 'Custom Domain CNAME (go.yourbrand.com)', desc: 'White-label links under your official company domain.', badge: 'Pro' },
      { name: 'Unlimited Custom Slug Aliases', desc: 'Craft high-converting memorable slugs like /black-friday.', badge: 'Pro' },
      { name: 'Automatic Let\'s Encrypt SSL Certificates', desc: 'HTTPS encryption auto-provisioned across all vanity links.', badge: 'Pro' },
      { name: 'Multiple Domain Switcher', desc: 'Manage up to 10 distinct custom brand domains under one login.', badge: 'Pro' },
      { name: 'Root Domain Redirect Configuration', desc: 'Direct visitors to your homepage if they visit root domain.', badge: 'Pro' },
      { name: 'Custom 404 Error Page Fallback', desc: 'Route broken link traffic back to your main store or newsletter.', badge: 'Pro' },
      { name: 'Random Short Link Generator', desc: 'Standard 7-character hash links with 99.99% deliverability.', badge: 'Free' },
      { name: 'Domain Health & DNS Monitoring', desc: 'Real-time alerts if your CNAME DNS records experience issues.', badge: 'Pro' }
    ]
  },
  {
    category: '2. Retargeting Pixels & Ad Tracking',
    features: [
      { name: 'Meta / Facebook Pixel Integration', desc: 'Fire custom audiences when users click links on social media.', badge: 'Pro' },
      { name: 'Google Tag Manager & GA4 Event Dispatch', desc: 'Track outbound click events directly inside Google Analytics.', badge: 'Pro' },
      { name: 'TikTok Ads Pixel Tracking', desc: 'Build hyper-targeted TikTok remarketing lists from bio links.', badge: 'Pro' },
      { name: 'LinkedIn Insight Tag Sync', desc: 'Capture high-value B2B decision-makers for retargeting campaigns.', badge: 'Pro' },
      { name: 'Pinterest Ads Tag Fire', desc: 'Track e-commerce shopper clicks directly to Shopify carts.', badge: 'Pro' },
      { name: 'X / Twitter Ads Conversion Pixel', desc: 'Build tailored retargeting lists from tweet clicks.', badge: 'Pro' },
      { name: 'Multi-Pixel Simultaneous Fire', desc: 'Trigger up to 5 advertising pixels from a single short link click.', badge: 'Pro' }
    ]
  },
  {
    category: '3. Smart Traffic Routing & Geo-Targeting',
    features: [
      { name: 'Device OS Detection & Redirection', desc: 'Send iOS users to App Store and Android users to Google Play.', badge: 'Pro' },
      { name: 'Country & City Geolocation Routing', desc: 'Route German visitors to /de and UK visitors to /uk automatically.', badge: 'Pro' },
      { name: 'A/B Split Testing Link Rotator', desc: 'Split traffic 50/50 between two landing pages to maximize conversion.', badge: 'Pro' },
      { name: 'Time-Based Scheduled Redirection', desc: 'Change destination link automatically when promotion ends at midnight.', badge: 'Pro' },
      { name: 'Referrer Domain Routing', desc: 'Deliver custom pages based on whether traffic comes from YouTube or Twitter.', badge: 'Pro' },
      { name: 'HTTP Status Code Selection (301, 302, 307)', desc: 'Choose between permanent SEO equity transfer or temporary redirects.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Dynamic Vector QR Code Studio',
    features: [
      { name: 'High-Resolution Vector SVG / EPS Download', desc: 'Lossless vector QR codes ready for billboards, flyers, and magazines.', badge: 'Pro' },
      { name: 'Custom Brand Logo Inside QR Code', desc: 'Embed your company logo in center with automatic error correction.', badge: 'Pro' },
      { name: 'Ultra-High 4096px PNG & Print Ready PDF', desc: 'Export commercial 300 DPI files for high-end graphic design.', badge: 'Pro' },
      { name: 'Custom QR Hex Color Gradients', desc: 'Style QR dots and corner eyes to match brand palette.', badge: 'Pro' },
      { name: 'Dynamic Destination Update After Printing', desc: 'Change where QR code redirects even after printing 10,000 brochures.', badge: 'Pro' },
      { name: 'Scannable Standard Vector QR Code', desc: 'Instant scannable code with instant camera recognition.', badge: 'Free' }
    ]
  },
  {
    category: '5. Link Security & Privacy Shields',
    features: [
      { name: 'Password Protected Sensitive Links', desc: 'Require users to enter a passcode to access private documents.', badge: 'Pro' },
      { name: 'Expiration Date & Auto-Deactivation', desc: 'Expire links after 24 hours, 7 days, or specific promotion date.', badge: 'Pro' },
      { name: 'Click Volume Caps (e.g. First 100 Clicks)', desc: 'Deactivate or redirect once maximum claim count is hit.', badge: 'Pro' },
      { name: 'Cloudflare Anti-Bot Human Verification', desc: 'Filter out scrapers, bots, and crawlers from skewing analytics.', badge: 'Pro' },
      { name: 'Malware & Phishing Threat Shield', desc: 'Automated scanning against Google Safe Browsing blacklist.', badge: 'Pro' },
      { name: 'GDPR / Cookie Consent Splash Screen', desc: 'Show compliance prompt before redirecting EU residents.', badge: 'Pro' }
    ]
  },
  {
    category: '6. Analytics & Campaign Intelligence',
    features: [
      { name: 'City-Level GPS Geolocation Heatmap', desc: 'See exact cities driving sales (New York, London, Berlin, Tokyo).', badge: 'Pro' },
      { name: 'Real-Time Top Referring Websites', desc: 'Identify top traffic drivers (LinkedIn, YouTube, Substack, Reddit).', badge: 'Pro' },
      { name: 'Browser, OS & Screen Resolution Breakdown', desc: 'Deep device telemetry (Safari iOS vs Chrome Desktop).', badge: 'Pro' },
      { name: 'UTM Campaign Tag Builder', desc: 'Auto-append utm_source, utm_medium, and utm_campaign query params.', badge: 'Pro' },
      { name: 'Bulk Link Shortener (CSV Upload)', desc: 'Shorten up to 1,000 URLs simultaneously in seconds.', badge: 'Pro' },
      { name: 'Export Analytics Reports to CSV & JSON', desc: 'Download complete timestamped click data for client reporting.', badge: 'Pro' },
      { name: 'Basic Overall Click Counter', desc: 'Tracks total volume of redirections per short link.', badge: 'Free' }
    ]
  },
  {
    category: '7. Agency Unlimited Multi-Client Enterprise',
    features: [
      { name: '100% White-Label Client Portals', desc: 'Completely eliminate all OmniStack AI branding, logos, and links.', badge: 'Agency' },
      { name: 'Multi-Client Sub-Account Workspaces', desc: 'Manage up to 25 separate client brands with isolated link databases.', badge: 'Agency' },
      { name: 'Unlimited Custom CNAME Brand Domains', desc: 'Connect unlimited client domains (go.client1.com, links.client2.com).', badge: 'Agency' },
      { name: 'Bulk CSV Importer (5,000 Links / Batch)', desc: 'Instant mass migration from Bitly, Rebrandly, or Short.io.', badge: 'Agency' },
      { name: 'Programmatic REST API & Webhooks', desc: 'Create, edit, and stream real-time click telemetry to client databases.', badge: 'Agency' },
      { name: 'Automated White-Label Client PDF Reports', desc: 'Generate branded monthly traffic reports with your agency logo.', badge: 'Agency' }
    ]
  }
];

export default function UrlShortenerPage() {
  const [destinationUrl, setDestinationUrl] = useState('https://dribbble.com/shots/21400-figma-saas-ui');
  const [customSlug, setCustomSlug] = useState('design-portfolio');
  const [shortUrl, setShortUrl] = useState('https://omnistack.ai/s/design-portfolio');
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(4210);
  const [showProModal, setShowProModal] = useState(false);
  const [proFeature, setProFeature] = useState('');
  const [proTier, setProTier] = useState<'pro' | 'agency'>('pro');
  const [showMatrix, setShowMatrix] = useState(false);
  const [qrStyle, setQrStyle] = useState<'square' | 'rounded' | 'micro' | 'diamond'>('square');
  const [qrColor, setQrColor] = useState<'classic' | 'cyan' | 'emerald' | 'sunset' | 'gold'>('classic');

  const [history, setHistory] = useState([
    { slug: 'design-portfolio', dest: 'https://dribbble.com/shots/21400-figma-saas-ui', clicks: 4210, created: 'Today', tag: 'Portfolio' },
    { slug: 'tech-newsletter', dest: 'https://substack.com/@creatorshub/post-84', clicks: 1890, created: 'Yesterday', tag: 'Newsletter' },
    { slug: 'zoom-consulting', dest: 'https://cal.com/alexrivera/strategy-session', clicks: 940, created: '3 days ago', tag: 'Booking' },
    { slug: 'product-demo', dest: 'https://loom.com/share/92a83bd789e2', clicks: 620, created: '5 days ago', tag: 'Video' },
  ]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl) return;
    if (customSlug.trim()) {
      setProFeature('Custom Branded URL Slugs & Vanity Domains');
      setProTier('pro');
      setShowProModal(true);
      return;
    }
    const slug = Math.random().toString(36).substring(6);
    const newShort = `https://omnistack.ai/s/${slug}`;
    setShortUrl(newShort);
    setHistory([
      { slug, dest: destinationUrl, clicks: 1, created: 'Just now', tag: 'Custom' },
      ...history
    ]);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeatureClick = (name: string, tier: 'pro' | 'agency' = 'pro') => {
    setProFeature(name);
    setProTier(tier);
    setShowProModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Tool #6</span>
            <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full font-bold">
              Branded Links & QR Engine
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 50+ Pro Features
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">URL Shortener & Geographic Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn long destination URLs into clean, memorable links with instant vector QR codes and city-level analytics.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setShowMatrix(!showMatrix)}
          className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>{showMatrix ? 'Hide Pro Feature Catalog' : '👑 Browse 50+ Pro Capabilities'}</span>
        </button>
      </div>

      {/* EXPANDABLE 50+ PRO URL SHORTENER CAPABILITIES MATRIX */}
      {showMatrix && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro Enterprise Link Infrastructure (50+ Advanced Tools)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Everything required for marketing teams, affiliate publishers, and creators to track and monetize traffic.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setProFeature('All 50+ Pro Link & QR Engine Capabilities');
                setShowProModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
            >
              Unlock All 50+ Features for $9/mo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_URL_CAPABILITIES.map((category) => (
              <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="text-xs font-black text-white border-b border-white/5 pb-2">
                  {category.category}
                </div>

                <div className="space-y-2">
                  {category.features.map((f) => (
                    <div 
                      key={f.name}
                      onClick={() => f.badge !== 'Free' && handleFeatureClick(f.name, f.badge === 'Agency' ? 'agency' : 'pro')}
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

      {/* Main Shortener Form */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <form onSubmit={handleShorten} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-7">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Destination Long URL</label>
            <input 
              type="url" 
              required
              value={destinationUrl} 
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://yourwebsite.com/long-page-link"
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300">Custom Alias</label>
              <span className="text-[10px] text-amber-400 font-extrabold uppercase flex items-center gap-1">
                <Crown className="w-3 h-3" /> PRO
              </span>
            </div>
            <div className="flex items-center rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-slate-400">
              <span className="font-mono">/s/</span>
              <input 
                type="text" 
                value={customSlug} 
                onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                placeholder="my-campaign"
                className="bg-transparent text-white outline-none font-bold ml-1 w-full font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button 
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer"
            >
              <Scissors className="w-4 h-4" /> Shorten Link
            </button>
          </div>
        </form>

        {/* Pro & Agency Add-ons Badges (Image 1 style) */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-slate-400 font-semibold mr-1">Pro Add-ons:</span>
            {[
              'Custom Domain (CNAME)',
              'Meta Pixel Retargeting',
              'Password Shield',
              'Link Expiry Cap',
              'UTM Builder',
              'A/B Split Rotator',
              'Device OS Routing',
              'Geo City Target'
            ].map((addon) => (
              <button
                key={addon}
                type="button"
                onClick={() => handleFeatureClick(addon, 'pro')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Crown className="w-2.5 h-2.5 text-amber-400" />
                <span>{addon}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-cyan-400 font-semibold mr-1">⚡ Agency Only:</span>
            {[
              'Multi-Client Workspaces',
              '10+ Custom CNAME Domains',
              'Bulk CSV Importer (5k Links)',
              'White-Label PDF Reports',
              'Full REST API & Webhooks'
            ].map((agencyAddon) => (
              <button
                key={agencyAddon}
                type="button"
                onClick={() => handleFeatureClick(agencyAddon, 'agency')}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Zap className="w-2.5 h-2.5 text-cyan-400" />
                <span>{agencyAddon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results & Live Analytics (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Short Link Card */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Generated Short Link</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Live Redirect</span>
            </div>
            <div className="text-lg font-black text-cyan-300 font-mono break-all">{shortUrl}</div>
            <div className="text-[11px] text-slate-400 mt-2 truncate font-mono">
              Redirects to: {destinationUrl}
            </div>
          </div>

          <button 
            onClick={copyLink}
            className="mt-6 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Short Link'}
          </button>
        </div>

        {/* QR Code Card with Interactive Customization */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
          <div className={`p-3.5 rounded-2xl shadow-2xl mb-3 transition-colors ${
            qrColor === 'cyan' ? 'bg-cyan-950/80 border border-cyan-400/40 text-cyan-400' :
            qrColor === 'emerald' ? 'bg-emerald-950/80 border border-emerald-400/40 text-emerald-400' :
            qrColor === 'sunset' ? 'bg-pink-950/80 border border-pink-400/40 text-pink-400' :
            qrColor === 'gold' ? 'bg-amber-950/80 border border-amber-400/40 text-amber-400' :
            'bg-white text-slate-950'
          }`}>
            <QrCode className="w-20 h-20" />
          </div>

          <div className="text-xs font-bold text-white">Dynamic Vector QR Studio</div>
          
          {/* QR Pattern Styles */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {[
              { id: 'square', name: 'Square', pro: false },
              { id: 'rounded', name: 'Dots', pro: true },
              { id: 'micro', name: 'Micro', pro: true },
              { id: 'diamond', name: 'Diamond', pro: true }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  if (st.pro) {
                    handleFeatureClick(`QR Code Pattern: ${st.name}`, 'pro');
                  } else {
                    setQrStyle(st.id as any);
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                  qrStyle === st.id 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {st.name} {st.pro && '👑'}
              </button>
            ))}
          </div>

          {/* QR Colors */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[
              { id: 'classic', color: 'bg-white', name: 'Mono', pro: false },
              { id: 'cyan', color: 'bg-cyan-400', name: 'Cyan', pro: true },
              { id: 'emerald', color: 'bg-emerald-400', name: 'Emerald', pro: true },
              { id: 'sunset', color: 'bg-pink-500', name: 'Sunset', pro: true },
              { id: 'gold', color: 'bg-amber-400', name: 'Gold', pro: true }
            ].map((cl) => (
              <button
                key={cl.id}
                type="button"
                onClick={() => {
                  if (cl.pro) {
                    handleFeatureClick(`QR Color Palette: ${cl.name}`, 'pro');
                  } else {
                    setQrColor(cl.id as any);
                  }
                }}
                className={`w-5 h-5 rounded-full ${cl.color} border transition ${
                  qrColor === cl.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                title={cl.name}
              />
            ))}
          </div>

          <button 
            type="button"
            onClick={() => handleFeatureClick('Vector QR SVG, EPS & High-Res PNG Download', 'pro')}
            className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Download Vector QR (👑 Pro)</span>
          </button>
        </div>

        {/* Geographic Breakdown */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Geographic Visitors
            </span>
            <span className="text-xs font-bold text-emerald-400">+{clicks} total clicks</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>🇺🇸 United States</span>
              <span className="font-bold text-white">48% (2,020 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-[48%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇩🇪 Germany</span>
              <span className="font-bold text-white">32% (1,347 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full w-[32%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇬🇧 United Kingdom</span>
              <span className="font-bold text-white">12% (505 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full w-[12%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Directory Table with Diverse Links */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Links Directory</h3>
          <span className="text-[11px] text-slate-400">{history.length} active campaigns</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="pb-3 font-bold">Short Link</th>
                <th className="pb-3 font-bold">Category</th>
                <th className="pb-3 font-bold">Original Destination</th>
                <th className="pb-3 font-bold text-right">Total Clicks</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold text-cyan-300 font-mono">
                    omnistack.ai/s/{h.slug}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-semibold text-slate-300 border border-white/5">
                      {h.tag}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400 max-w-xs truncate font-mono">
                    {h.dest}
                  </td>
                  <td className="py-3.5 text-right font-black text-white">
                    {h.clicks.toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right">
                    <a
                      href={h.dest}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Visit</span> <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Pro/Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="Branded URL Shortener & Analytics"
        featureName={proFeature}
        tier={proTier}
      />
    </div>
  );
}

