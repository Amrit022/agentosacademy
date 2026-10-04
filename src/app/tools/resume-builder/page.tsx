'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  Sparkles,
  Lock, 
  Download, 
  Check, 
  Eye, 
  Plus, 
  Trash2, 
  Printer, 
  FileCheck, 
  Award, 
  Shuffle, 
  RotateCcw,
  Palette,
  FileText,
  Crown,
  X,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  TrendingUp,
  Code2,
  Layers,
  Compass,
  ArrowLeft,
  Loader2,
  Zap,
  Briefcase,
  Type,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';

const RANDOM_PROFILES = [
  {
    name: 'Elena Rostova',
    title: 'Senior Product Designer & UX Strategist',
    email: 'elena.design@gmail.com',
    phone: '+49 152 9876543',
    location: 'Berlin, Germany (Open to Remote)',
    linkedin: 'linkedin.com/in/elena-rostova-ux',
    github: 'dribbble.com/elenarostova',
    summary: 'Lead Product Designer with 6+ years specializing in design systems, fintech SaaS interfaces, and user onboarding flows. Spearheaded design overhaul for an institutional crypto exchange, raising conversion rates by 34% and reducing churn by 22%.',
    skills: 'Figma, Design Systems, UX Research, Prototyping, Wireframing, User Testing, HTML/CSS, Tailwind CSS, Mobile App UI',
    experiences: [
      {
        role: 'Lead UX/UI Designer',
        company: 'FintechWave AG',
        period: '2023 - Present',
        location: 'Berlin, Germany',
        points: '• Redesigned core onboarding workflow for 350k active users, lifting registration completion from 61% to 83%.\n• Built and documented a comprehensive component design system in Figma adopted by 18 frontend engineers.\n• Conducted 40+ usability testing interviews to identify payment drop-off barriers, saving $120k in abandoned checkouts.'
      },
      {
        role: 'Senior Product Designer',
        company: 'Studio Berlin Digital',
        period: '2021 - 2023',
        location: 'Berlin, Germany',
        points: '• Delivered 12 multi-platform web applications for European startup clients on strict 6-week release cycles.\n• Created interactive micro-interactions and motion prototypes that boosted app store reviews to 4.8 stars.'
      }
    ],
    education: [
      {
        degree: 'B.A. in Visual Communication & Interaction Design',
        institution: 'Berlin University of the Arts',
        period: '2017 - 2021',
        gpa: 'First Class Honours (1.2)'
      }
    ]
  },
  {
    name: 'David K. Chen',
    title: 'Lead Cloud & DevOps Infrastructure Architect',
    email: 'david.chen.cloud@proton.me',
    phone: '+1 (415) 890-4321',
    location: 'Austin, TX (Remote)',
    linkedin: 'linkedin.com/in/david-chen-cloud',
    github: 'github.com/davidkchen',
    summary: 'Cloud Infrastructure Architect with 8+ years designing zero-downtime Kubernetes clusters, multi-region AWS environments, and automated Terraform pipelines. Reduced enterprise cloud infrastructure costs by $380,000 annually while sustaining 99.99% uptime.',
    skills: 'AWS, Kubernetes, Terraform, Docker, CI/CD, Helm, Prometheus, Python, Go, Bash, Linux Kernel, SOC2 Compliance',
    experiences: [
      {
        role: 'Principal DevOps Architect',
        company: 'ScaleGrid Systems',
        period: '2022 - Present',
        location: 'San Francisco, CA',
        points: '• Orchestrated migration of 45 monolithic microservices to AWS EKS Kubernetes clusters serving 15M daily requests.\n• Automated multi-account Terraform infrastructure reducing developer deployment turnaround from 3 days to 8 minutes.\n• Spearheaded SOC2 Type II security compliance audit with zero unresolved infrastructural findings.'
      },
      {
        role: 'Senior Cloud Engineer',
        company: 'HyperScale Corp',
        period: '2019 - 2022',
        location: 'Austin, TX',
        points: '• Configured global CloudFront edge caching and Redis caching layers, cutting database load by 62%.\n• Designed automated disaster recovery failover across US-East and US-West with RPO < 30 seconds.'
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Engineering',
        institution: 'University of Texas at Austin',
        period: '2015 - 2019',
        gpa: '3.91 / 4.0'
      }
    ]
  },
  {
    name: 'Priya Sharma',
    title: 'Growth Marketing Director & Acquisition Specialist',
    email: 'priya.sharma.growth@gmail.com',
    phone: '+44 20 7946 0912',
    location: 'London, UK (Remote Worldwide)',
    linkedin: 'linkedin.com/in/priya-growth-marketer',
    github: 'priyasharma.marketing',
    summary: 'Performance marketing and organic growth leader with 7 years scaling B2B SaaS ARR from $500k to $6M+. Expert in Google Ads, LinkedIn outbound automation, programmatic SEO, and data-driven customer lifecycle retention.',
    skills: 'B2B SaaS Growth, Google Ads, LinkedIn Ads, SEO Content Strategy, HubSpot, Google Analytics 4, Meta Ads, SQL, Conversion Optimization',
    experiences: [
      {
        role: 'Head of Growth Marketing',
        company: 'RevEngine B2B',
        period: '2023 - Present',
        location: 'London / Remote',
        points: '• Scaled pipeline revenue from $1.2M to $4.8M ARR while reducing customer acquisition cost (CAC) by 31%.\n• Built programmatic SEO cluster producing 120,000 organic monthly search visits and 1,400 monthly inbound demos.\n• Managed $80,000 monthly paid search budget across North American and European enterprise buyer personas.'
      },
      {
        role: 'Senior Acquisition Manager',
        company: 'SaaSMetrics Global',
        period: '2020 - 2023',
        location: 'Singapore / Remote',
        points: '• Spearheaded conversion rate optimization across 8 landing pages, raising free-to-paid trial conversion by 28%.\n• Formulated automated email nurture sequence across 45,000 subscribers generating $420k in ARR expansion.'
      }
    ],
    education: [
      {
        degree: 'M.Sc. in Marketing & Data Analytics',
        institution: 'London School of Economics (LSE)',
        period: '2018 - 2020',
        gpa: 'First Class Honours'
      }
    ]
  }
];

export type ResumeTemplate = 
  | 'modern' | 'harvard' | 'minimal' | 'compact' 
  | 'executive' | 'creative' | 'techlead' | 'finance' | 'nordic' | 'startup' 
  | 'csuite' | 'brand';

