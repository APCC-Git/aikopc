import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { getUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    if (!body || typeof body !== 'object' || !('users' in body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { users } = body;

    if (!Array.isArray(users)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const results = await Promise.all(
      users.map(async user => {
        const { userId, username, password } = user;

        // 入力値の検証
        if (!userId || !username || !password) {
          return { userId, error: '必須項目が不足しています' };
        }

        // すでに存在する userId または username の確認
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ userId }, { username }],
          },
        });

        if (existingUser) {
          const duplicateField = existingUser.userId === userId ? '生徒番号' : 'ユーザー名';
          return { userId, username, error: `この${duplicateField}は既に使用されています` };
        }

        try {
          // パスワードのハッシュ化
          const hashedPassword = await bcrypt.hash(password, 10);

          // ユーザーの作成
          await prisma.user.create({
            data: {
              userId,
              username,
              password: hashedPassword,
            },
          });

          return { userId, success: true };
        } catch (error) {
          return { userId, error: 'ユーザーの作成に失敗しました' };
        }
      })
    );

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => r.error);

    return NextResponse.json({
      success: failed.length === 0,
      summary: {
        total: results.length,
        successful: successful.length,
        failed: failed.length,
        failedUsers: failed,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
