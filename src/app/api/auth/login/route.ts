import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// 仮のユーザーデータ（実際はDBから取得）
// const users = [{ id: '69119', username: 'Rix', passwordHash: await bcrypt.hash('admin', 10) }];

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body || typeof body !== 'object' || !('id' in body) || !('password' in body)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { id, password } = body as { id: string; password: string };

  const prismaUser = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });

  if (!prismaUser) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const passwordValid = await bcrypt.compare(password, prismaUser.password);
  if (!passwordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // JWT 生成
  const token = jwt.sign(
    {
      id: prismaUser.id,
      userId: prismaUser.userId,
      username: prismaUser.username,
      role: prismaUser.role,
    },
    process.env.JWT_SECRET!, // .env に JWT_SECRET を設定しておくこと
    { expiresIn: '10h' }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, { httpOnly: true, path: '/' });

  return res;
}
