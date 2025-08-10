import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 保護されたパス（認証が必要）
const protectedRoutes = ['/dashboard', '/csv'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  if (pathname.startsWith('/blog') || pathname === '/about') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  //ログイン済みユーザーは/dashboardへ
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // トークンがない、または無効ならログインに飛ばす
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET!);
  //   return NextResponse.next(); // 検証OK → 通過
  // } catch {
  //   const loginUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }
}
