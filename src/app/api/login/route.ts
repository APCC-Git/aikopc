import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 仮のユーザーデータ（実際はDBから取得）
const users = [
  { id: '69119', username: 'admin', passwordHash: await bcrypt.hash('admin', 10) },
]

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const user = users.find(u => u.username === username)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

  const res = NextResponse.json({ success: true })
  res.cookies.set('token', token, { httpOnly: true, path: '/' })

  return res
}
