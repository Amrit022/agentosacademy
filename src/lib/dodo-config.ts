// Dodo Payments Centralized Subscription Configuration
// OmniStack AI SaaS Suite (https://agentosacademy.com)

export interface DodoPlan {
  key: 'pro-monthly' | 'pro-annual' | 'agency-monthly' | 'agency-annual';
  id: string;
  name: string;
  tier: 'pro' | 'agency';
  billing: 'monthly' | 'annual';
  priceUsd: number;
  periodLabel: string;
  discountBadge?: string;
  checkoutUrl: string;
  isConfigured: boolean;
  features: string[];
}

export const DODO_SUBSCRIPTION_PLANS: Record<string, DodoPlan> = {
  // 1. Pro Creator - Monthly ($9.00 USD)
  // Live verified product link
  'pro-monthly': {
    key: 'pro-monthly',
    id: 'pdt_0Noz3iseuD6nqAUvsHz2R',
    name: 'Pro Creator (Monthly)',
    tier: 'pro',
    billing: 'monthly',
    priceUsd: 9,
    periodLabel: '$9/month',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_PRO_MONTHLY_URL ||
      'https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1',
    isConfigured: true,
    features: [
      'All 6 Micro-SaaS Tools Unlocked',
      'Unlimited AI Content & Copy Generation',
      'Wall-of-Love Testimonial Embed Script',
      'White-Label Bio Links (Zero Platform Branding)',
      'Full Geographic Click & Device Analytics',
      'Priority Edge CDN Delivery (<90ms globally)',
      'Commercial Usage Rights for Client Deliverables',
    ],
  },

  // 2. Pro Creator - Annual ($84.00 USD / year = $7/mo)
  // Live verified product link
  'pro-annual': {
    key: 'pro-annual',
    id: 'pdt_0Np1qDMLvoeyTkbLCTlxq',
    name: 'Pro Creator (Annual)',
    tier: 'pro',
    billing: 'annual',
    priceUsd: 84,
    periodLabel: '$84/year ($7/mo)',
    discountBadge: 'Save 20%',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_URL ||
      'https://checkout.dodopayments.com/buy/pdt_0Np1qDMLvoeyTkbLCTlxq?quantity=1',
    isConfigured: true,
    features: [
      'Everything in Pro Monthly Included',
      'Save $24 per year (20% Annual Discount)',
      '12 Months Uninterrupted Access',
      'Priority Support & All Future Feature Updates',
    ],
  },

  // 3. Agency Unlimited - Monthly ($29.00 USD)
  // Live verified product link
  'agency-monthly': {
    key: 'agency-monthly',
    id: 'pdt_0Np1r1uRrhPDEdvIPoauq',
    name: 'Agency Unlimited (Monthly)',
    tier: 'agency',
    billing: 'monthly',
    priceUsd: 29,
    periodLabel: '$29/month',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_URL ||
      'https://checkout.dodopayments.com/buy/pdt_0Np1r1uRrhPDEdvIPoauq?quantity=1',
    isConfigured: true,
    features: [
      'Everything in Pro Tier Included',
      'Unlimited Client Workspaces & Sub-Accounts',
      'Custom Domain Mapping for Every Client',
      'Bulk Short Link & QR Code Generation',
      'High-Rate AI Prompt Quotas',
      'Dedicated 1-on-1 Slack/WhatsApp Support',
      'Early Access to Upcoming Micro-Tools',
    ],
  },

  // 4. Agency Unlimited - Annual ($288.00 USD / year = $24/mo)
  // Live verified product link
  'agency-annual': {
    key: 'agency-annual',
    id: 'pdt_0Np1rOczGBa2FMPQLMCzL',
    name: 'Agency Unlimited (Annual)',
    tier: 'agency',
    billing: 'annual',
    priceUsd: 288,
    periodLabel: '$288/year ($24/mo)',
    discountBadge: 'Save $60 / 20%',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_URL ||
      'https://checkout.dodopayments.com/buy/pdt_0Np1rOczGBa2FMPQLMCzL?quantity=1',
    isConfigured: true,
    features: [
      'Everything in Agency Monthly Included',
      'Save $60 per year with Annual Billing',
      'Priority VIP Engineering Channel',
      'Custom SLA & Unlimited Client Hand-offs',
    ],
  },
};

/**
 * Retrieve the active Dodo subscription plan based on tier and billing cycle.
 */
export function getDodoPlan(tier: 'pro' | 'agency', annual: boolean): DodoPlan {
  const key = `${tier}-${annual ? 'annual' : 'monthly'}`;
  return DODO_SUBSCRIPTION_PLANS[key] || DODO_SUBSCRIPTION_PLANS['pro-monthly'];
}

/**
 * Retrieve the checkout URL for a plan.
 */
export function getDodoCheckoutUrl(tier: 'pro' | 'agency', annual: boolean): string {
  const plan = getDodoPlan(tier, annual);
  return plan.checkoutUrl;
}
