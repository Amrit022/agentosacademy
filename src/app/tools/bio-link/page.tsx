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
  DollarSign
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

export default function BioLinkPage() {
  const [handle, setHandle] = useState('elenarostova');
  const [displayName, setDisplayName] = useState('Elena Rostova');
  const [bio, setBio] = useState('Product Designer & Design Systems Lead. Building user-centered interfaces for global startups 🇩🇪 🌍');
  const [theme, setTheme] = useState<'midnight' | 'sunset' | 'emerald' | 'minimal' | 'cyberpunk' | 'gold'>('midnight');
  const [activeTab, setActiveTab] = useState<'editor' | 'analytics'>('editor');
  const [presetIndex, setPresetIndex] = useState(0);
  
  const [links, setLinks] = useState(SAMPLE_LINK_PRESETS[0]);
  const [copied, setCopied] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [proFeature, setProFeature] = useState('');

  const totalClicks = links.reduce((acc, curr) => acc + curr.clicks, 0);
  const isProTheme = theme === 'cyberpunk' || theme === 'gold' || theme === 'sunset' || theme === 'emerald';

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
    if (isProTheme) {
      setProFeature(`Publishing with Pro VIP Theme (${theme.toUpperCase()})`);
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
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Bio Link Page Creator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Host your customized, zero-commission portfolio link under <strong className="text-white">omnistack.ai/u/{handle}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadPreset}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Sample Creator</span>
          </button>

          <button 
            type="button"
            onClick={copyUrl}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2 hover:opacity-90 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Bio URL!' : 'Copy Public Bio URL'}
          </button>
        </div>
      </div>

      {/* Editor & Analytics Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
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
            setShowProModal(true);
          }}
          className="glass text-slate-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
        >
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Traffic & Click Analytics (🔒 Pro)</span>
        </button>
      </div>

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (7 cols) */}
          <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
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

            {/* Theme Selectors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300">Visual Theme</label>
                <span className="text-[10px] text-amber-400 font-bold">2 Free · 4 Pro VIP Themes</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('midnight')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'midnight' ? 'bg-purple-600/30 border-purple-500 text-white' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Midnight Cyber (Free)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('minimal')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'minimal' ? 'bg-white/15 border-slate-300 text-white' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Obsidian (Free)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('sunset')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'sunset' ? 'bg-pink-600/30 border-pink-500 text-white ring-1 ring-pink-500/40' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Sunset Neon (👑 Pro)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('emerald')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'emerald' ? 'bg-emerald-600/30 border-emerald-500 text-white ring-1 ring-emerald-500/40' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Emerald Glass (👑 Pro)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('cyberpunk')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'cyberpunk' ? 'bg-cyan-500/30 border-cyan-400 text-white ring-1 ring-cyan-500/40' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Cyberpunk (👑 Pro)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('gold')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    theme === 'gold' ? 'bg-amber-500/30 border-amber-400 text-white ring-1 ring-amber-500/40' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Nordic Gold (👑 Pro)
                </button>
              </div>
            </div>

            {/* Link Items */}
            <div>
              <div className="flex items-center justify-between mb-3 border-t border-white/5 pt-4">
                <label className="text-xs font-bold text-slate-200">Active Links ({links.length})</label>
                <button 
                  onClick={addLink} 
                  className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
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
                      <button onClick={() => removeLink(link.id)} className="text-slate-500 hover:text-rose-400 p-1.5">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Live Mobile Phone Simulation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-28">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <span>Live Interactive Mobile Preview</span>
            </div>

            {/* Mobile Device Mockup */}
            <div className={`w-[340px] rounded-[50px] p-4 border-[6px] border-slate-800 shadow-2xl relative min-h-[620px] flex flex-col justify-between transition-all ${
              theme === 'sunset'
                ? 'bg-gradient-to-b from-[#2a0845] to-[#6441a5]'
                : theme === 'emerald'
                ? 'bg-gradient-to-b from-[#062925] to-[#041a17]'
                : theme === 'cyberpunk'
                ? 'bg-gradient-to-b from-[#0a051b] via-[#12072b] to-[#1a0a3a] border-cyan-500/30'
                : theme === 'gold'
                ? 'bg-gradient-to-b from-[#0b0c10] via-[#121318] to-[#1f1d19] border-amber-500/40'
                : theme === 'minimal'
                ? 'bg-[#0f1117]'
                : 'bg-[#0a0c18]'
            }`}>
              {/* Dynamic island bar */}
              <div className="w-32 h-5 bg-black/60 rounded-full mx-auto mb-6" />

              {/* Profile Header */}
              <div className="text-center space-y-3 px-3">
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-black text-white shadow-xl border-2 ${
                  theme === 'gold' 
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-amber-500/30' 
                    : theme === 'cyberpunk'
                    ? 'bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white border-cyan-300 shadow-cyan-500/30'
                    : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white border-white/20 shadow-purple-500/30'
                }`}>
                  {displayName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">{displayName}</h3>
                  <div className={`text-[11px] font-bold mt-0.5 ${
                    theme === 'gold' ? 'text-amber-400' : theme === 'cyberpunk' ? 'text-cyan-400' : 'text-purple-300'
                  }`}>
                    @{handle}
                  </div>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed px-2 font-medium">{bio}</p>
              </div>

              {/* Links Stack */}
              <div className="space-y-3 my-6 px-1">
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

              {/* Watermark */}
              <div className="text-center text-[10px] text-slate-400 pb-3 border-t border-white/10 pt-3 font-mono">
                omnistack.ai/u/{handle}
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
      {/* Reusable Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="Bio Link Page Creator"
        featureName={proFeature}
      />
    </div>
  );
}
