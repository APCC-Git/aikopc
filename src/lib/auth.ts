import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}
