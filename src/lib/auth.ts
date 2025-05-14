// ログイン状態の取得、ログイン中ならユーザー情報を返す

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  const user = jwt.verify(token, process.env.JWT_SECRET!);
  if (
    typeof user !== 'object' ||
    typeof user.userId !== 'string' ||
    typeof user.username !== 'string' ||
    typeof user.role !== 'string' ||
    typeof user.iat !== 'number' ||
    typeof user.exp !== 'number'
  ) {
    return null;
  }

  try {
    return user;
  } catch {
    return null;
  }
}
