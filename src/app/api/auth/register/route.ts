import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { getUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const body = await req.json();

  if (
    !body ||
    typeof body !== 'object' ||
    !('userId' in body) ||
    !('username' in body) ||
    !('password' in body)
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { userId, username, password } = body;

  if (
    !userId ||
    !username ||
    !password ||
    typeof userId !== 'string' ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // すでに存在する userId または username の確認
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ userId }, { username }],
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザーの作成
  const newUser = await prisma.user.create({
    data: {
      userId,
      username,
      password: hashedPassword,
      // role: 'user' は Prisma 側で default(user) なので省略可
    },
  });

  return NextResponse.json({
    success: true,
    user: { id: newUser.userId, username: newUser.username },
  });
}
