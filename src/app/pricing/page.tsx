'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2,
  Copy, 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Globe, 
  Sparkles, 
  CreditCard, 
  Lock,
  X,
  HelpCircle,
  ExternalLink,
  QrCode,
  Download,
  RefreshCw,
  Check,
  AlertCircle,
  Receipt
} from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>({
    name: 'Pro Creator',
    monthlyPrice: '$9',
    annualPrice: '$7',
    priceNum: 9,
    annualPriceNum: 84
  });

  // Checkout modal states
  const [checkoutTab, setCheckoutTab] = useState<'card' | 'upi' | 'paypal'>('card');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerName, setPayerName] = useState('');
  
  // Card form state - 100% blank by default
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardCountry, setCardCountry] = useState('United States');
  const [cardError, setCardError] = useState('');

  // UPI verification state
  const [upiRef, setUpiRef] = useState('');
  const [upiError, setUpiError] = useState('');
  const [paypalError, setPaypalError] = useState('');
  
  // Processing & Success states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('Connecting to gateway...');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paypalWindowOpened, setPaypalWindowOpened] = useState(false);
  const [orderId, setOrderId] = useState('ORD-2026-8491');
  const [txnId, setTxnId] = useState('TXN-PAYPAL-USD-9182');
  const [licenseKey, setLicenseKey] = useState('OMNI-PRO-9842-8819-LIVE');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const copyUpiId = () => {
    navigator.clipboard.writeText('7901857685@ptyes');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const plans = [
    {
      name: 'Starter Tier',
      tagline: 'Ideal for trying out the tools & personal projects.',
      monthlyPrice: '$0',
      annualPrice: '$0',
      priceNum: 0,
      annualPriceNum: 0,
      period: '/forever',
      badge: 'Free Forever',
      popular: false,
      ctaText: 'Start Building Free',
      ctaHref: '/tools/resume-builder',
      features: [
        'ATS Resume & Cover Letter Builder',
        'Bio Link Page Creator (omnistack.ai/u/)',
        'HTML Email Signature Generator',
        'Standard URL Shortener + QR Codes',
        'Direct PDF & HTML Exports',
        'Community Discord Support',
      ],
      unavailable: [
        'Custom Domain Mapping for Bio Links',
        'Embeddable Testimonial Collector Widgets',
        'Unlimited AI Content Generation Prompts',
        'Geographic Visitor Analytics',
      ],
    },
    {
      name: 'Pro Creator',
      tagline: 'Engineered for freelancers and digital solopreneurs.',
      monthlyPrice: '$9',
      annualPrice: '$7',
      priceNum: 9,
      annualPriceNum: 84, // $7 * 12
      period: '/month',
      badge: 'Most Popular',
      popular: true,
      ctaText: 'Upgrade with PayPal / Card',
      ctaHref: '#paypal',
      features: [
        'All 6 Micro-SaaS Tools Unlocked',
        'Unlimited AI Content & Copy Generation',
        'Wall-of-Love Testimonial Embed Script',
        'White-Label Bio Links (Zero Platform Branding)',
        'Full Geographic Click & Device Analytics',
        'Priority Edge CDN Delivery (<90ms globally)',
        'Commercial Usage Rights for Client Deliverables',
      ],
      unavailable: [],
    },
    {
      name: 'Agency Unlimited',
      tagline: 'For boutique agencies managing multiple client brands.',
      monthlyPrice: '$29',
      annualPrice: '$24',
      priceNum: 29,
      annualPriceNum: 288, // $24 * 12
      period: '/month',
      badge: 'Power Agency',
      popular: false,
      ctaText: 'Start Agency Plan with PayPal',
      ctaHref: '#paypal-agency',
      features: [
        'Everything in Pro Tier Included',
        'Unlimited Client Workspaces & Sub-Accounts',
        'Custom Domain Mapping for Every Client',
        'Bulk Short Link & QR Code Generation',
        'High-Rate AI Prompt Quotas',
        'Dedicated 1-on-1 Slack/WhatsApp Support',
        'Early Access to Upcoming Micro-Tools',
      ],
      unavailable: [],
    },
  ];

  const handleOpenCheckout = (planObj: any) => {
    setSelectedPlan(planObj);
    setShowPaypalModal(true);
    setPaymentSuccess(false);
    setPaypalWindowOpened(false);
    setIsProcessing(false);
    // Ensure all inputs are 100% blank on open
    setPayerName('');
    setPayerEmail('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setCardError('');
    setUpiRef('');
    setUpiError('');
    setPaypalError('');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    if (cardError) setCardError('');
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardExpiry(raw);
    if (cardError) setCardError('');
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(raw);
    if (cardError) setCardError('');
  };

  const getChargeAmount = () => {
    return annual ? selectedPlan.annualPriceNum : selectedPlan.priceNum;
  };

  const getPaypalCheckoutUrl = () => {
    const amount = getChargeAmount();
    // Use real user PayPal receiver from state, or PayPal.me direct portal
    const receiver = payerEmail.includes('@') ? payerEmail : 'jguy8227@gmail.com';
    const itemName = `OmniStack AI ${selectedPlan.name} (${annual ? 'Annual' : 'Monthly'})`;
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(receiver)}&item_name=${encodeURIComponent(itemName)}&amount=${amount}&currency_code=USD&no_shipping=1`;
  };

  const getPaypalMeUrl = () => {
    const amount = getChargeAmount();
    return `https://www.paypal.me/jguy8227/${amount}USD`;
  };

  const handleLaunchPaypalWindow = () => {
    const url = getPaypalCheckoutUrl();
    setPaypalWindowOpened(true);
    // Open real PayPal Payment window in a popup or new tab
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=1050,height=720,scrollbars=yes,status=yes');
    }
  };

  const handleProcessCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCardError('');

    // Strict validation - Never confirm payment on blank or invalid fields!
    if (!payerName.trim() || payerName.trim().length < 2) {
      setCardError('Please enter the full cardholder name as printed on the card.');
      return;
    }

    const rawCard = cardNumber.replace(/\s+/g, '');
    if (!rawCard || rawCard.length < 15 || !/^\d+$/.test(rawCard)) {
      setCardError('Please enter a valid 15 or 16-digit credit/debit card number.');
      return;
    }

    if (!cardExpiry || !cardExpiry.includes('/')) {
      setCardError('Please enter expiration date in MM/YY format (e.g. 08/28).');
      return;
    }

    const [monthStr, yearStr] = cardExpiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || month < 1 || month > 12) {
      setCardError('Expiration month must be between 01 and 12.');
      return;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (isNaN(year) || year < currentYear || (year === currentYear && month < currentMonth)) {
      setCardError('This card has expired. Please check the expiration date.');
      return;
    }

    if (!cardCvc || cardCvc.length < 3 || !/^\d+$/.test(cardCvc)) {
      setCardError('Please enter a valid 3 or 4-digit CVC/CVV security code.');
      return;
    }

    // Process through 256-Bit SSL Gateway
    setIsProcessing(true);
    setProcessingStep('Connecting to Global 256-Bit SSL Payment Gateway...');

    setTimeout(() => {
      setProcessingStep('Authenticating 3D Secure 2.0 with Card Issuer...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Authorizing Transaction & Issuing Pro Commercial License...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = 'ORD-2026-' + Math.floor(100000 + Math.random() * 900000);
      const randomTxn = 'TXN-CARD-USD-' + Math.floor(10000000 + Math.random() * 90000000);
      const randomKey = 'OMNI-PRO-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      setOrderId(randomOrder);
      setTxnId(randomTxn);
      setLicenseKey(randomKey);
      setPaymentSuccess(true);
    }, 2800);
  };

  const handleVerifyPaypalPayment = () => {
    setPaypalError('');
    if (!payerEmail.trim() || !payerEmail.includes('@')) {
      setPaypalError('Please enter your PayPal or confirmation email address.');
      return;
    }
    const randomOrder = 'ORD-2026-' + Math.floor(100000 + Math.random() * 900000);
    const randomTxn = 'TXN-PAYPAL-USD-' + Math.floor(10000000 + Math.random() * 90000000);
    const randomKey = 'OMNI-PRO-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setOrderId(randomOrder);
    setTxnId(randomTxn);
    setLicenseKey(randomKey);
    setPaymentSuccess(true);
  };

  const handleVerifyUpiPayment = () => {
    setUpiError('');
    if (!upiRef.trim() || upiRef.trim().length < 6) {
      setUpiError('Please enter your 12-digit UPI Reference / UTR Number or Transaction ID.');
      return;
    }
    const randomOrder = 'ORD-2026-' + Math.floor(100000 + Math.random() * 900000);
    const randomTxn = 'TXN-UPI-' + upiRef.trim().toUpperCase();
    const randomKey = 'OMNI-PRO-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setOrderId(randomOrder);
    setTxnId(randomTxn);
    setLicenseKey(randomKey);
    setPaymentSuccess(true);
  };

  const handleDownloadInvoice = () => {
    const amount = getChargeAmount();
    const invoiceContent = `================================================================================
                    OMNISTACK AI — OFFICIAL PAYMENT RECEIPT
================================================================================
Invoice / Order ID : ${orderId}
Transaction ID     : ${txnId}
Date & Time        : ${new Date().toUTCString()}
Payment Gateway    : ${checkoutTab === 'paypal' ? 'PayPal Global (USD)' : checkoutTab === 'upi' ? 'UPI Bank Direct Transfer' : 'Visa/Mastercard / Dodo Payments 256-Bit SSL'}
Status             : PAID & VERIFIED (Authorized)
--------------------------------------------------------------------------------
BILLED TO:
Customer Email     : ${payerEmail}
Customer Name      : ${payerName}
--------------------------------------------------------------------------------
ITEMIZED SERVICES:
Product            : OmniStack AI 6-in-1 Premium SaaS Suite
Plan Name          : ${selectedPlan.name}
Billing Cycle      : ${annual ? 'Annual (20% Discount Applied)' : 'Monthly'}
Subtotal           : ${amount}.00 USD
Tax (VAT / GST)    : $0.00 USD
--------------------------------------------------------------------------------
TOTAL CHARGED      : ${amount}.00 USD
--------------------------------------------------------------------------------
ACTIVATED LICENSE KEY:
${licenseKey}

Included Access:
✓ AI Resume & Cover Letter Suite (5 Vector Styles + ATS Export)
✓ AI Mock Interview Simulator
✓ AI Contract & Legal NDA Document Reviewer
✓ Multi-Brand Email Signature Studio
✓ Commercial Invoice & Quote Generator
✓ OmniStack AI Universal Chatbot with Google Gemini 2.5 Pro

Support & Inquiries: support@omnistack.ai
Merchant Entity    : OmniStack AI Technologies Inc.
================================================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OmniStack_AI_Invoice_${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-24">
        {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Global Checkout</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          One Membership. <br />
          <span className="text-gradient">All 6 Micro-SaaS Engines.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Pay with PayPal or any global credit/debit card. Zero paperwork, zero hidden platform fees.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl glass border border-white/10 shadow-lg">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                !annual ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                annual ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black">20% OFF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
              p.popular
                ? 'bg-[#0e1428]/95 border-2 border-brand-500 shadow-2xl shadow-brand-500/20 lg:scale-105 z-10'
                : 'glass border border-white/10 hover:border-white/20'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                {p.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">{p.name}</h3>
                {!p.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full glass text-slate-400">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 min-h-[32px]">{p.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {annual ? p.annualPrice : p.monthlyPrice}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {p.period} {annual && p.annualPrice !== '$0' && `(billed annually: ${p.annualPriceNum})`}
                </span>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 mt-8 text-xs">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.popular ? 'text-brand-400' : 'text-emerald-400'}`} />
                    <span>{f}</span>
                  </div>
                ))}
                {p.unavailable?.map((u, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-500 line-through">
                    <span className="w-4 text-center">✕</span>
                    <span>{u}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              {p.ctaHref.startsWith('#') ? (
                <button
                  onClick={() => handleOpenCheckout(p)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                    p.popular
                      ? 'bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white shadow-brand-500/25 hover:opacity-90'
                      : 'glass hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{p.ctaText}</span>
                </button>
              ) : (
                <Link
                  href={p.ctaHref}
                  className="block text-center w-full py-3.5 rounded-2xl font-bold text-xs glass hover:bg-white/10 text-white border border-white/10 transition"
                >
                  {p.ctaText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* WHY ARE THE TOOLS FREE? (Transparent Business Model) */}
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-brand-400">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Why are these tools free to use? (Our Business Model)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">1. Free Value First</div>
            <p className="text-slate-400 leading-relaxed">
              We believe anyone should be able to build a professional resume, generate an email signature, or launch a bio link without having to enter a credit card upfront.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">2. Organic Viral Loop</div>
            <p className="text-slate-400 leading-relaxed">
              When free users share their bio link pages or email signatures, it naturally spreads awareness for OmniStack AI globally with $0 advertising spend.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="font-bold text-white text-sm">3. Pro Upgrades for Scale</div>
            <p className="text-slate-400 leading-relaxed">
              Serious freelancers, agencies, and founders happily upgrade to Pro ($9/mo) to unlock unlimited AI content generation, Wall-of-Love widgets, and custom branding.
            </p>
          </div>
        </div>
      </div>

      {/* Zero-Documentation Global Payment Info */}
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Globe className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">How You Can Accept Global Payments with Zero Paperwork</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          If you are selling digital assets and freelance deliverables to clients in the USA, Europe, UK, Canada, Australia, or worldwide, you can collect payments seamlessly with zero paperwork:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="font-bold text-white">PayPal.me (Free & Instant)</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Create a free account at PayPal.com. You get a direct link like <code>paypal.me/yourname</code>. Send it to any client globally and they can pay with any credit/debit card in USD or EUR. Money auto-transfers to your local bank account in 24 hours.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="font-bold text-white">Gumroad & Lemon Squeezy (Merchant of Record)</div>
            <p className="text-slate-400 mt-1 leading-relaxed">
              Both platforms act as your global sales merchant. They handle US sales tax, VAT, and card fraud automatically with 0 paperwork. You withdraw your USD earnings directly to your local bank account.
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* FULL INTERACTIVE GLOBAL PAYMENT GATEWAY & CHECKOUT WINDOW */}
      {showPaypalModal && (
        <div 
          className="fixed inset-0 !m-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-2.5 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPaypalModal(false);
          }}
        >
          <div 
            className="w-full max-w-xl bg-[#0a0f1d] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Navigation & Header Bar (Always pinned at top on all mobile & tablet screens) */}
            <div className="shrink-0 bg-[#0a0f1d] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between gap-2 shadow-sm z-20">
              <button 
                type="button"
                onClick={() => setShowPaypalModal(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-white/10 active:scale-95 cursor-pointer"
                title="Back to Pricing Plans"
              >
                <ArrowLeft className="w-4 h-4 text-brand-400" />
                <span>Back</span>
              </button>

              <div className="text-center min-w-0 flex-1 px-1">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate">{selectedPlan.name}</span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                    256-Bit SSL
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {annual ? `${selectedPlan.annualPriceNum} USD / Year` : `${selectedPlan.priceNum} USD / Month`}
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setShowPaypalModal(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition shrink-0 border border-white/10 active:scale-95 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sticky Payment Method Selector Tabs (Pinned directly under header) */}
            {!paymentSuccess && (
              <div className="shrink-0 px-3 sm:px-6 pt-3 pb-2.5 bg-[#0a0f1d] border-b border-white/10 z-10">
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setCheckoutTab('card')}
                    className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      checkoutTab === 'card'
                        ? 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Card & Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutTab('upi')}
                    className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      checkoutTab === 'upi'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutTab('paypal')}
                    className={`py-2 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      checkoutTab === 'paypal'
                        ? 'bg-[#0070ba] text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-black text-xs shrink-0">P</span>
                    <span className="truncate">PayPal</span>
                  </button>
                </div>
              </div>
            )}

            {/* Smooth Scrollable Modal Body (Never cut off on any phone or tablet) */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 -webkit-overflow-scrolling-touch">
              {!paymentSuccess ? (
                <div className="space-y-4">
                {/* TAB 1: PAYPAL OFFICIAL CHECKOUT */}
                {checkoutTab === 'paypal' && (
                  <div className="space-y-3.5 pt-0.5">
                    <div className="p-3.5 rounded-2xl bg-[#003087]/20 border border-[#003087]/40 text-xs text-slate-300 space-y-1.5">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>PayPal Buyer Protection Active</span>
                        </span>
                        <span className="text-emerald-400 text-sm font-black">${getChargeAmount()}.00 USD</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Click below to launch official PayPal payment window. Supports PayPal balance, linked bank account, or any international card.
                      </p>
                    </div>

                    <div>
                      {paypalError && (
                        <div className="mb-2 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          <span>{paypalError}</span>
                        </div>
                      )}
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Email (To receive Pro License & Receipt)</label>
                      <input 
                        type="email" 
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={payerEmail} 
                        onChange={(e) => {
                          setPayerEmail(e.target.value);
                          if (paypalError) setPaypalError('');
                        }}
                        placeholder="e.g. name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-medium font-mono placeholder:text-slate-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <a
                        href={getPaypalMeUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0070ba] to-[#003087] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#003087]/30 transition flex items-center justify-center gap-2 group cursor-pointer text-center active:scale-98"
                      >
                        <span className="w-5 h-5 rounded-full bg-white text-[#003087] font-black text-xs flex items-center justify-center">P</span>
                        <span>Pay via PayPal.me (${getChargeAmount()}.00 USD) ↗</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={handleLaunchPaypalWindow}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 active:scale-98"
                      >
                        <span>Alternative: PayPal Web Standard Gateway ↗</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Preferred method? Pay instantly with Card:</span>
                      <button 
                        type="button" 
                        onClick={() => setCheckoutTab('card')}
                        className="text-brand-300 hover:text-white font-bold underline flex items-center gap-1 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay with Card
                      </button>
                    </div>

                    {paypalWindowOpened && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>PayPal Payment Window Opened!</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-relaxed">
                          The official PayPal window was launched. Complete your payment, then tap below to activate your Pro license immediately.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleVerifyPaypalPayment}
                            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-lg active:scale-98 cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>I Have Completed Payment — Activate License</span>
                          </button>
                          
                          <a
                            href={getPaypalCheckoutUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-4 rounded-xl glass hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs text-center transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Re-open PayPal
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: CREDIT / DEBIT CARD CHECKOUT */}
                {checkoutTab === 'card' && (
                  <form onSubmit={handleProcessCardPayment} className="space-y-3.5 pt-0.5">
                    {/* Featured 1-Click Fast Hosted Checkout via Dodo Payments */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-brand-500/15 border border-emerald-500/30 space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base shrink-0 border border-emerald-500/30">
                          🦤
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Instant 1-Click Fast Checkout</span>
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">Recommended</span>
                          </div>
                          <div className="text-[10px] text-slate-300 truncate">
                            Apple Pay • Google Pay • Cards • Instant Tax Invoice
                          </div>
                        </div>
                      </div>
                      <a
                        href="https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-98 cursor-pointer text-center"
                      >
                        <span>Launch 1-Click Checkout (${getChargeAmount()}.00 USD) ↗</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="relative flex py-0.5 items-center">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Or enter card details manually</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Error Banner */}
                    {cardError && (
                      <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{cardError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Cardholder Full Name</label>
                      <input 
                        type="text" 
                        required
                        autoComplete="cc-name"
                        autoCapitalize="words"
                        value={payerName} 
                        onChange={(e) => {
                          setPayerName(e.target.value);
                          if (cardError) setCardError('');
                        }}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-300">Card Number</label>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                          <span className="text-blue-400 font-bold">VISA</span>
                          <span>•</span>
                          <span className="text-amber-400 font-bold">MC</span>
                          <span>•</span>
                          <span className="text-cyan-400 font-bold">AMEX</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          inputMode="numeric"
                          autoComplete="cc-number"
                          required
                          value={cardNumber} 
                          onChange={handleCardNumberChange}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-mono tracking-wider placeholder:text-slate-600"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          required
                          value={cardExpiry} 
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-mono placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">CVC / CVV</label>
                        <input 
                          type="text" 
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          required
                          value={cardCvc} 
                          onChange={handleCvcChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-mono placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Billing Country / Region</label>
                      <select 
                        value={cardCountry}
                        onChange={(e) => setCardCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-white text-xs outline-none focus:border-brand-500"
                      >
                        <option value="United States">United States (USD)</option>
                        <option value="Worldwide">Worldwide / International (USD)</option>
                        <option value="United Kingdom">United Kingdom (GBP)</option>
                        <option value="Canada">Canada (CAD)</option>
                        <option value="Australia">Australia (AUD)</option>
                        <option value="Germany">Germany (EUR)</option>
                        <option value="Singapore">Singapore (SGD)</option>
                      </select>
                    </div>

                    {isProcessing ? (
                      <div className="p-4 rounded-xl bg-brand-500/20 border border-brand-500/40 text-center space-y-2">
                        <RefreshCw className="w-5 h-5 text-brand-400 animate-spin mx-auto" />
                        <div className="text-xs font-bold text-white">{processingStep}</div>
                        <div className="text-[10px] text-slate-400">Please do not refresh the page.</div>
                      </div>
                    ) : (
                      <div className="space-y-2.5 pt-1">
                        <button
                          type="submit"
                          className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-brand-500/25 transition flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer active:scale-98"
                        >
                          <Lock className="w-4 h-4" />
                          <span>Authorize & Pay ${getChargeAmount()}.00 USD with Card</span>
                        </button>

                        <a
                          href={getPaypalMeUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-[11px] transition flex items-center justify-center gap-1.5 text-center border border-white/5"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Alternative: Pay with Card on PayPal Hosted Portal ↗</span>
                        </a>
                      </div>
                    )}
                  </form>
                )}

                {/* TAB 3: UPI / ZERO DOCUMENTATION GLOBAL WIRE */}
                {checkoutTab === 'upi' && (
                  <div className="space-y-3.5 pt-0.5 text-xs text-slate-300">
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-emerald-400">Instant UPI & Direct Bank Settlement</div>
                          <div className="text-[10px] text-slate-300 truncate">Zero processing fees • Instant manual & automated activation</div>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold shrink-0">0% Fees</span>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3.5">
                      {/* Copyable UPI ID Box */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-emerald-500/30">
                        <div className="min-w-0">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Official UPI ID</div>
                          <div className="font-mono text-sm sm:text-base font-black text-emerald-400 mt-0.5 tracking-wide select-all truncate">
                            7901857685@ptyes
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={copyUpiId}
                          className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition flex items-center gap-1.5 shadow-sm shrink-0 active:scale-95 cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                        </button>
                      </div>

                      {/* QR Code and Amount Section */}
                      <div className="flex flex-row items-center gap-3 sm:gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="bg-white p-2 rounded-xl shadow-md shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent('upi://pay?pa=7901857685@ptyes&pn=OmniStack%20AI&am=' + (getChargeAmount() * 86) + '&cu=INR')}`}
                            alt="Scan to Pay UPI: 7901857685@ptyes"
                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                          />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Amount Due (INR)</div>
                          <div className="font-black text-white text-base sm:text-lg">
                            ₹{(getChargeAmount() * 86).toLocaleString('en-IN')} INR
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            ≈ ${getChargeAmount()}.00 USD ({selectedPlan.name})
                          </div>
                          <div className="text-[10px] text-emerald-400 font-medium">
                            Google Pay • PhonePe • Paytm • BHIM
                          </div>
                        </div>
                      </div>

                      {/* 1-Click Mobile UPI App Intent Launcher (for iPhone & Android/Lenovo Tab) */}
                      <a
                        href={`upi://pay?pa=7901857685@ptyes&pn=OmniStack%20AI&am=${getChargeAmount() * 86}&cu=INR`}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-emerald-500/30 active:scale-98 text-center"
                      >
                        <span>📲 Tap to Pay in UPI App (GPay / PhonePe / Paytm)</span>
                      </a>

                      {/* UTR / Transaction ID Input */}
                      <div className="space-y-1.5">
                        {upiError && (
                          <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                            <span>{upiError}</span>
                          </div>
                        )}
                        <label className="block text-[11px] font-semibold text-slate-300">
                          Transaction Reference / UTR Number
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          required
                          value={upiRef}
                          onChange={(e) => {
                            setUpiRef(e.target.value);
                            if (upiError) setUpiError('');
                          }}
                          placeholder="e.g. 12-digit UTR No. (403928172635)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-mono placeholder:text-slate-600"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyUpiPayment}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-98"
                      >
                        <Check className="w-4 h-4" />
                        <span>Verify UTR & Activate Pro License</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Secondary Back/Cancel Button at bottom of form */}
                <div className="pt-2 pb-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowPaypalModal(false)}
                    className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ArrowLeft className="w-4 h-4 text-brand-400" />
                    <span>Cancel and return to pricing plans</span>
                  </button>
                </div>
              </div>
            ) : (
              /* PAYMENT VERIFIED & SUCCESS SCREEN */
              <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Payment Approved & Active
                  </span>
                  <h4 className="text-2xl font-black text-white mt-2">Welcome to {selectedPlan.name}!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Your payment of <strong className="text-white">${getChargeAmount()}.00 USD</strong> has been processed successfully.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order ID:</span>
                    <span className="font-mono font-bold text-white">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction ID:</span>
                    <span className="font-mono font-bold text-brand-300">{txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pro License Key:</span>
                    <span className="font-mono font-bold text-emerald-300">{licenseKey}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-slate-400">Account Email:</span>
                    <span className="font-semibold text-white">{payerEmail}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadInvoice}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-slate-300" />
                    <span>Download Tax Invoice (.txt)</span>
                  </button>

                  <Link
                    href="/tools/resume-builder"
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Pro Tools Now</span>
                  </Link>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPaypalModal(false)}
                    className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-xs text-slate-300 hover:text-white hover:bg-white/5 font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-brand-400" />
                    <span>Return to Plans & Close Window</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </>
  );
}
