// app/blog/page/[page]/page.tsx
import { getBlogPostsByPage } from '@/lib/microcms';
import { Pagination } from '@/components/ui/Pagination';
import { PostTile } from '@/components/ui/postTile';
import { notFound } from 'next/navigation';
import { PostType } from '@/types/PostType';

const limit = 10; //1ページに表示する記事の数

export async function generateStaticParams() {
  const { totalCount } = await getBlogPostsByPage(1, limit);
  const pageCount = Math.ceil(totalCount / limit);
  return Array.from({ length: pageCount }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page || '1', 10);
  if (isNaN(pageNumber)) return notFound();

  const { posts, totalCount } = await getBlogPostsByPage(pageNumber, limit);

  if (!posts.length) return <div className={'text-center text-lg mt-5'}>記事がありません</div>;

  //const pageCount = Math.ceil(totalCount / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Blog ( {pageNumber} )</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {posts.map((post: PostType) => (
          <div key={post.id}>
            <PostTile post={post} />
          </div>
        ))}
      </div>

      {/* ページネーション */}
      <Pagination current={pageNumber} total={Math.ceil(totalCount / limit)} limit={limit} />
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Blog | Aikopc.net' };
