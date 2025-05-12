import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LogoutButton } from '@/components/ui/logoutButton';

export default async function DashboardPage() {
  const token = (await cookies()).get('token')?.value;

  if (!token) return <div>ログインが必要です</div>;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    // 型ガードで判定
    if (typeof payload === 'object' && payload !== null && 'userId' in payload) {
      return (
        <div>
          ようこそ userId: {(payload as JwtPayload).userId}
          <br />
          <LogoutButton />
        </div>
      );
    } else {
      return <div>トークンの形式が不正です</div>;
    }
  } catch {
    return <div>トークンが無効です</div>;
  }
}
