"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils" // shadcn標準のクラス結合ユーティリティ
import Image from 'next/image'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full border-b shadow-sm mb-2 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="logo" width={50} height={50} priority/>
          {/*AikoPC.net*/}
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm hover:underline">Home</Link>
          <Link href="/about" className="text-sm hover:underline">About</Link>
          <Link href="/blog/page/1" className="text-sm hover:underline">Blog</Link>
        </nav>

        <div className="flex items-center gap-2">          
          {/* モバイルメニュー切り替えボタン */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {/* ログインボタン */}
          <Link href="/login">
            <Button variant="outline" className="inline-block">ログイン</Button>
          </Link>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white px-4 overflow-hidden transition-all duration-300 z-40 rounded-b-sm shadow-sm",
          menuOpen ? "max-h-[300px] py-3" : "max-h-0 py-0"
        )}
      >
        <nav className="flex flex-col space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">About</Link>
          <Link href="/blog/page/1" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">Blog</Link>
        </nav>
      </div>
    </header>
  )
}
