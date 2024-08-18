import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return NextResponse.json({ message: 'hello world' });
}
