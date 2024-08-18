import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export interface LpGenerateTestApiRequest {
  question: string;
}

export interface LpGenerateTestApiResponse {
  content: Anthropic.Messages.ContentBlock[];
}

export async function POST(req: NextRequest): Promise<NextResponse<LpGenerateTestApiResponse>> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_SECRET,
  });

  const { question } = (await req.json()) as LpGenerateTestApiRequest;

  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    temperature: 0,
    system: '短い詩でのみ答えてください。',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: question,
          },
        ],
      },
    ],
  });

  return NextResponse.json({ content: msg.content });
}
