import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, DETECT_LANGUAGE, checkHumanTakeover } from '@/lib/agent-prompts';

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const detectedLanguage = DETECT_LANGUAGE(lastMessage.content);
    const needsHumanTakeover = checkHumanTakeover(lastMessage.content);

    // If human takeover is needed, return special response
    if (needsHumanTakeover) {
      return NextResponse.json({
        content: `I understand you'd like to speak with our team directly. Let me connect you with the owner right away!

Please share your phone number, and our team will contact you immediately.

You can also reach us directly on WhatsApp: ${process.env.WHATSAPP_NUMBER || '+91-XXXXXXXXXX'}`,
        language: detectedLanguage,
        humanTakeover: true,
      });
    }

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        content: `Hello! Welcome to Pranav Enterprises.

I'm here to help you with:
• Printing services (Offset, Digital, Flex, Vinyl)
• Instant quotations
• Design assistance
• Sign boards and banners
• Business cards and invitations

What can I help you with today?`,
        language: detectedLanguage,
      });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);

      // Fallback response
      return NextResponse.json({
        content: `Thank you for contacting Pranav Enterprises!

How can I assist you today with our printing services?

We offer:
• Offset & Digital Printing
• Flex & Vinyl Printing
• Sign Boards & Banners
• Business Cards & Invitations
• Bill Books & Binding

Feel free to ask for a quotation!`,
        language: detectedLanguage,
      });
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    return NextResponse.json({
      content: assistantMessage,
      language: detectedLanguage,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
