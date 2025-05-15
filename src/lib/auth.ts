import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type User = {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
};

export async function getUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
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
    return user;
  } catch (err) {
    // 無効 or 有効期限切れのトークン
    return null;
  }
}
