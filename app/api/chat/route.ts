import { NextRequest, NextResponse } from 'next/server';
import { v0 } from 'v0-sdk';

const SYSTEM_PROMPT = `You are a specialized search bar widget generator. You ONLY create search bar components - nothing else.

Rules:
1. Only generate search bar/search input widgets
2. Use modern, beautiful styling with Tailwind CSS
3. Create both floating and non-floating variants when asked
4. Include hover effects, focus states, and animations
5. Make widgets fully responsive
6. Generate clean, embeddable code
7. Each widget should be self-contained HTML/CSS that can be embedded anywhere

Style preferences:
- Modern, sleek designs
- Subtle shadows and glows
- Smooth transitions
- Accessible color contrasts`;

export async function POST(request: NextRequest) {
  try {
    const { message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.V0_API_KEY) {
      return NextResponse.json(
        { error: 'V0_API_KEY not configured' },
        { status: 500 }
      );
    }

    let chat;

    if (chatId) {
      chat = await v0.chats.sendMessage({
        chatId,
        message,
        system: SYSTEM_PROMPT,
      });
    } else {
      chat = await v0.chats.create({
        message,
        system: SYSTEM_PROMPT,
      });
    }

    if (chat instanceof ReadableStream) {
      return NextResponse.json(
        { error: 'Streaming not supported' },
        { status: 400 }
      );
    }

    const demoUrl = chat.latestVersion?.demoUrl || chat.demo;
    const files = chat.latestVersion?.files || [];
    const lastMessage = chat.messages?.find(m => m.role === 'assistant');
    const responseText = lastMessage?.content || chat.text || '';

    return NextResponse.json({
      id: chat.id,
      demo: demoUrl,
      text: responseText,
      files: files.map((f) => ({
        name: f.name,
        content: f.content,
      })),
      webUrl: chat.webUrl,
    });
  } catch (error) {
    console.error('v0 API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate widget' },
      { status: 500 }
    );
  }
}
