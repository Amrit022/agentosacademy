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
  Flame
} from 'lucide-react';

interface SignatureStyle {
  id: string;
  name: string;
  badge: 'Free' | 'Pro';
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
  const [showProModal, setShowProModal] = useState(false);
  const [proFeature, setProFeature] = useState('');

  const currentStyle = SIGNATURE_STYLES.find(s => s.id === selectedStyleId) || SIGNATURE_STYLES[0];
  const isCurrentStylePro = currentStyle.badge === 'Pro';

  const colors = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Purple', value: '#9333ea' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
    { label: 'Blue', value: '#2563eb' },
    { label: 'Obsidian', value: '#0f172a' }
  ];

  const handleSelectStyle = (style: SignatureStyle) => {
    setSelectedStyleId(style.id);
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

  // Generate Email-compliant HTML based on selected layout
  const generateSignatureHtml = (): string => {
    const cleanEmail = email ? `<a href="mailto:${email}" style="color: #0f172a; text-decoration: none; font-weight: 500;">${email}</a>` : '';
    const cleanPhone = phone ? `<span style="color: #334155;">${phone}</span>` : '';
    const cleanWebsite = website ? `<a href="https://${website}" target="_blank" style="color: ${themeColor}; text-decoration: none; font-weight: 700;">${website}</a>` : '';
    const cleanCalendar = calendarUrl ? `
      <a href="${calendarUrl}" target="_blank" style="display: inline-block; background-color: ${themeColor}; color: #ffffff; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px; margin-top: 8px;">
        📅 Book a 15-Min Meeting
      </a>` : '';

    if (selectedStyleId === 'horizontal') {
      // Free Style 2: Corporate Horizontal
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.45;">
  <tr>
    <td style="padding-bottom: 6px; border-bottom: 2px solid ${themeColor};">
      <span style="font-size: 16px; font-weight: 800; color: #0f172a;">${name || 'Your Full Name'}</span>
      <span style="color: #cbd5e1; margin: 0 8px;">|</span>
      <span style="font-size: 13px; font-weight: 700; color: ${themeColor};">${role || 'Professional Title'}</span>
      <span style="color: #cbd5e1; margin: 0 8px;">•</span>
      <span style="font-size: 13px; font-weight: 600; color: #475569;">${company || 'Company Name'}</span>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 8px;">
      <span style="color: #64748b; font-size: 11px;">✉</span> ${cleanEmail}
      ${phone ? `<span style="color: #cbd5e1; margin: 0 8px;">•</span> <span style="color: #64748b; font-size: 11px;">☎</span> ${cleanPhone}` : ''}
      ${website ? `<span style="color: #cbd5e1; margin: 0 8px;">•</span> <span style="color: #64748b; font-size: 11px;">🌐</span> ${cleanWebsite}` : ''}
    </td>
  </tr>
  ${calendarUrl ? `<tr><td style="padding-top: 6px;">${cleanCalendar}</td></tr>` : ''}
</table>`.trim();
    }

    if (selectedStyleId === 'compact') {
      // Free Style 3: Compact Modern Card
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #334155; line-height: 1.4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; background-color: #f8fafc;">
  <tr>
    <td style="vertical-align: top;">
      <div style="font-size: 15px; font-weight: 800; color: #0f172a;">${name || 'Your Full Name'}</div>
      <div style="font-size: 12px; font-weight: 700; color: ${themeColor}; margin-top: 1px;">${role || 'Professional Title'} — ${company || 'Company'}</div>
      <div style="margin-top: 6px; font-size: 11px; color: #64748b;">
        ${email ? `<span>${email}</span>` : ''}
        ${phone ? `<span style="margin: 0 6px;">|</span><span>${phone}</span>` : ''}
        ${website ? `<span style="margin: 0 6px;">|</span><span style="color: ${themeColor}; font-weight: 600;">${website}</span>` : ''}
      </div>
    </td>
  </tr>
</table>`.trim();
    }

    if (selectedStyleId === 'executive') {
      // PRO Style 1: Executive Tech Leader (Avatar + Verified checkmark + Social pills)
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.45;">
  <tr>
    ${showAvatar && avatarUrl ? `
    <td style="padding-right: 18px; vertical-align: top;">
      <img src="${avatarUrl}" alt="${name}" width="68" height="68" style="border-radius: 50%; border: 3px solid ${themeColor}; display: block; object-fit: cover;" />
    </td>` : ''}
    <td style="vertical-align: top; border-left: 2px solid #e2e8f0; padding-left: 18px;">
      <div style="font-size: 17px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px;">
        ${name || 'Your Full Name'}
        <span style="display: inline-block; vertical-align: middle; margin-left: 4px; color: #0284c7; font-size: 14px;">✔</span>
      </div>
      <div style="font-size: 13px; font-weight: 700; color: ${themeColor}; margin-top: 1px;">${role || 'VP / Co-Founder'}</div>
      <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-top: 1px;">${company || 'Global Technologies Inc.'}</div>
      
      <div style="margin-top: 8px; font-size: 12px;">
        <span style="color: #64748b;">E:</span> ${cleanEmail} &nbsp;•&nbsp;
        <span style="color: #64748b;">M:</span> ${cleanPhone} &nbsp;•&nbsp;
        <span style="color: #64748b;">W:</span> ${cleanWebsite}
      </div>

      ${showSocials ? `
      <div style="margin-top: 8px;">
        ${linkedin ? `<a href="https://${linkedin}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-decoration: none; margin-right: 6px;">LinkedIn</a>` : ''}
        ${twitter ? `<a href="https://${twitter}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-decoration: none; margin-right: 6px;">X / Twitter</a>` : ''}
        ${github ? `<a href="https://${github}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-decoration: none;">GitHub</a>` : ''}
      </div>` : ''}

      ${calendarUrl ? cleanCalendar : ''}
    </td>
  </tr>
</table>`.trim();
    }

    if (selectedStyleId === 'nordic') {
      // PRO Style 2: Nordic Luxury Minimal (Editorial Serif + Hairline Dividers)
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, 'Times New Roman', serif; font-size: 13px; color: #1c1917; line-height: 1.5; letter-spacing: 0.2px;">
  <tr>
    <td style="padding-bottom: 6px;">
      <div style="font-size: 18px; font-weight: 400; color: #0c0a09; text-transform: uppercase; letter-spacing: 1.5px;">${name || 'YOUR NAME'}</div>
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${themeColor}; margin-top: 3px;">
        ${role || 'Creative Director'} &mdash; ${company || 'Studio'}
      </div>
    </td>
  </tr>
  <tr>
    <td style="border-top: 1px solid #d6d3d1; padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; color: #78716c;">
      <span>T: ${phone || '+1 000 000 0000'}</span> &nbsp;|&nbsp;
      <span>E: <a href="mailto:${email}" style="color: #1c1917; text-decoration: none;">${email}</a></span> &nbsp;|&nbsp;
      <span>W: <a href="https://${website}" target="_blank" style="color: #1c1917; text-decoration: none; font-weight: 600;">${website}</a></span>
    </td>
  </tr>
  ${calendarUrl ? `
  <tr>
    <td style="padding-top: 8px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
      <a href="${calendarUrl}" target="_blank" style="color: ${themeColor}; text-decoration: underline; font-size: 11px; font-weight: 700;">
        Schedule a Private Consultation &rarr;
      </a>
    </td>
  </tr>` : ''}
</table>`.trim();
    }

    if (selectedStyleId === 'wallstreet') {
      // PRO Style 3: Wall Street & Legal (Corporate Grid + Confidential Disclaimer)
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 12px; color: #0f172a; line-height: 1.45; max-width: 580px;">
  <tr>
    <td style="padding-right: 18px; vertical-align: top; border-right: 2px solid ${themeColor};">
      <div style="font-size: 15px; font-weight: 800; color: #090d16; text-transform: uppercase; letter-spacing: 0.5px;">${name || 'Your Full Name'}</div>
      <div style="font-size: 11px; font-weight: 700; color: ${themeColor};">${role || 'Partner & Legal Counsel'}</div>
      <div style="font-size: 11px; font-weight: 700; color: #475569; margin-top: 1px;">${company || 'Capital Markets Advisors'}</div>
      <div style="margin-top: 6px; font-size: 10px; font-weight: 700; color: #0284c7; background-color: #f0f9ff; padding: 2px 6px; border-radius: 4px; display: inline-block;">
        🔒 FINRA / ISO-27001 Certified
      </div>
    </td>
    <td style="padding-left: 18px; vertical-align: top;">
      <div><strong style="color: #475569;">Direct:</strong> ${cleanPhone}</div>
      <div style="margin-top: 2px;"><strong style="color: #475569;">Secure:</strong> ${cleanEmail}</div>
      <div style="margin-top: 2px;"><strong style="color: #475569;">Portal:</strong> ${cleanWebsite}</div>
    </td>
  </tr>
  ${showDisclaimer ? `
  <tr>
    <td colspan="2" style="border-top: 1px solid #e2e8f0; margin-top: 10px; padding-top: 8px; font-size: 9px; color: #94a3b8; line-height: 1.35;">
      <strong>CONFIDENTIALITY NOTICE:</strong> This electronic transmission contains confidential and legally privileged information intended solely for the recipient. If you are not the named addressee, any dissemination, copying, or disclosure is strictly prohibited.
    </td>
  </tr>` : ''}
</table>`.trim();
    }

    if (selectedStyleId === 'creative') {
      // PRO Style 4: Creative Agency Neon (Vibrant Gradient Bar + Social Pills)
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #0f172a; line-height: 1.45;">
  <tr>
    <td style="width: 5px; background: linear-gradient(180deg, ${themeColor} 0%, #ec4899 100%); border-radius: 3px;"></td>
    <td style="padding-left: 16px; vertical-align: top;">
      <div style="font-size: 17px; font-weight: 900; color: #090d16; letter-spacing: -0.2px;">${name || 'Your Full Name'} ✨</div>
      <div style="font-size: 12px; font-weight: 700; color: ${themeColor};">${role || 'Design Lead'} &bull; <span style="color: #64748b;">${company || 'Agency'}</span></div>
      
      <div style="margin-top: 6px; font-size: 12px; color: #334155;">
        ${email ? `<a href="mailto:${email}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${email}</a>` : ''}
        ${website ? ` &nbsp;✦&nbsp; <a href="https://${website}" target="_blank" style="color: ${themeColor}; text-decoration: none; font-weight: 700;">${website}</a>` : ''}
      </div>

      ${calendarUrl ? cleanCalendar : ''}
    </td>
  </tr>
</table>`.trim();
    }

    if (selectedStyleId === 'closer') {
      // PRO Style 5: High-Impact Sales Closer (Banner + 5-Star Rating + WhatsApp CTA)
      return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.45; max-width: 540px;">
  ${showPromo && promoText ? `
  <tr>
    <td colspan="2" style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 12px; font-size: 11px; font-weight: 700; color: #92400e; margin-bottom: 8px;">
      ${promoText}
    </td>
  </tr>
  <tr><td height="8"></td></tr>` : ''}
  <tr>
    <td style="padding-right: 16px; vertical-align: top; border-right: 3px solid ${themeColor};">
      <div style="font-size: 16px; font-weight: 900; color: #0f172a;">${name || 'Your Full Name'}</div>
      <div style="font-size: 12px; font-weight: 700; color: ${themeColor};">${role || 'Head of Client Growth'}</div>
      <div style="font-size: 12px; font-weight: 600; color: #475569;">${company || 'Enterprise SaaS'}</div>
      <div style="margin-top: 4px; font-size: 11px; color: #eab308;">★★★★★ <span style="color: #64748b; font-size: 10px; font-weight: 700;">(5.0 / 140+ Client Reviews)</span></div>
    </td>
    <td style="padding-left: 16px; vertical-align: top;">
      <div><span style="color: #64748b; font-size: 11px;">✉</span> ${cleanEmail}</div>
      <div style="margin-top: 2px;"><span style="color: #64748b; font-size: 11px;">📱 Direct:</span> ${cleanPhone}</div>
      <div style="margin-top: 2px;"><span style="color: #64748b; font-size: 11px;">🌐 Web:</span> ${cleanWebsite}</div>
      ${calendarUrl ? cleanCalendar : ''}
    </td>
  </tr>
</table>`.trim();
    }

    // Default / Minimal Classic (Free Style 1)
    return `
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
        ${cleanEmail}
      </div>` : ''}
      ${phone ? `
      <div style="margin-bottom: 4px;">
        <span style="color: #64748b; font-size: 11px;">☎</span>
        ${cleanPhone}
      </div>` : ''}
      ${website ? `
      <div style="margin-bottom: 8px;">
        <span style="color: #64748b; font-size: 11px;">🌐</span>
        ${cleanWebsite}
      </div>` : ''}
      ${cleanCalendar}
    </td>
  </tr>
</table>`.trim();
  };

  const handleCopy = () => {
    if (isCurrentStylePro) {
      setProFeature(`Unlock "${currentStyle.name}" & 5+ Certified Pro Signature Templates`);
      setShowProModal(true);
      return;
    }

    const html = generateSignatureHtml();
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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
            <span className="text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 8 Premium Layouts
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">HTML Email Signature Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build clickable, responsive email footers that convert leads directly from your inbox across all email clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={handleLoadRandom}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Random Sample Profile</span>
          </button>

          <button 
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button 
            onClick={handleCopy}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer ${
              isCurrentStylePro 
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-amber-500/30 hover:opacity-95' 
                : 'bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white shadow-brand-500/25 hover:opacity-95'
            }`}
          >
            {isCurrentStylePro ? (
              <>
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Export Pro HTML Signature</span>
                <Lock className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </>
            ) : (
              <>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'HTML Copied to Clipboard!' : 'Copy Free HTML Signature'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* STYLE / TEMPLATE SELECTOR CAROUSEL */}
      <div className="glass p-5 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Choose Email Signature Style (3 Free + 5 Pro Layouts)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 3 Free
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
              <Crown className="w-3 h-3" /> 5 Pro Styles
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {SIGNATURE_STYLES.map((style) => {
            const isSelected = selectedStyleId === style.id;
            const isPro = style.badge === 'Pro';
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleSelectStyle(style)}
                className={`relative p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? isPro 
                      ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30' 
                      : 'bg-brand-500/20 border-brand-500 ring-2 ring-brand-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                    isPro 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {isPro ? '👑 PRO' : 'FREE'}
                  </span>
                  {isPro && !isSelected && <Lock className="w-3 h-3 text-slate-400" />}
                </div>

                <div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {style.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                    {style.category}
                  </div>
                </div>
              </button>
            );
          })}
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
              Editing: <span className="text-white font-semibold">{name || 'Custom'}</span>
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
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Company / Organization</label>
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

          {/* Avatar / Headshot URL (Pro feature active in Executive style) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Headshot Photo URL (Featured in Pro Executive Layout)</span>
              </label>
              <button 
                type="button" 
                onClick={() => setShowAvatar(!showAvatar)}
                className="text-[10px] text-brand-300 hover:underline"
              >
                {showAvatar ? 'Hide Photo' : 'Show Photo'}
              </button>
            </div>
            <input 
              type="text" 
              value={avatarUrl} 
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">LinkedIn</label>
              <input 
                type="text" 
                value={linkedin} 
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="linkedin.com/in/..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[11px] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">X / Twitter</label>
              <input 
                type="text" 
                value={twitter} 
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="x.com/username"
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[11px] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">GitHub / Portfolio</label>
              <input 
                type="text" 
                value={github} 
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github.com/..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[11px] outline-none"
              />
            </div>
          </div>

          {/* Calendar Booking & Promo Text */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Calendar Booking URL (Cal.com / Calendly)</label>
            <input 
              type="text" 
              value={calendarUrl} 
              onChange={(e) => setCalendarUrl(e.target.value)}
              placeholder="https://cal.com/your-name"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Sales Offer / Promo Banner (Featured in Pro Closer)</label>
            <input 
              type="text" 
              value={promoText} 
              onChange={(e) => setPromoText(e.target.value)}
              placeholder="🔥 Special Q4 Offer: Book a 15-min discovery call"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-amber-500"
            />
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Accent Brand Color</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setThemeColor(c.value)}
                  className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                    themeColor === c.value ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
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
              <span>Live In-Inbox Preview: <strong className="text-white">{currentStyle.name}</strong></span>
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                isCurrentStylePro 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {isCurrentStylePro ? '👑 Pro Exclusive Layout' : 'Free Layout'}
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                Gmail & Outlook Verified
              </span>
            </div>
          </div>

          {/* Pro Banner Warning if Pro Style Selected */}
          {isCurrentStylePro && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-300 text-xs">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You are previewing a <strong>Pro Exclusive Signature Style</strong>. Upgrade to OmniStack Pro to copy raw HTML.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProFeature(`Unlock "${currentStyle.name}" & 5+ Certified Pro Signature Templates`);
                  setShowProModal(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-[11px] shrink-0 hover:bg-amber-400 transition cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>
          )}

          {/* Email mockup box */}
          <div className="bg-white p-7 sm:p-9 rounded-2xl shadow-2xl text-slate-900 border border-slate-200 overflow-x-auto">
            <div className="text-[11px] text-slate-400 mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Compose Reply — "Awesome, sending over the proposal!"</span>
              <span>10:48 AM</span>
            </div>

            {/* DYNAMIC RENDERING OF SIGNATURE */}
            {selectedStyleId === 'horizontal' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b', lineHeight: 1.45 }}>
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: '6px', borderBottom: `2px solid ${themeColor}` }}>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{name || 'Your Full Name'}</span>
                      <span style={{ color: '#cbd5e1', margin: '0 8px' }}>|</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: themeColor }}>{role || 'Professional Title'}</span>
                      <span style={{ color: '#cbd5e1', margin: '0 8px' }}>•</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{company || 'Company Name'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: '8px' }}>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>✉</span> <a href={`mailto:${email}`} style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>{email}</a>
                      {phone && <><span style={{ color: '#cbd5e1', margin: '0 8px' }}>•</span> <span style={{ color: '#64748b', fontSize: '11px' }}>☎</span> <span style={{ color: '#334155' }}>{phone}</span></>}
                      {website && <><span style={{ color: '#cbd5e1', margin: '0 8px' }}>•</span> <span style={{ color: '#64748b', fontSize: '11px' }}>🌐</span> <a href={`https://${website}`} target="_blank" style={{ color: themeColor, textDecoration: 'none', fontWeight: 700 }}>{website}</a></>}
                    </td>
                  </tr>
                  {calendarUrl && (
                    <tr>
                      <td style={{ paddingTop: '8px' }}>
                        <a href={calendarUrl} target="_blank" style={{ display: 'inline-block', backgroundColor: themeColor, color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>
                          📅 Book a 15-Min Meeting
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {selectedStyleId === 'compact' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#334155', lineHeight: 1.4, border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', backgroundColor: '#f8fafc' }}>
                <tbody>
                  <tr>
                    <td>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{name || 'Your Full Name'}</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: themeColor, marginTop: '1px' }}>{role || 'Professional Title'} — {company || 'Company'}</div>
                      <div style={{ marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
                        {email && <span>{email}</span>}
                        {phone && <><span style={{ margin: '0 6px' }}>|</span><span>{phone}</span></>}
                        {website && <><span style={{ margin: '0 6px' }}>|</span><span style={{ color: themeColor, fontWeight: 600 }}>{website}</span></>}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {selectedStyleId === 'executive' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1e293b', lineHeight: 1.45 }}>
                <tbody>
                  <tr>
                    {showAvatar && avatarUrl && (
                      <td style={{ paddingRight: '18px', verticalAlign: 'top' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatarUrl} alt={name} width="68" height="68" style={{ borderRadius: '50%', border: `3px solid ${themeColor}`, display: 'block', objectFit: 'cover' }} />
                      </td>
                    )}
                    <td style={{ verticalAlign: 'top', borderLeft: '2px solid #e2e8f0', paddingLeft: '18px' }}>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{name || 'Your Full Name'}</span>
                        <span style={{ color: '#0284c7', fontSize: '14px' }}>✔</span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: themeColor, marginTop: '1px' }}>{role || 'VP / Co-Founder'}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginTop: '1px' }}>{company || 'Global Technologies Inc.'}</div>
                      
                      <div style={{ marginTop: '8px', fontSize: '12px' }}>
                        <span style={{ color: '#64748b' }}>E:</span> <a href={`mailto:${email}`} style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>{email}</a> &nbsp;•&nbsp;
                        <span style={{ color: '#64748b' }}>M:</span> <span style={{ color: '#334155' }}>{phone}</span> &nbsp;•&nbsp;
                        <span style={{ color: '#64748b' }}>W:</span> <a href={`https://${website}`} target="_blank" style={{ color: themeColor, textDecoration: 'none', fontWeight: 700 }}>{website}</a>
                      </div>

                      {showSocials && (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                          {linkedin && <span style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>LinkedIn</span>}
                          {twitter && <span style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>X / Twitter</span>}
                          {github && <span style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>GitHub</span>}
                        </div>
                      )}

                      {calendarUrl && (
                        <div style={{ marginTop: '10px' }}>
                          <a href={calendarUrl} target="_blank" style={{ display: 'inline-block', backgroundColor: themeColor, color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>
                            📅 Book a 15-Min Meeting
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {selectedStyleId === 'nordic' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#1c1917', lineHeight: 1.5 }}>
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: '6px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 400, color: '#0c0a09', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{name || 'YOUR NAME'}</div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: themeColor, marginTop: '3px' }}>
                        {role || 'Creative Director'} &mdash; {company || 'Studio'}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ borderTop: '1px solid #d6d3d1', paddingTop: '8px', fontFamily: 'sans-serif', fontSize: '11px', color: '#78716c' }}>
                      <span>T: {phone || '+1 000 000 0000'}</span> &nbsp;|&nbsp;
                      <span>E: {email}</span> &nbsp;|&nbsp;
                      <span style={{ color: '#1c1917', fontWeight: 600 }}>W: {website}</span>
                    </td>
                  </tr>
                  {calendarUrl && (
                    <tr>
                      <td style={{ paddingTop: '8px', fontFamily: 'sans-serif' }}>
                        <span style={{ color: themeColor, textDecoration: 'underline', fontSize: '11px', fontWeight: 700 }}>
                          Schedule a Private Consultation &rarr;
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {selectedStyleId === 'wallstreet' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#0f172a', lineHeight: 1.45, maxWidth: '580px' }}>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: '18px', verticalAlign: 'top', borderRight: `2px solid ${themeColor}` }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#090d16', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{name || 'Your Full Name'}</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: themeColor }}>{role || 'Partner & Legal Counsel'}</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginTop: '1px' }}>{company || 'Capital Markets Advisors'}</div>
                      <div style={{ marginTop: '6px', fontSize: '10px', fontWeight: 700, color: '#0284c7', backgroundColor: '#f0f9ff', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                        🔒 FINRA / ISO-27001 Certified
                      </div>
                    </td>
                    <td style={{ paddingLeft: '18px', verticalAlign: 'top' }}>
                      <div><strong style={{ color: '#475569' }}>Direct:</strong> {phone}</div>
                      <div style={{ marginTop: '2px' }}><strong style={{ color: '#475569' }}>Secure:</strong> {email}</div>
                      <div style={{ marginTop: '2px' }}><strong style={{ color: '#475569' }}>Portal:</strong> {website}</div>
                    </td>
                  </tr>
                  {showDisclaimer && (
                    <tr>
                      <td colSpan={2} style={{ borderTop: '1px solid #e2e8f0', marginTop: '10px', paddingTop: '8px', fontSize: '9px', color: '#94a3b8', lineHeight: 1.35 }}>
                        <strong>CONFIDENTIALITY NOTICE:</strong> This electronic transmission contains confidential and legally privileged information intended solely for the recipient. If you are not the named addressee, any dissemination, copying, or disclosure is strictly prohibited.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {selectedStyleId === 'creative' && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#0f172a', lineHeight: 1.45 }}>
                <tbody>
                  <tr>
                    <td style={{ width: '5px', background: `linear-gradient(180deg, ${themeColor} 0%, #ec4899 100%)`, borderRadius: '3px' }}></td>
                    <td style={{ paddingLeft: '16px', verticalAlign: 'top' }}>
                      <div style={{ fontSize: '17px', fontWeight: 900, color: '#090d16', letterSpacing: '-0.2px' }}>{name || 'Your Full Name'} ✨</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: themeColor }}>{role || 'Design Lead'} &bull; <span style={{ color: '#64748b' }}>{company || 'Agency'}</span></div>
                      
                      <div style={{ marginTop: '6px', fontSize: '12px', color: '#334155' }}>
                        <span style={{ fontWeight: 600 }}>{email}</span>
                        {website && <><span style={{ margin: '0 6px', color: themeColor }}>✦</span><span style={{ color: themeColor, fontWeight: 700 }}>{website}</span></>}
                      </div>

                      {calendarUrl && (
                        <div style={{ marginTop: '8px' }}>
                          <span style={{ display: 'inline-block', backgroundColor: themeColor, color: '#ffffff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                            📅 Let's Chat (15 Min)
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

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

            {/* Fallback to Minimal Classic */}
            {selectedStyleId === 'classic' && (
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

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1.5">
            <div className="font-bold text-slate-200">How to Install in Gmail / Outlook:</div>
            <div>1. Choose your preferred style above (3 Free or 5 Pro).</div>
            <div>2. Click <strong>"{isCurrentStylePro ? 'Export Pro HTML Signature' : 'Copy Free HTML Signature'}"</strong> above.</div>
            <div>3. Open Gmail &gt; Settings (gear icon) &gt; See all settings &gt; General &gt; Signature.</div>
            <div>4. Paste directly into the signature box and save changes!</div>
          </div>
        </div>
      </div>

      {/* Reusable Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="HTML Email Signature Studio"
        featureName={proFeature}
      />
    </div>
  );
}
