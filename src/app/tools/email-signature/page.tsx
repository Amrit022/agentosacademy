'use client';

import { useState } from 'react';
import { Mail, Copy, Check, Sparkles, Eye, ShieldCheck } from 'lucide-react';

export default function EmailSignaturePage() {
  const [name, setName] = useState('Amrit Gupta');
  const [role, setRole] = useState('Founder & Lead Product Architect');
  const [company, setCompany] = useState('AgentOS Academy');
  const [email, setEmail] = useState('amrit@agentosacademy.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [website, setWebsite] = useState('agentosacademy.com');
  const [themeColor, setThemeColor] = useState('#6366f1'); // Indigo
  const [calendarUrl, setCalendarUrl] = useState('https://cal.com/amritgupta');
  const [copied, setCopied] = useState(false);

  const colors = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Cyan', value: '#06b6d4' },
  ];

  const signatureHtml = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.45;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top; border-right: 3px solid ${themeColor};">
      <div style="font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.2px;">${name}</div>
      <div style="font-size: 12px; font-weight: 600; color: ${themeColor}; margin-top: 2px;">${role}</div>
      <div style="font-size: 12px; font-weight: 700; color: #475569; margin-top: 1px;">${company}</div>
    </td>
    <td style="padding-left: 16px; vertical-align: top;">
      <div style="margin-bottom: 4px;">
        <span style="color: #64748b; font-size: 11px;">✉</span>
        <a href="mailto:${email}" style="color: #0f172a; text-decoration: none; font-weight: 500; margin-left: 4px;">${email}</a>
      </div>
      <div style="margin-bottom: 4px;">
        <span style="color: #64748b; font-size: 11px;">☎</span>
        <span style="color: #334155; margin-left: 4px;">${phone}</span>
      </div>
      <div style="margin-bottom: 6px;">
        <span style="color: #64748b; font-size: 11px;">🌐</span>
        <a href="https://${website}" target="_blank" style="color: ${themeColor}; text-decoration: none; font-weight: 600; margin-left: 4px;">${website}</a>
      </div>
      <div>
        <a href="${calendarUrl}" target="_blank" style="display: inline-block; background-color: ${themeColor}; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px;">
          📅 Book a 15-Min Call
        </a>
      </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tool #4</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">HTML Email Signature Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build clickable, responsive email footers that convert leads directly from your inbox.
          </p>
        </div>
        <button 
          onClick={handleCopy}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-brand-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:opacity-90 transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'HTML Copied to Clipboard!' : 'Copy Raw HTML Signature'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Editor Form */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-amber-400" /> Signature Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Title</label>
              <input 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Project</label>
              <input 
                type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Website Domain</label>
              <input 
                type="text" 
                value={website} 
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Calendar Booking URL</label>
            <input 
              type="text" 
              value={calendarUrl} 
              onChange={(e) => setCalendarUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Accent Highlight Color</label>
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

        {/* Live Email Signature Preview Card */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-400" /> Live Rendered Preview
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              Gmail & Outlook Verified
            </span>
          </div>

          {/* Email mockup box */}
          <div className="bg-white p-7 rounded-2xl shadow-2xl text-slate-900 border border-slate-200">
            <div className="text-[11px] text-slate-400 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Reply to client: "Sounds great! Looking forward to chatting."</span>
              <span>10:42 AM</span>
            </div>

            {/* Injected HTML layout preview */}
            <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b' }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '16px', verticalAlign: 'top', borderRight: `3px solid ${themeColor}` }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{name}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: themeColor, marginTop: '2px' }}>{role}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginTop: '1px' }}>{company}</div>
                  </td>
                  <td style={{ paddingLeft: '16px', verticalAlign: 'top' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>✉</span>
                      <span style={{ color: '#0f172a', fontWeight: 500, marginLeft: '4px' }}>{email}</span>
                    </div>
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>☎</span>
                      <span style={{ color: '#334155', marginLeft: '4px' }}>{phone}</span>
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>🌐</span>
                      <span style={{ color: themeColor, fontWeight: 600, marginLeft: '4px' }}>{website}</span>
                    </div>
                    <div>
                      <span 
                        style={{
                          display: 'inline-block',
                          backgroundColor: themeColor,
                          color: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: 700
                        }}
                      >
                        📅 Book a 15-Min Call
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-200">How to use:</div>
            <div>1. Click <strong>"Copy Raw HTML Signature"</strong> above.</div>
            <div>2. Open Gmail &gt; Settings &gt; General &gt; Signature &gt; Paste.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
