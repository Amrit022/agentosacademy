'use client';

import { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  Shuffle, 
  Trash2, 
  Calendar, 
  Phone, 
  Globe 
} from 'lucide-react';

interface SignatureProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  calendarUrl: string;
  themeColor: string;
}

const SAMPLE_PROFILES: SignatureProfile[] = [
  {
    name: 'Sarah Jenkins',
    role: 'VP of Growth & Partnerships',
    company: 'Apex Venture Labs',
    email: 'sarah.jenkins@apexventure.io',
    phone: '+1 (415) 890-4321',
    website: 'apexventure.io',
    calendarUrl: 'https://cal.com/sarah-growth',
    themeColor: '#6366f1' // Indigo
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Cloud & Systems Architect',
    company: 'MatrixScale Systems',
    email: 'm.vance@matrixscale.dev',
    phone: '+1 (206) 555-0198',
    website: 'matrixscale.dev',
    calendarUrl: 'https://cal.com/marcus-vance',
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
    themeColor: '#9333ea' // Purple
  },
  {
    name: 'Alex Rivera',
    role: 'Head of Enterprise Sales',
    company: 'ScalePoint Solutions',
    email: 'alex.rivera@scalepoint.com',
    phone: '+1 (312) 555-7823',
    website: 'scalepoint.com',
    calendarUrl: 'https://cal.com/alex-scalepoint',
    themeColor: '#10b981' // Emerald
  }
];

export default function EmailSignaturePage() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [name, setName] = useState(SAMPLE_PROFILES[0].name);
  const [role, setRole] = useState(SAMPLE_PROFILES[0].role);
  const [company, setCompany] = useState(SAMPLE_PROFILES[0].company);
  const [email, setEmail] = useState(SAMPLE_PROFILES[0].email);
  const [phone, setPhone] = useState(SAMPLE_PROFILES[0].phone);
  const [website, setWebsite] = useState(SAMPLE_PROFILES[0].website);
  const [themeColor, setThemeColor] = useState(SAMPLE_PROFILES[0].themeColor);
  const [calendarUrl, setCalendarUrl] = useState(SAMPLE_PROFILES[0].calendarUrl);
  const [copied, setCopied] = useState(false);

  const colors = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Purple', value: '#9333ea' },
  ];

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
  };

  const signatureHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.45;">
  <tr>
    <td style="padding-right: 18px; vertical-align: top; border-right: 3px solid ${themeColor};">
      <div style="font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.2px;">${name || 'Your Full Name'}</div>
      <div style="font-size: 12px; font-weight: 700; color: ${themeColor}; margin-top: 2px;">${role || 'Your Professional Title'}</div>
      <div style="font-size: 12px; font-weight: 700; color: #475569; margin-top: 1px;">${company || 'Company Name'}</div>
    </td>
    <td style="padding-left: 18px; vertical-align: top;">
      ${email ? `
      <div style="margin-bottom: 4px;">
        <span style="color: #64748b; font-size: 11px;">✉</span>
        <a href="mailto:${email}" style="color: #0f172a; text-decoration: none; font-weight: 500; margin-left: 4px;">${email}</a>
      </div>` : ''}
      ${phone ? `
      <div style="margin-bottom: 4px;">
        <span style="color: #64748b; font-size: 11px;">☎</span>
        <span style="color: #334155; margin-left: 4px;">${phone}</span>
      </div>` : ''}
      ${website ? `
      <div style="margin-bottom: 8px;">
        <span style="color: #64748b; font-size: 11px;">🌐</span>
        <a href="https://${website}" target="_blank" style="color: ${themeColor}; text-decoration: none; font-weight: 700; margin-left: 4px;">${website}</a>
      </div>` : ''}
      ${calendarUrl ? `
      <div>
        <a href="${calendarUrl}" target="_blank" style="display: inline-block; background-color: ${themeColor}; color: #ffffff; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px;">
          📅 Book a 15-Min Meeting
        </a>
      </div>` : ''}
    </td>
  </tr>
</table>
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(signatureHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tool #4</span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">
              Gmail & Outlook Certified
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">HTML Email Signature Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build clickable, responsive email footers that convert leads directly from your inbox.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={handleLoadRandom}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Random Sample Profile</span>
          </button>

          <button 
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button 
            onClick={handleCopy}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-brand-500 to-indigo-500 text-white font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 hover:opacity-90 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'HTML Copied to Clipboard!' : 'Copy Raw HTML Signature'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Signature Details
            </h2>
            <span className="text-[11px] text-slate-400">
              Loaded: <span className="text-white font-semibold">{SAMPLE_PROFILES[profileIndex].name}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Job Title</label>
              <input 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. VP of Growth"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Company / Project</label>
              <input 
                type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Apex Venture Labs"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Website Domain</label>
              <input 
                type="text" 
                value={website} 
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="company.com"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Calendar Booking URL</label>
            <input 
              type="text" 
              value={calendarUrl} 
              onChange={(e) => setCalendarUrl(e.target.value)}
              placeholder="https://cal.com/your-name"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Accent Color</label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setThemeColor(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    themeColor === c.value ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-70'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview & Instructions (7 cols) */}
        <div className="lg:col-span-7 glass p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Live In-Inbox Preview</span>
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              Gmail & Outlook Verified
            </span>
          </div>

          {/* Email mockup box */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-slate-900 border border-slate-200">
            <div className="text-[11px] text-slate-400 mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Compose Reply — "Awesome, sending over the proposal!"</span>
              <span>10:48 AM</span>
            </div>

            {/* Injected HTML layout preview */}
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
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1.5">
            <div className="font-bold text-slate-200">Installation Guide:</div>
            <div>1. Click <strong>"Copy Raw HTML Signature"</strong> above.</div>
            <div>2. Open Gmail &gt; Settings (gear icon) &gt; See all settings &gt; General &gt; Signature.</div>
            <div>3. Paste directly and Save Changes!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
