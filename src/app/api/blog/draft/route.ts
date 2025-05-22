import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

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
    // リクエストボディからデータを取得
    const { title, text } = body as { title: string; text: string };

    // バリデーション
    if (!title || !text) {
      return NextResponse.json({ error: 'タイトルと内容は必須です' }, { status: 400 });
    }

    // 下書きを保存
    const draft = await prisma.draft.create({
      data: {
        title,
        content: text,
        userId: user.id,
      },
    });

    console.log(draft);

    return NextResponse.json(draft, { status: 201 });
  } catch (error) {
    console.error('下書き保存エラー:', error);
    return NextResponse.json({ error: '下書きの保存に失敗しました' }, { status: 500 });
  }
}

//下書き一覧を取得するAPI
export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const drafts = await prisma.draft.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(drafts);
  } catch (error) {
    console.error('下書き取得エラー:', error);
    return NextResponse.json({ error: '下書きの取得に失敗しました' }, { status: 500 });
  }
}
