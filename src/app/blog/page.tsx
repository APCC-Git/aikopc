import { client } from "@/lib/microcms"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import dayjs from 'dayjs';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blogs', // 'blogs'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title',  // idとtitleを取得
      limit: 5,  // 最新の5件を取得
    },
  });
  return data.contents;
}
export default async function BlogPage() {
  const data = await getBlogPosts();

  if(!data) return <div>記事がありません</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">ブログ</h1>
      <div className="grid gap-4">
        {data.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <Link href={`/blog/${post.id}`} className="text-lg font-semibold hover:underline">
                {post.title}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
