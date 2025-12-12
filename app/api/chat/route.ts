import { NextRequest, NextResponse } from 'next/server';
import { v0 } from 'v0-sdk';

export async function POST(request: NextRequest) {
  try {
    const { message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 },
      );
    }

    let chat: any; // Type assertion to work around interface limitations

    if (chatId) {
      // continue existing chat
      chat = await v0.chats.sendMessage({
        chatId: chatId,
        message,
      });
    } else {
      // create new chat
      chat = await v0.chats.create({
        message,
        system: 'You are an expert UI/UX designer. Create clean, responsive search bar widgets. Focus on floating and non-floating search bar designs.',
      });
    }

    return NextResponse.json({
      id: chat.id,
      demoUrl: chat.latestVersion?.demoUrl || null,
      webUrl: chat.webUrl || null,
    });
  } catch (error) {
    console.error('V0 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}