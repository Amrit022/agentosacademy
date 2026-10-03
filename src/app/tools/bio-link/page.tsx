'use client';

import { useState } from 'react';
import { Link2, Plus, Trash2, ExternalLink, Copy, Check, Sparkles, Smartphone } from 'lucide-react';

export default function BioLinkPage() {
  const [handle, setHandle] = useState('amritgupta');
  const [displayName, setDisplayName] = useState('Amrit Gupta');
  const [bio, setBio] = useState('Full Stack SaaS Engineer & Founder. Building digital products from India for the world 🇮🇳 🌍');
  const [theme, setTheme] = useState<'glass' | 'gradient' | 'minimal'>('glass');
  const [links, setLinks] = useState([
    { title: '🚀 My Digital Micro-Tools', url: 'https://agentosacademy.com', icon: '⚡' },
    { title: '💼 Hire Me for Custom Development', url: 'https://upwork.com', icon: '💻' },
    { title: '📺 Watch My Tech & SaaS Tutorials', url: 'https://youtube.com', icon: '🎥' },
    { title: '☕ Support My Work (Coffee/Tips)', url: 'https://buymeacoffee.com', icon: '☕' },
  ]);
  const [copied, setCopied] = useState(false);

  const addLink = () => {
    setLinks([...links, { title: 'New Custom Link', url: 'https://', icon: '🔗' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://agentosacademy.com/u/${handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Tool #2</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Social Media Bio Link Creator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build your custom, zero-commission link-in-bio page under <strong className="text-white">agentosacademy.com/u/{handle}</strong>.
          </p>
        </div>
        <button 
          onClick={copyUrl}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 hover:opacity-90 transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Bio URL!' : 'Copy Public Link'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Editor Settings */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-purple-400" /> Page Configuration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username Slug</label>
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-400">
                <span>/u/</span>
                <input 
                  type="text" 
                  value={handle} 
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="bg-transparent text-white outline-none font-semibold ml-1 w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Display Name</label>
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bio Description</label>
            <textarea 
              rows={2} 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Color Theme</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('glass')}
                className={`py-2 text-xs font-semibold rounded-xl border transition ${
                  theme === 'glass' ? 'bg-purple-500/20 border-purple-500 text-white' : 'glass text-slate-400 border-white/5'
                }`}
              >
                Dark Glass
              </button>
              <button
                type="button"
                onClick={() => setTheme('gradient')}
                className={`py-2 text-xs font-semibold rounded-xl border transition ${
                  theme === 'gradient' ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-pink-500 text-white' : 'glass text-slate-400 border-white/5'
                }`}
              >
                Neon Gradient
              </button>
              <button
                type="button"
                onClick={() => setTheme('minimal')}
                className={`py-2 text-xs font-semibold rounded-xl border transition ${
                  theme === 'minimal' ? 'bg-white/10 border-slate-400 text-white' : 'glass text-slate-400 border-white/5'
                }`}
              >
                Ultra Minimal
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 border-t border-white/5 pt-4">
              <label className="text-xs font-semibold text-slate-300">Active Link Buttons ({links.length})</label>
              <button 
                onClick={addLink} 
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Button
              </button>
            </div>

            <div className="space-y-3">
              {links.map((link, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <input
                    type="text"
                    value={link.icon}
                    onChange={(e) => {
                      const next = [...links];
                      next[idx].icon = e.target.value;
                      setLinks(next);
                    }}
                    className="w-10 text-center py-1.5 rounded-lg bg-white/5 text-base border border-white/10 outline-none"
                    title="Emoji icon"
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
                      className="w-full text-xs font-semibold text-white bg-transparent outline-none"
                      placeholder="Button Title"
                    />
                    <input 
                      type="text" 
                      value={link.url}
                      onChange={(e) => {
                        const next = [...links];
                        next[idx].url = e.target.value;
                        setLinks(next);
                      }}
                      className="w-full text-[11px] text-slate-400 bg-transparent outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <button onClick={() => removeLink(idx)} className="text-slate-500 hover:text-rose-400 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Phone Simulation */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>Live Mobile View</span>
          </div>

          <div className="w-[330px] rounded-[48px] p-4 bg-[#070b14] border-[6px] border-slate-700 shadow-2xl relative min-h-[580px] flex flex-col justify-between">
            {/* Camera notch */}
            <div className="w-32 h-5 bg-slate-800 rounded-full mx-auto mb-6" />

            {/* Profile Avatar & Bio */}
            <div className="text-center space-y-3 px-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mx-auto flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-purple-500/30">
                {displayName.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">{displayName}</h3>
                <div className="text-[11px] text-purple-400 font-semibold mt-0.5">@{handle}</div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed px-2">{bio}</p>
            </div>

            {/* Links Stack */}
            <div className="space-y-2.5 my-6 px-1">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between text-xs font-bold transition-all shadow-sm ${
                    theme === 'gradient'
                      ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-pink-500/30 text-white hover:scale-105'
                      : theme === 'minimal'
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      : 'glass border-white/10 text-slate-100 hover:bg-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.icon}</span>
                    <span>{l.title}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>

            {/* Watermark */}
            <div className="text-center text-[10px] text-slate-500 pb-2 border-t border-white/5 pt-3">
              agentosacademy.com/u/{handle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
