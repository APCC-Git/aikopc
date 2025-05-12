import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Cookie を無効化（expires を過去に）
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // 即時期限切れに
  });

  return response;
}
