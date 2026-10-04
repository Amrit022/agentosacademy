import { NextRequest, NextResponse } from 'next/server';
import { getDodoPlan, getDodoCheckoutUrl } from '@/lib/dodo-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tier = body.tier === 'agency' ? 'agency' : 'pro';
    const annual = Boolean(body.annual);

    const plan = getDodoPlan(tier, annual);
    const configuredUrl = getDodoCheckoutUrl(tier, annual);

    // If an API key is provided in server environment, attempt dynamic session creation via Dodo API
    const dodoApiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (dodoApiKey) {
      try {
        const isTest = dodoApiKey.startsWith('test_') || process.env.NODE_ENV !== 'production';
        const dodoEndpoint = isTest 
          ? 'https://test.dodopayments.com/checkouts' 
          : 'https://api.dodopayments.com/checkouts';

        const origin = req.headers.get('origin') || 'https://agentosacademy.com';

        const dodoRes = await fetch(dodoEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${dodoApiKey}`
          },
          body: JSON.stringify({
            product_cart: [
              {
                product_id: plan.id,
                quantity: 1
              }
            ],
            return_url: `${origin}/pricing?payment_status=success&plan=${plan.key}`
          })
        });

        if (dodoRes.ok) {
          const data = await dodoRes.json();
          if (data.checkout_url) {
            return NextResponse.json({ 
              success: true, 
              checkoutUrl: data.checkout_url, 
              isDynamicSession: true 
            });
          }
        }
      } catch (dodoErr) {
        console.warn('Dodo API dynamic session failed, falling back to hosted URL:', dodoErr);
      }
    }

    // Hosted URL fallback
    if (configuredUrl) {
      return NextResponse.json({ 
        success: true, 
        checkoutUrl: configuredUrl, 
        isConfigured: true 
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: `Dodo checkout link for ${plan.name} has not been configured yet.`,
      plan
    }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Failed to process Dodo checkout' 
    }, { status: 500 });
  }
}
