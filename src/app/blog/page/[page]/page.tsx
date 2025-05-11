// app/blog/page/[page]/page.tsx
import { getBlogPostsByPage } from "@/lib/microcms";
import { Pagination } from "@/components/ui/Pagination"
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import dayjs from "dayjs"

type Post = {
  id: string
  title: string
  publishedAt: string
  eyecatch?: {
    url: string
    height: number
    width: number
  }
  category?: {
    id: string
    name: string
  }
}

const limit = 10; //1ページに表示する記事の数

export async function generateStaticParams() {
  const { totalCount } = await getBlogPostsByPage(1,limit);
  const pageCount = Math.ceil(totalCount / limit);
  return Array.from({ length: pageCount }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page || "1", 10);
  if (isNaN(pageNumber)) return notFound();

  const { posts, totalCount } = await getBlogPostsByPage(pageNumber,limit);

  if (!posts.length) return <div className={"text-center text-lg mt-5"}>記事がありません</div>;

  const pageCount = Math.ceil(totalCount / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Blog（ページ {pageNumber}）</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {posts.map((post:Post) => (
          <Card key={post.id} className="overflow-hidden pt-0">
              <div className="relative h-54 w-full">
                <Image
                  src={post.eyecatch?.url??'/images/sample1.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            <CardContent className="p-4 space-y-2">
              <div className="text-xs text-gray-500">{dayjs(post.publishedAt).format("YYYY-MM-DD")}</div>
              <Link href={`/blog/${post.id}`} className="text-lg font-semibold hover:underline line-clamp-2">
                {post.title}
              </Link>
              <div className="flex flex-wrap gap-1 text-xs mt-2">
              {post.category &&
                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                  #{post.category.name}
                </span>
              }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ページネーション */}
      <Pagination current={pageNumber} total={Math.ceil(totalCount / limit)} limit={limit} />
    </div>
  );
}
