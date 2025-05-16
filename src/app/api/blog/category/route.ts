import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { client } from '@/lib/microcms';

export async function POST() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const response = await client.get({
      endpoint: 'categories',
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Article creation error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
