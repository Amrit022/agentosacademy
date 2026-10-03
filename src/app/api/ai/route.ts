import { NextRequest, NextResponse } from 'next/server';
import { generateCopy, queryAgentOsAssistant } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, params, question } = body;

    if (action === 'generate_copy') {
      const output = generateCopy(params || {});
      return NextResponse.json({ success: true, output });
    }

    if (action === 'ask_assistant') {
      const response = queryAgentOsAssistant(question || '');
      return NextResponse.json({ success: true, ...response });
    }

    return NextResponse.json({ success: false, error: 'Unknown action specified' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}
