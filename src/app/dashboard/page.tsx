import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export default async function DashboardPage() {
  const token = cookies().get('token')?.value

  if (!token) return <div>ログインが必要です</div>

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    return <div>ようこそ、ユーザーID: {payload.userId}</div>
  } catch {
    return <div>トークンが無効です</div>
  }
}