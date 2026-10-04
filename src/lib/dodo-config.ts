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
  // Live product link verified and active
  'pro-monthly': {
    key: 'pro-monthly',
    id: 'pdt_0Noz3iseuD6nqAUvsHz2R',
    name: 'Pro Creator (Monthly)',
    tier: 'pro',
    billing: 'monthly',
    priceUsd: 9,
    periodLabel: '$9/month',
    checkoutUrl: 'https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1',
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
  'pro-annual': {
    key: 'pro-annual',
    id: process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_ID || '',
    name: 'Pro Creator (Annual)',
    tier: 'pro',
    billing: 'annual',
    priceUsd: 84,
    periodLabel: '$84/year ($7/mo)',
    discountBadge: 'Save 20%',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_URL ||
      (process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_ID
        ? `https://checkout.dodopayments.com/buy/${process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_ID}?quantity=1`
        : ''),
    isConfigured: Boolean(
      process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_URL || process.env.NEXT_PUBLIC_DODO_PRO_ANNUAL_ID
    ),
    features: [
      'Everything in Pro Monthly Included',
      'Save $24 per year (20% Annual Discount)',
      '12 Months Uninterrupted Access',
      'Priority Support & All Future Feature Updates',
    ],
  },

  // 3. Agency Unlimited - Monthly ($29.00 USD)
  'agency-monthly': {
    key: 'agency-monthly',
    id: process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_ID || '',
    name: 'Agency Unlimited (Monthly)',
    tier: 'agency',
    billing: 'monthly',
    priceUsd: 29,
    periodLabel: '$29/month',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_URL ||
      (process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_ID
        ? `https://checkout.dodopayments.com/buy/${process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_ID}?quantity=1`
        : ''),
    isConfigured: Boolean(
      process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_URL || process.env.NEXT_PUBLIC_DODO_AGENCY_MONTHLY_ID
    ),
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
  'agency-annual': {
    key: 'agency-annual',
    id: process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_ID || '',
    name: 'Agency Unlimited (Annual)',
    tier: 'agency',
    billing: 'annual',
    priceUsd: 288,
    periodLabel: '$288/year ($24/mo)',
    discountBadge: 'Save $60 / 20%',
    checkoutUrl:
      process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_URL ||
      (process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_ID
        ? `https://checkout.dodopayments.com/buy/${process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_ID}?quantity=1`
        : ''),
    isConfigured: Boolean(
      process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_URL || process.env.NEXT_PUBLIC_DODO_AGENCY_ANNUAL_ID
    ),
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
 * Returns null if the specific tier's Dodo link is not configured yet.
 */
export function getDodoCheckoutUrl(tier: 'pro' | 'agency', annual: boolean): string | null {
  const plan = getDodoPlan(tier, annual);
  if (plan.checkoutUrl && plan.checkoutUrl.trim().length > 0) {
    return plan.checkoutUrl;
  }
  return null;
}
