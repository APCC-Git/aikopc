import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { client } from '@/lib/microcms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    if (!body || typeof body !== 'object' || !('title' in body) || !('text' in body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { title, text } = body;

    // if (!Array.isArray(category)) {
    //   return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    // }

    // microCMSへの投稿処理
    const response = await client.create({
      endpoint: 'blogs',
      content: {
        title: title,
        content: text,
        eyecatch: '',
        category: 'pi5wc0btbrf',
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Article creation error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