// 50+ Enterprise Pro Capabilities Matrix
const PRO_RESUME_CAPABILITIES = [
  {
    category: '1. ATS Compliance & Robot Parsing Engines',
    features: [
      { name: '20+ Real-Time ATS Parsing Rules', desc: 'Validates headings, date structures, and section ordering for Taleo, Workday, and Greenhouse.', badge: 'Pro' },
      { name: 'Keyword Density & LSI Matching Engine', desc: 'Scans target role skills and highlights missing high-value terms in real-time.', badge: 'Pro' },
      { name: 'Clean Single-Column Robot Parsing Mode', desc: 'Guarantees 100% text extraction by enterprise applicant screening robots.', badge: 'Free' },
      { name: 'Live ATS Health Score (0-100)', desc: 'Real-time calculation based on summary length, skills count, and experience bullets.', badge: 'Free' },
      { name: 'Missing Skills AI Recommendation', desc: 'Suggests in-demand technical competencies for your target role title.', badge: 'Pro' },
      { name: 'Job Description Text Matcher', desc: 'Paste any job posting to calculate exact percentage fit and missing keywords.', badge: 'Pro' },
      { name: 'Recruiter Boolean Search Simulator', desc: 'Simulates AND/OR recruiter search queries to ensure visibility.', badge: 'Pro' }
    ]
  },
  {
    category: '2. Vector Typography & 12 Layout Architectures',
    features: [
      { name: 'Style A: Modern Tech (Clean Indigo)', desc: 'Left-aligned technical layout with structured bullet hierarchy.', badge: 'Free' },
      { name: 'Style B: Harvard Academic Classic', desc: 'Traditional centered serif design favored by ivy league institutions.', badge: 'Free' },
      { name: 'Style C: Minimal Sidebar Column', desc: 'Compact two-column split with dedicated left contact & skills panel.', badge: 'Free' },
      { name: 'Style D: Clean Compact Card', desc: 'Lightweight single-page format optimized for early-career professionals.', badge: 'Free' },
      { name: 'Style E: Silicon Valley Executive Leader', desc: 'Commanding navy banner, gold accents, and leadership impact metrics.', badge: 'Pro' },
      { name: 'Style F: Creative Agency Magazine', desc: 'Editorial typography, stone palette, and narrative manifesto section.', badge: 'Pro' },
      { name: 'Style G: Tech Lead & Principal Architect', desc: 'Dark terminal styling, distributed systems badges, and code font.', badge: 'Pro' },
      { name: 'Style H: Wall Street Investment Banking', desc: 'Conservative dual-column deal history format for finance & PE.', badge: 'Pro' },
      { name: 'Style I: Nordic Luxury Editorial', desc: 'Monolith aesthetic with airy whitespace and bespoke index numbering.', badge: 'Pro' },
      { name: 'Style J: Startup Founder & Growth Hacker', desc: 'High-contrast gradient headers with highlighted ARR and scale milestones.', badge: 'Pro' },
      { name: 'Style K: Agency C-Suite Boardroom Dossier', desc: 'Executive confidentiality watermark and candidate placement framing.', badge: 'Agency' },
      { name: 'Style L: White-Label Talent Placement Brand', desc: 'Agency talent representation layout with candidate ID code & zero tool branding.', badge: 'Agency' }
    ]
  },
  {
    category: '3. Color Palettes & Custom Typography',
    features: [
      { name: '10 Handcrafted Accent Color Palettes', desc: 'Slate, Crimson, Navy, Emerald, Cyan, Magenta, Gold, Obsidian, Violet, Coral.', badge: 'Pro' },
      { name: 'Typography Pairings: Inter, Merriweather, Mono, Jakarta', desc: 'Curated font stacks engineered for maximum readability and ATS parsing.', badge: 'Pro' },
      { name: 'Section Spacing & Margin Controller', desc: 'Fine-tune compact, normal, or spacious vertical layout breathing room.', badge: 'Pro' },
      { name: 'Multi-Page Flow Page Break Balancer', desc: 'Auto-detects page boundaries to prevent orphaned headers across page 2.', badge: 'Pro' },
      { name: 'Drag-and-Drop Section Reordering', desc: 'Easily rearrange Work Experience, Skills, Education, and Certifications.', badge: 'Pro' },
      { name: 'Dark Mode / High-Contrast Inverted Export', desc: 'High-impact dark theme presentation for screen-first interviews.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Multi-Format High-Res Exports',
    features: [
      { name: '300 DPI Vector PDF Direct Export', desc: 'Crisp, razor-sharp vector rendering with zero pixelation or canvas blur.', badge: 'Pro' },
      { name: 'Clean Plain-Text ATS Applicant (.txt)', desc: 'Unformatted plain text designed for clunky legacy application portals.', badge: 'Free' },
      { name: 'Browser Print / Native Save as PDF', desc: 'Instant system print dialog with standard paper dimensions.', badge: 'Free' },
      { name: 'Microsoft Word (.docx) Compatible Export', desc: 'Editable Word document export maintaining table and heading hierarchy.', badge: 'Pro' },
      { name: 'Markdown (.md) Developer Portfolio Export', desc: 'Ready to paste into GitHub README or personal portfolio websites.', badge: 'Pro' },
      { name: 'Unwatermarked High-Res PNG Presentation Slides', desc: 'Slide-ready PNG exports for portfolio decks and candidate showcases.', badge: 'Pro' }
    ]
  },
  {
    category: '5. Targeted Cover Letter & Application Matcher',
    features: [
      { name: 'Company-Specific Cover Letter Generator', desc: 'Creates targeted 3-paragraph pitch tailored to target firm and job title.', badge: 'Free' },
      { name: 'Dynamic Hiring Manager Personalization', desc: 'Custom greeting and role-specific value proposition insertion.', badge: 'Pro' },
      { name: '1-Click Copy Formatted Letter Text', desc: 'Instant clipboard copy for email outreach and application form pasting.', badge: 'Free' },
      { name: 'Matched Resume + Cover Letter Header Branding', desc: 'Identical typographic header styling across both documents.', badge: 'Pro' },
      { name: 'Salary Expectation & Availability Inserter', desc: 'Pre-written professional paragraphs framing compensation ranges.', badge: 'Pro' },
      { name: 'Follow-Up Email Sequence Generator (3 Steps)', desc: 'Post-interview follow-up and thank-you templates tailored to your pitch.', badge: 'Pro' }
    ]
  },
  {
    category: '6. Profile Management & Cloud Portfolios',
    features: [
      { name: '3 Instant Pre-Loaded Sample Profiles', desc: 'Designer, DevOps Architect, and Growth Director starter profiles.', badge: 'Free' },
      { name: 'Unlimited Custom Saved Profiles', desc: 'Store multiple targeted versions for different roles and industries.', badge: 'Pro' },
      { name: 'LinkedIn 1-Click Profile Importer', desc: 'Paste your LinkedIn profile data to auto-populate all form fields.', badge: 'Pro' },
      { name: 'Shareable Web Portfolio Link (omnistack.ai/r/name)', desc: 'Host a live interactive web version of your resume with view analytics.', badge: 'Pro' },
      { name: 'Password Shield for Private Candidate View', desc: 'Restrict portfolio link access with a secure client passcode.', badge: 'Pro' },
      { name: 'Interactive QR Code vCard Embed', desc: 'Scan to auto-save candidate contact details into recruiter smartphones.', badge: 'Pro' }
    ]
  },
  {
    category: '7. Agency Unlimited Multi-Candidate Talent Studio',
    features: [
      { name: '100% White-Label (No OmniStack Branding)', desc: 'Zero proprietary watermarks, links, or logos on any export or preview.', badge: 'Agency' },
      { name: 'Multi-Candidate Workspaces (50+ Job Seekers)', desc: 'Manage applicant pools, candidates, and client submissions under one roof.', badge: 'Agency' },
      { name: 'Client Talent Presentation Dossiers', desc: 'Wrap candidate resumes in your agency’s executive cover presentation.', badge: 'Agency' },
      { name: 'Bulk ZIP Export (Generate 50 Resumes in 1 Click)', desc: 'Export complete candidate rosters in PDF and TXT with a single click.', badge: 'Agency' },
      { name: 'Custom CNAME Candidate Portal (careers.youragency.com)', desc: 'Host client-facing candidate portfolios on your agency domain.', badge: 'Agency' },
      { name: 'Recruiter ATS & CRM Webhook Integration', desc: 'Automatically stream candidate profiles to Ashby, Greenhouse, or Lever.', badge: 'Agency' },
      { name: 'Priority Executive Review & VIP Support', desc: 'Direct Slack channel support with our senior career strategy team.', badge: 'Agency' }
    ]
  }
];

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [accentColor, setAccentColor] = useState<string>('indigo');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono' | 'jakarta'>('sans');
  const [showProInfo, setShowProInfo] = useState(false);
  const [proModalTier, setProModalTier] = useState<'pro' | 'agency'>('pro');
  const [isExporting, setIsExporting] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);

  // Template Tiers
  const isProTemplate = ['executive', 'creative', 'techlead', 'finance', 'nordic', 'startup'].includes(template);
  const isAgencyTemplate = ['csuite', 'brand'].includes(template);
  const isLockedTemplate = isProTemplate || isAgencyTemplate;

  // Candidate State
  const [profileIndex, setProfileIndex] = useState(0);
  const [name, setName] = useState(RANDOM_PROFILES[0].name);
  const [title, setTitle] = useState(RANDOM_PROFILES[0].title);
  const [email, setEmail] = useState(RANDOM_PROFILES[0].email);
  const [phone, setPhone] = useState(RANDOM_PROFILES[0].phone);
  const [location, setLocation] = useState(RANDOM_PROFILES[0].location);
  const [linkedin, setLinkedin] = useState(RANDOM_PROFILES[0].linkedin);
  const [github, setGithub] = useState(RANDOM_PROFILES[0].github);
  const [summary, setSummary] = useState(RANDOM_PROFILES[0].summary);
  const [skills, setSkills] = useState(RANDOM_PROFILES[0].skills);
  const [experiences, setExperiences] = useState(RANDOM_PROFILES[0].experiences);
  const [education, setEducation] = useState(RANDOM_PROFILES[0].education);

  // Cover Letter State
  const [targetCompany, setTargetCompany] = useState('Shopify');
  const [targetRole, setTargetRole] = useState('Senior Product Designer');
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at Shopify,\n\nI am writing to express my strong interest in the ${targetRole} role. Having followed Shopify's merchant-first design evolution, I have long admired your standard of clean, accessible product experiences that empower millions of independent entrepreneurs worldwide.\n\nOver the past 6 years leading design at high-growth tech platforms, I have built design systems and customer checkout flows that increased registration conversion rates by 34% and reduced onboarding drop-offs. My experience collaborating closely with distributed engineering squads and analyzing qualitative user metrics directly matches the mission of your product design team.\n\nI would be thrilled to bring my passion for craft, design scalability, and merchant empathy to Shopify.\n\nSincerely,\n${name}`
  );
  const [copiedLetter, setCopiedLetter] = useState(false);

  const handleFeatureClick = (badge?: string) => {
    if (badge === 'Free') return;
    setProModalTier(badge === 'Agency' ? 'agency' : 'pro');
    setShowProInfo(true);
  };

  const handleTemplateSelect = (t: ResumeTemplate) => {
    setTemplate(t);
    if (['csuite', 'brand'].includes(t)) {
      setProModalTier('agency');
    } else if (['executive', 'creative', 'techlead', 'finance', 'nordic', 'startup'].includes(t)) {
      setProModalTier('pro');
    }
  };

  // Load Random Profile
  const loadRandomProfile = () => {
    const nextIdx = (profileIndex + 1) % RANDOM_PROFILES.length;
    setProfileIndex(nextIdx);
    const p = RANDOM_PROFILES[nextIdx];
    setName(p.name);
    setTitle(p.title);
    setEmail(p.email);
    setPhone(p.phone);
    setLocation(p.location);
    setLinkedin(p.linkedin);
    setGithub(p.github);
    setSummary(p.summary);
    setSkills(p.skills);
    setExperiences(p.experiences);
    setEducation(p.education);
    setCoverLetter(
      `Dear Hiring Manager at ${targetCompany},\n\nI am excited to apply for the ${p.title} position. With my background in ${p.skills.split(',').slice(0, 3).join(', ')}, I am confident in my ability to immediately contribute to your team's objectives.\n\nIn my previous role at ${p.experiences[0]?.company}, I spearheaded initiatives that substantially improved technical and business outcomes. I look forward to bringing this expertise to your company.\n\nSincerely,\n${p.name}`
    );
  };

  const clearToBlank = () => {
    setName('');
    setTitle('');
    setEmail('');
    phone && setPhone('');
    setLocation('');
    setLinkedin('');
    setGithub('');
    setSummary('');
    setSkills('');
    setExperiences([{ role: '', company: '', period: '', location: '', points: '' }]);
    setEducation([{ degree: '', institution: '', period: '', gpa: '' }]);
  };

  const calculateAtsScore = () => {
    let score = 50;
    if (summary.length > 80) score += 10;
    if (skills.split(',').length >= 6) score += 10;
    if (experiences.length >= 2) score += 15;
    if (education.length >= 1) score += 5;
    if (linkedin && email) score += 10;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  const handleDownloadPdf = async () => {
    if (isLockedTemplate) {
      setProModalTier(isAgencyTemplate ? 'agency' : 'pro');
      setShowProInfo(true);
      return;
    }

    const canvasElem = document.getElementById('resume-canvas-printable');
    if (!canvasElem) return;

    try {
      setIsExporting(true);
      const canvas = await html2canvas(canvasElem, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `${(name || 'Professional').replace(/\s+/g, '_')}_${template.toUpperCase()}_Resume.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('PDF generation error, falling back to print:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadTxt = () => {
    if (isLockedTemplate) {
      setProModalTier(isAgencyTemplate ? 'agency' : 'pro');
      setShowProInfo(true);
      return;
    }
    const fileName = `${(name || 'Professional').replace(/\s+/g, '_')}_ATS_Resume.txt`;
    const contactParts = [email, phone, location, linkedin, github].filter(Boolean);
    
    let content = `========================================================================\n`;
    content += `${(name || 'Your Full Name').toUpperCase()} — ${title || 'Professional Title'}\n`;
    content += `========================================================================\n`;
    content += `Contact: ${contactParts.join(' | ')}\n\n`;

    if (summary) {
      content += `------------------------------------------------------------------------\n`;
      content += `EXECUTIVE SUMMARY\n`;
      content += `------------------------------------------------------------------------\n`;
      content += `${summary}\n\n`;
    }

    if (skills) {
      content += `------------------------------------------------------------------------\n`;
      content += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
      content += `------------------------------------------------------------------------\n`;
      content += `${skills}\n\n`;
    }

    if (experiences.length > 0) {
      content += `------------------------------------------------------------------------\n`;
      content += `PROFESSIONAL WORK EXPERIENCE\n`;
      content += `------------------------------------------------------------------------\n`;
      experiences.forEach((exp) => {
        content += `${exp.role.toUpperCase()} | ${exp.company} (${exp.period})\n`;
        if (exp.location) content += `Location: ${exp.location}\n`;
        if (exp.points) content += `${exp.points}\n`;
        content += `\n`;
      });
    }

    if (education.length > 0) {
      content += `------------------------------------------------------------------------\n`;
      content += `EDUCATION & CREDENTIALS\n`;
      content += `------------------------------------------------------------------------\n`;
      education.forEach((edu) => {
        content += `${edu.degree} — ${edu.institution} (${edu.period})\n`;
        if (edu.gpa) content += `Honours/GPA: ${edu.gpa}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (isLockedTemplate) {
      setProModalTier(isAgencyTemplate ? 'agency' : 'pro');
      setShowProInfo(true);
      return;
    }
    window.print();
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { role: 'Senior Role', company: 'Company Name', period: '2023 - Present', location: 'City, Country', points: '• Key accomplishment with measurable outcome.\n• Spearheaded critical process improvement.\n• Mentored cross-functional team members.' }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const copyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  // Color theme mapping
  const colorHexMap: Record<string, string> = {
    indigo: '#4f46e5',
    crimson: '#e11d48',
    navy: '#1e3a8a',
    emerald: '#059669',
    cyan: '#0891b2',
    magenta: '#c026d3',
    gold: '#d97706',
    obsidian: '#0f172a',
    violet: '#7c3aed',
    coral: '#f97316'
  };

  const activeColorHex = colorHexMap[accentColor] || '#4f46e5';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tool #1</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">
              ATS Standard Verified
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 12 Layouts · 50+ Capabilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Resume & Cover Letter Suite</h1>
          <p className="text-xs text-slate-400 mt-1">
            Toggle 12 professional layout styles. Generate real ATS-scoring documents in seconds.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowCapabilities(!showCapabilities)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showCapabilities ? 'Hide 50+ Capabilities' : '👑 Browse 50+ Pro & Agency Capabilities'}</span>
          </button>

          <button 
            type="button"
            onClick={loadRandomProfile}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
            title="Load another sample profile"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Random Sample</span>
          </button>

          <button 
            type="button"
            onClick={clearToBlank}
            className="px-3.5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs transition cursor-pointer"
            title="Start from scratch"
          >
            Clear Form
          </button>

          <button 
            type="button"
            onClick={handleDownloadPdf}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isLockedTemplate 
                ? isAgencyTemplate 
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:opacity-95'
            }`}
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : isLockedTemplate ? <Lock className="w-4 h-4 text-amber-400" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? 'Generating 1:1 PDF...' : isLockedTemplate ? `Download PDF (${isAgencyTemplate ? '⚡ Agency' : '🔒 Pro'} Locked)` : 'Download PDF (1:1 Exact)'}</span>
          </button>

          <button 
            type="button"
            onClick={handleDownloadTxt}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isLockedTemplate 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            {isLockedTemplate ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <FileText className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isLockedTemplate ? 'Download ATS (🔒 Locked)' : 'Download ATS (.txt)'}</span>
          </button>

          <button 
            type="button"
            onClick={handlePrint}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isLockedTemplate 
                ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/20 hover:opacity-90'
            }`}
          >
            {isLockedTemplate ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Printer className="w-3.5 h-3.5" />}
            <span>{isLockedTemplate ? 'Print (🔒 Locked)' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE 50+ PRO & AGENCY CAPABILITIES CATALOG */}
      {showCapabilities && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro & Agency Resume Capabilities (50+ Advanced Tools)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Everything required for individual applicants, executive job seekers, and talent placement agencies.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setProModalTier('pro');
                  setShowProInfo(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                👑 Pro ($9/mo)
              </button>
              <button
                type="button"
                onClick={() => {
                  setProModalTier('agency');
                  setShowProInfo(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                ⚡ Agency ($29/mo)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_RESUME_CAPABILITIES.map((category) => (
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

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'resume' 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Resume Canvas & 12 Layouts</span>
        </button>
        <button
          onClick={() => setActiveTab('cover-letter')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'cover-letter' 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Targeted Cover Letter</span>
        </button>
      </div>

      {/* Mobile / Tablet Toggle between Form and Live Canvas */}
      {activeTab === 'resume' && (
        <div className="lg:hidden flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl mb-2">
          <button
            type="button"
            onClick={() => setMobileView('form')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'form'
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edit Resume Form</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'preview'
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Canvas ({atsScore}/100)</span>
          </button>
        </div>
      )}

      {activeTab === 'resume' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (5 cols) */}
          <div className={`lg:col-span-5 glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-6 ${
            mobileView === 'preview' ? 'hidden lg:block' : 'block'
          }`}>
            {/* ATS Score */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Real-Time ATS Health Score</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Scored against 20+ recruiting filter rules</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">{atsScore}/100</div>
                <div className="text-[10px] font-bold uppercase text-emerald-300">ATS Certified</div>
              </div>
            </div>

            {/* Layout Selector - 12 Distinct Visual Styles (Free, Pro, Agency) */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-brand-400" />
                  <span>Visual Layout (12 Styles: 4 Free · 6 Pro · 2 Agency):</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setProModalTier('pro');
                    setShowProInfo(true);
                  }}
                  className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Crown className="w-3 h-3" /> Pro Specs
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {[
                  { id: 'modern', label: 'Modern Tech', tier: 'Free', code: 'Style A' },
                  { id: 'harvard', label: 'Harvard Classic', tier: 'Free', code: 'Style B' },
                  { id: 'minimal', label: 'Minimal Column', tier: 'Free', code: 'Style C' },
                  { id: 'compact', label: 'Clean Compact', tier: 'Free', code: 'Style D' },
                  { id: 'executive', label: 'Executive Leader', tier: 'Pro', code: 'Style E' },
                  { id: 'creative', label: 'Creative Studio', tier: 'Pro', code: 'Style F' },
                  { id: 'techlead', label: 'Tech Lead Arch', tier: 'Pro', code: 'Style G' },
                  { id: 'finance', label: 'Wall St Finance', tier: 'Pro', code: 'Style H' },
                  { id: 'nordic', label: 'Nordic Luxury', tier: 'Pro', code: 'Style I' },
                  { id: 'startup', label: 'Startup Founder', tier: 'Pro', code: 'Style J' },
                  { id: 'csuite', label: 'C-Suite Dossier', tier: 'Agency', code: 'Style K' },
                  { id: 'brand', label: 'Talent Agency', tier: 'Agency', code: 'Style L' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleTemplateSelect(s.id as ResumeTemplate)}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                      template === s.id
                        ? s.tier === 'Agency'
                          ? 'bg-cyan-600 text-white border-cyan-400 shadow-md ring-1 ring-cyan-400'
                          : s.tier === 'Pro'
                            ? 'bg-amber-600 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                            : 'bg-brand-500 text-white border-brand-400 shadow-md ring-1 ring-brand-400'
                        : 'glass text-slate-300 hover:text-white border-white/10'
                    }`}
                  >
                    <div className={`text-[9px] font-extrabold uppercase tracking-wider ${
                      s.tier === 'Agency' ? 'text-cyan-300' : s.tier === 'Pro' ? 'text-amber-300' : 'text-emerald-300'
                    }`}>
                      {s.code} · {s.tier === 'Agency' ? '⚡ Agency' : s.tier === 'Pro' ? '🔒 Pro' : 'Free'}
                    </div>
                    <div className="text-[11px] truncate mt-0.5">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Palette & Typography Pickers */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resume Accent Palette (10 Tones):</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono uppercase">{accentColor}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'indigo', hex: '#4f46e5', label: 'Indigo' },
                  { name: 'crimson', hex: '#e11d48', label: 'Crimson' },
                  { name: 'navy', hex: '#1e3a8a', label: 'Navy' },
                  { name: 'emerald', hex: '#059669', label: 'Emerald' },
                  { name: 'cyan', hex: '#0891b2', label: 'Cyan' },
                  { name: 'magenta', hex: '#c026d3', label: 'Magenta' },
                  { name: 'gold', hex: '#d97706', label: 'Gold' },
                  { name: 'obsidian', hex: '#0f172a', label: 'Obsidian' },
                  { name: 'violet', hex: '#7c3aed', label: 'Agency' },
                  { name: 'coral', hex: '#f97316', label: 'Coral' }
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setAccentColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                      accentColor === c.name ? 'scale-125 border-white ring-2 ring-white/50' : 'border-white/20 hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>

              {/* Typography Picker */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                  <Type className="w-3 h-3 text-slate-400" /> Typography:
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'sans', label: 'Modern Inter' },
                    { id: 'serif', label: 'Editorial Serif' },
                    { id: 'mono', label: 'Tech Mono' },
                    { id: 'jakarta', label: 'Plus Jakarta' }
                  ].map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setFontFamily(font.id as any)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        fontFamily === font.id ? 'bg-white/20 text-white border-white/30' : 'text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pro & Agency Add-ons Badges (Image 1 style) */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold mr-1">👑 Pro Add-ons:</span>
                {[
                  '20+ ATS Scan Rules',
                  'Cover Letter Sync',
                  '300 DPI Vector PDF',
                  'LinkedIn 1-Click Import',
                  'Keyword Matcher',
                  'Density Heatmap'
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
                  'Multi-Candidate Workspaces',
                  'Client Talent Dossiers',
                  'Bulk ZIP Export (50 Candidates)',
                  'Custom CNAME Portal'
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

            {/* Candidate Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Personal Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn Profile</label>
                  <input 
                    type="text" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Portfolio / GitHub</label>
                  <input 
                    type="text" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Executive Summary</label>
              <textarea 
                rows={3} 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed font-sans"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Key Skills & Core Competencies</label>
              <textarea 
                rows={2} 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-200">Work Experience</label>
                <button 
                  type="button"
                  onClick={addExperience} 
                  className="text-xs text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Job
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Position #{idx + 1}</span>
                      {experiences.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeExperience(idx)} 
                          className="text-slate-500 hover:text-rose-400 text-xs transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Job Title" 
                        value={exp.role} 
                        onChange={(e) => {
                          const next = [...experiences];
                          next[idx].role = e.target.value;
                          setExperiences(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        value={exp.company} 
                        onChange={(e) => {
                          const next = [...experiences];
                          next[idx].company = e.target.value;
                          setExperiences(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Time Period (e.g. 2022 - Present)" 
                        value={exp.period} 
                        onChange={(e) => {
                          const next = [...experiences];
                          next[idx].period = e.target.value;
                          setExperiences(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Location" 
                        value={exp.location} 
                        onChange={(e) => {
                          const next = [...experiences];
                          next[idx].location = e.target.value;
                          setExperiences(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>

                    <textarea 
                      rows={3} 
                      placeholder="Bullet points (use • at start of each line)..." 
                      value={exp.points} 
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].points = e.target.value;
                        setExperiences(next);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none leading-relaxed font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-3">Education & Degrees</label>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Degree / Certificate" 
                        value={edu.degree} 
                        onChange={(e) => {
                          const next = [...education];
                          next[idx].degree = e.target.value;
                          setEducation(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="University / Institute" 
                        value={edu.institution} 
                        onChange={(e) => {
                          const next = [...education];
                          next[idx].institution = e.target.value;
                          setEducation(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Years (e.g. 2017 - 2021)" 
                        value={edu.period} 
                        onChange={(e) => {
                          const next = [...education];
                          next[idx].period = e.target.value;
                          setEducation(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="GPA / Honours" 
                        value={edu.gpa} 
                        onChange={(e) => {
                          const next = [...education];
                          next[idx].gpa = e.target.value;
                          setEducation(next);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Preview (7 cols) */}
          <div className={`lg:col-span-7 space-y-4 ${
            mobileView === 'form' ? 'hidden lg:block' : 'block'
          }`}>
            <div className="glass p-4 sm:p-6 rounded-3xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live 1:1 Print Preview ({template.toUpperCase()})
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Format: A4 Print Ready</span>
              </div>

              {/* Locked Alert Banner */}
              {isLockedTemplate && (
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 animate-in fade-in ${
                  isAgencyTemplate
                    ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-cyan-500/20 border-cyan-500/40'
                    : 'bg-gradient-to-r from-amber-500/20 via-brand-500/15 to-amber-500/20 border-amber-500/40'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {isAgencyTemplate ? <Zap className="w-5 h-5 text-cyan-400 shrink-0" /> : <Lock className="w-5 h-5 text-amber-400 shrink-0" />}
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{isAgencyTemplate ? '⚡ Agency Layout Preview Mode' : '🔒 Pro Layout Preview Mode'}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                          isAgencyTemplate ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          Export & Print Locked
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        {isAgencyTemplate 
                          ? 'This layout is an Agency Unlimited exclusive ($29/mo). Upgrade to unlock 100% white-label exports and client workspaces.' 
                          : 'Styles E through J require OmniStack AI Pro ($9/mo). Upgrade to download unwatermarked vector PDF & ATS exports.'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProModalTier(isAgencyTemplate ? 'agency' : 'pro');
                      setShowProInfo(true);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-slate-950 font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                      isAgencyTemplate 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300'
                    }`}
                  >
                    {isAgencyTemplate ? <Zap className="w-3.5 h-3.5" /> : <Crown className="w-3.5 h-3.5" />}
                    <span>{isAgencyTemplate ? 'Unlock Agency' : 'Unlock Pro'}</span>
                  </button>
                </div>
              )}

              <div id="resume-canvas-printable" className={fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'}>

              {/* TEMPLATE A: MODERN TECH */}
              {template === 'modern' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6" style={{ borderTop: `8px solid ${activeColorHex}` }}>
                  <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight">{name || 'Your Full Name'}</h2>
                      <div className="text-sm font-extrabold mt-0.5" style={{ color: activeColorHex }}>{title || 'Your Target Role'}</div>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 text-right font-medium">
                      <div>✉ {email}</div>
                      <div>☎ {phone}</div>
                      <div>📍 {location}</div>
                      {linkedin && <div style={{ color: activeColorHex }} className="font-semibold">{linkedin}</div>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: activeColorHex }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColorHex }} /> Executive Profile
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: activeColorHex }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColorHex }} /> Technical Competencies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: activeColorHex }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColorHex }} /> Work History
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                            <span className="text-[10px] text-slate-500 font-semibold">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-bold" style={{ color: activeColorHex }}>{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: activeColorHex }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColorHex }} /> Education
                    </h3>
                    <div className="space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <div className="font-bold text-slate-950">{edu.degree}</div>
                            <div className="text-[11px] font-semibold" style={{ color: activeColorHex }}>{edu.institution}</div>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE B: HARVARD CLASSIC */}
              {template === 'harvard' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl font-serif min-h-[780px] space-y-5">
                  <div className="border-b-2 border-slate-900 pb-3 text-center">
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">{name || 'Your Full Name'}</h2>
                    <div className="text-xs font-bold text-slate-700 tracking-wider uppercase mt-1">{title}</div>
                    <div className="text-[11px] text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans">
                      <span>{email}</span>
                      <span>·</span>
                      <span>{phone}</span>
                      <span>·</span>
                      <span>{location}</span>
                      {linkedin && <span>· {linkedin}</span>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Professional Summary
                    </h3>
                    <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Areas of Expertise
                    </h3>
                    <p className="text-xs text-slate-800 font-sans leading-relaxed">{skills}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-3 font-sans">
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline font-sans">
                            <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                            <span className="text-[10px] text-slate-600 italic">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-slate-800 italic">{exp.company}, {exp.location}</div>
                          <p className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Education
                    </h3>
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-xs font-sans">
                        <div>
                          <span className="font-bold">{edu.institution}</span> — <span>{edu.degree}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{edu.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TEMPLATE C: MINIMAL SIDEBAR */}
              {template === 'minimal' && (
                <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-2xl font-sans min-h-[780px] grid grid-cols-12 gap-6">
                  <div className="col-span-4 border-r border-slate-200 pr-4 space-y-5">
                    <div>
                      <h2 className="text-lg font-black text-slate-950 leading-tight">{name}</h2>
                      <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">{title}</div>
                    </div>

                    <div className="space-y-1.5 text-[10px] text-slate-600">
                      <div className="font-bold text-slate-900 uppercase">Contact</div>
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="truncate text-indigo-600">{linkedin}</div>}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-900 uppercase">Skills</div>
                      <div className="flex flex-col gap-1">
                        {skills.split(',').map((s, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 text-[10px] text-slate-600">
                      <div className="font-bold text-slate-900 uppercase">Education</div>
                      {education.map((edu, i) => (
                        <div key={i}>
                          <div className="font-bold text-slate-800">{edu.degree}</div>
                          <div>{edu.institution}</div>
                          <div className="text-slate-400">{edu.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-8 space-y-5">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                        Summary
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                        Experience
                      </div>
                      <div className="space-y-4">
                        {experiences.map((exp, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                              <span className="text-[10px] text-slate-400">{exp.period}</span>
                            </div>
                            <div className="text-[11px] font-semibold text-slate-600">{exp.company}</div>
                            <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE D: CLEAN COMPACT (Free) */}
              {template === 'compact' && (
                <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-2xl min-h-[780px] space-y-5 border border-slate-200">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight">{name || 'Your Full Name'}</h2>
                      <div className="text-xs font-bold text-slate-600 mt-0.5">{title || 'Target Role'}</div>
                    </div>
                    <div className="text-[10px] text-slate-500 text-right space-y-0.5 font-mono">
                      <div>{email} · {phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="text-indigo-600">{linkedin}</div>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900">Professional Summary</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900">Key Competencies</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{skills}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">Work History</div>
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-0.5 text-xs">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{exp.role} — {exp.company}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{exp.period}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900">Academic History</div>
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-700">
                        <span className="font-semibold">{edu.degree} · {edu.institution}</span>
                        <span className="text-[10px] text-slate-500">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TEMPLATE E: SILICON VALLEY EXECUTIVE (Pro) */}
              {template === 'executive' && (
                <div className="bg-white text-slate-900 rounded-xl shadow-2xl min-h-[780px] overflow-hidden border border-slate-200">
                  <div className="bg-[#0f172a] text-white p-8 sm:p-10 border-b-4" style={{ borderColor: activeColorHex }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Executive Candidate</span>
                        <h2 className="text-3xl font-black text-white tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                        <div className="text-sm font-bold text-slate-300 mt-1">{title || 'Your Target Role'}</div>
                      </div>
                      <div className="text-[11px] text-slate-300 space-y-1 md:text-right font-medium">
                        <div>✉ {email}</div>
                        <div>☎ {phone}</div>
                        <div>📍 {location}</div>
                        {linkedin && <div className="text-amber-400 font-semibold">{linkedin}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 space-y-6">
                    <div className="border-l-4 bg-slate-50 p-4 rounded-r-xl" style={{ borderColor: activeColorHex }}>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600" /> Executive Leadership & Strategic Mandate
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5 pb-1 border-b border-slate-200">
                        Strategic & Technical Competencies
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {skills.split(',').map((s, idx) => (
                          <div key={idx} className="text-[11px] font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeColorHex }} />
                            <span className="truncate">{s.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-200">
                        Executive Leadership Record
                      </h3>
                      <div className="space-y-5">
                        {experiences.map((exp, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-sm font-black text-slate-950">{exp.role}</span>
                              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300 w-fit">
                                {exp.period}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-700">{exp.company} — {exp.location}</div>
                            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 pb-1 border-b border-slate-200">
                        Board & Academic Credentials
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {education.map((edu, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <div className="font-bold text-xs text-slate-950">{edu.degree}</div>
                            <div className="text-[11px] font-semibold text-slate-600 mt-0.5">{edu.institution}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{edu.period} · {edu.gpa}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE F: CREATIVE STUDIO (Pro) */}
              {template === 'creative' && (
                <div className="bg-[#fafaf9] text-stone-900 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6 border-t-8 border-emerald-600">
                  <div className="border-b-2 border-stone-300 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Portfolio & Profile</span>
                      <h2 className="text-3xl font-black text-stone-950 tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                      <div className="text-sm font-bold text-stone-600 mt-0.5 italic">{title || 'Your Target Role'}</div>
                    </div>
                    <div className="text-[11px] text-stone-600 space-y-0.5 md:text-right font-medium">
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="text-emerald-700 font-semibold">{linkedin}</div>}
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Professional Narrative
                    </h3>
                    <p className="text-xs text-stone-800 leading-relaxed font-serif">{summary}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2.5">
                      Specialties & Toolchain
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200 shadow-sm">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3">
                      Chronology of Experience
                    </h3>
                    <div className="border-l-2 border-emerald-300 ml-2 pl-4 space-y-5">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-1 ring-emerald-300" />
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-stone-950">{exp.role}</span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-bold text-stone-600">{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-stone-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
                      Academic Foundation
                    </h3>
                    <div className="space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs bg-white p-3 rounded-xl border border-stone-200">
                          <div>
                            <div className="font-bold text-stone-950">{edu.degree}</div>
                            <div className="text-[11px] text-emerald-700 font-semibold">{edu.institution}</div>
                          </div>
                          <div className="text-[11px] text-stone-500">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE G: TECH LEAD ARCHITECT (Pro) */}
              {template === 'techlead' && (
                <div className="bg-[#0b0f19] text-slate-100 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6 border border-cyan-500/30 relative">
                  <div className="border-b border-cyan-500/20 pb-5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-2">
                      <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> ARCHITECT_CLUSTER // US-EAST-1</span>
                      <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">SYSTEM_VER 2026.4</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-black text-white tracking-tight font-mono">{name || 'Your Full Name'}</h2>
                        <div className="text-sm font-bold text-cyan-400 mt-0.5 font-mono">// {title || 'Principal Software Architect'}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-mono md:text-right">
                        <div>net: {email}</div>
                        <div>tel: {phone}</div>
                        <div>loc: {location}</div>
                        {linkedin && <div className="text-cyan-400">{linkedin}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5 font-mono">
                      <Code2 className="w-3.5 h-3.5" /> Architectural Directive & Mandate
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{summary}</p>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Distributed Systems & Infrastructure Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-semibold bg-cyan-950/60 text-cyan-300 px-2.5 py-1 rounded border border-cyan-800/60">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Production Engineering Track Record
                    </div>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                            <span className="text-xs font-bold text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              {exp.role}
                            </span>
                            <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                              {exp.period}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">{exp.company} // {exp.location}</div>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                      Academic & System Credentials
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {education.map((edu, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 font-mono text-xs">
                          <div className="font-bold text-white">{edu.degree}</div>
                          <div className="text-[11px] text-cyan-400 mt-0.5">{edu.institution}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE H: WALL STREET FINANCE (Pro) */}
              {template === 'finance' && (
                <div className="bg-white text-slate-950 p-8 sm:p-12 rounded-xl shadow-2xl font-serif min-h-[780px] space-y-5 border-2 border-slate-800">
                  <div className="border-b-2 border-slate-900 pb-4 text-center">
                    <div className="text-[10px] font-sans font-extrabold tracking-widest text-amber-700 uppercase mb-1">
                      CONFIDENTIAL CANDIDATE DOSSIER
                    </div>
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">{name || 'Your Full Name'}</h2>
                    <div className="text-xs font-bold text-slate-700 tracking-wider uppercase mt-0.5 font-sans">
                      {title || 'Private Equity & M&A Investment Analyst'}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans">
                      <span>{email}</span>
                      <span>|</span>
                      <span>{phone}</span>
                      <span>|</span>
                      <span>{location}</span>
                      {linkedin && <span>| {linkedin}</span>}
                    </div>
                  </div>

                  <div className="border border-slate-300 p-3.5 bg-slate-50/60">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" /> Mandate & Financial Core Competency
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">{summary}</p>
                  </div>

                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
                      Financial Modeling, M&A & Quantitative Competencies
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
                      {skills.split(',').map((s, idx) => (
                        <div key={idx} className="text-[10px] font-semibold text-slate-800 bg-slate-100 p-1.5 border border-slate-300 text-center">
                          {s.trim()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-3">
                      Professional Engagement & Deal History
                    </div>
                    <div className="space-y-4 font-sans">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-950 uppercase">{exp.role}</span>
                            <span className="text-[10px] font-bold text-slate-600">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-amber-900 italic">{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
                      Academic Credentials & Certifications
                    </div>
                    <div className="space-y-1.5 font-sans">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-bold text-slate-950">{edu.institution}</span> — <span className="text-slate-800">{edu.degree}</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-600">{edu.period} | {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE I: NORDIC LUXURY (Pro) */}
              {template === 'nordic' && (
                <div className="bg-[#fafaf8] text-slate-900 p-10 sm:p-14 rounded-xl shadow-2xl min-h-[780px] space-y-7 border border-stone-200">
                  <div className="border-b border-stone-300 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">CURRICULUM VITAE</div>
                      <h2 className="text-3xl font-light tracking-tight text-stone-900 uppercase">{name || 'Your Full Name'}</h2>
                      <div className="text-xs font-medium tracking-wide text-stone-600 mt-1 uppercase">{title || 'Creative Director'}</div>
                    </div>
                    <div className="text-[10px] text-stone-600 font-mono space-y-1 md:text-right tracking-tight">
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="text-stone-900 underline">{linkedin}</div>}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      01 / Overview
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="text-xs text-stone-800 leading-relaxed font-normal">{summary}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      02 / Competencies
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <div className="flex flex-wrap gap-2">
                        {skills.split(',').map((s, idx) => (
                          <span key={idx} className="text-[10px] text-stone-800 bg-white px-3 py-1 rounded border border-stone-200 tracking-wide">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      03 / Experience
                    </div>
                    <div className="col-span-12 sm:col-span-9 space-y-6">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-medium text-stone-900 tracking-wide uppercase">{exp.role}</span>
                            <span className="text-[10px] text-stone-500 font-mono">{exp.period}</span>
                          </div>
                          <div className="text-[11px] text-stone-600 italic">{exp.company} — {exp.location}</div>
                          <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      04 / Education
                    </div>
                    <div className="col-span-12 sm:col-span-9 space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-medium text-stone-900">{edu.institution}</span>, <span className="text-stone-600">{edu.degree}</span>
                          </div>
                          <div className="text-[10px] text-stone-500 font-mono">{edu.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE J: STARTUP FOUNDER & GROWTH (Pro) */}
              {template === 'startup' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6 border-t-8 border-amber-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Startup Founder Profile</span>
                      <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                      <div className="text-xs font-bold text-amber-300 mt-0.5">{title || 'Growth Leader'}</div>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-0.5 text-right font-mono">
                      <div>{email}</div>
                      <div>{phone} · {location}</div>
                      {linkedin && <div className="text-amber-400">{linkedin}</div>}
                    </div>
                  </div>

                  {/* Growth Metrics Highlight */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                    <div>
                      <div className="text-lg font-black text-amber-600">$4.8M+</div>
                      <div className="text-[10px] font-bold text-slate-600">ARR Scaled</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-indigo-600">350k+</div>
                      <div className="text-[10px] font-bold text-slate-600">Active Users</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-emerald-600">40+</div>
                      <div className="text-[10px] font-bold text-slate-600">Releases Shipped</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-900">Executive Thesis</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-900">Scale Track Record</div>
                    <div className="space-y-3">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between font-bold text-xs text-slate-900">
                            <span>{exp.role} @ {exp.company}</span>
                            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{exp.period}</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-200">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-900">Core Stack & Education</div>
                    <div className="text-xs text-slate-700 flex justify-between">
                      <span className="font-semibold">{skills}</span>
                      <span className="text-[10px] text-slate-500">{education[0]?.degree}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE K: AGENCY C-SUITE DOSSIER (⚡ Agency) */}
              {template === 'csuite' && (
                <div className="bg-[#0b0c10] text-slate-100 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6 border-2 border-amber-500/50 relative">
                  <div className="border-b border-amber-500/30 pb-4 flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-400" /> CONFIDENTIAL BOARDROOM TALENT DOSSIER</span>
                    <span className="bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">SECURITY CLEARANCE: EXECUTIVE</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">C-SUITE APPLICANT PROFILE</span>
                      <h2 className="text-3xl font-black text-white tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                      <div className="text-sm font-bold text-amber-400 mt-0.5 font-mono">// {title || 'Chief Technology Officer'}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 space-y-0.5 font-mono md:text-right">
                      <div>direct: {email}</div>
                      <div>tel: {phone}</div>
                      <div>residence: {location}</div>
                      {linkedin && <div className="text-amber-400">{linkedin}</div>}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl">
                    <div className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider mb-1">Executive Mandate & Vision</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{summary}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Strategic Governance & P&L Track Record</div>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex justify-between items-baseline font-mono text-xs">
                            <span className="font-bold text-white">{exp.role}</span>
                            <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">{exp.company} · {exp.location}</div>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 font-mono text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Board Competencies: {skills}</span>
                      <span>Credentials: {education[0]?.degree}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE L: WHITE-LABEL TALENT BRAND (⚡ Agency) */}
              {template === 'brand' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl min-h-[780px] space-y-6 border-t-8 border-cyan-600">
                  <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-700">PREMIER TALENT PLACEMENT</div>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight">{name || 'Your Full Name'}</h2>
                      <div className="text-xs font-bold text-slate-700 mt-0.5">{title || 'Lead Candidate'}</div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-500">
                      <div>CANDIDATE ID: AGY-{(name || 'USR').slice(0, 3).toUpperCase()}-2026</div>
                      <div>REPRESENTED BY: AGENCY GLOBAL</div>
                      <div>{location} · {email}</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-1">Candidate Profile Assessment</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">Verified Engagement History</div>
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between font-bold text-xs text-slate-950">
                          <span>{exp.role} | {exp.company}</span>
                          <span className="text-[10px] text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">{exp.period}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="text-[11px] font-bold uppercase text-slate-900">Key Domain Skills</div>
                    <div className="text-slate-600">{skills}</div>
                  </div>
                </div>
              )}

              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Cover Letter Tab */
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Company</label>
              <input 
                type="text" 
                value={targetCompany} 
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Job Title</label>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300">Generated Cover Letter Body</label>
              <button 
                type="button"
                onClick={copyCoverLetter}
                className="px-3.5 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-xs text-brand-300 hover:text-white flex items-center gap-1.5 transition font-bold cursor-pointer"
              >
                {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedLetter ? 'Copied Cover Letter!' : 'Copy Letter Text'}</span>
              </button>
            </div>
            <textarea 
              rows={14} 
              value={coverLetter} 
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed font-sans"
            />
          </div>
        </div>
      )}

      {/* Reusable Pro & Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProInfo} 
        onClose={() => setShowProInfo(false)} 
        toolName="AI Resume & Cover Letter Suite" 
        tier={proModalTier}
      />
    </div>
  );
}
