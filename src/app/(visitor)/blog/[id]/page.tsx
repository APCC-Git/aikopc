import { client } from '@/lib/microcms';
import { Card } from '@/components/common/ui/card';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostTile } from '@/components/common/ui/postTile';
import { PostType } from '@/types/PostType';
import { TableOfContents } from '@/components/common/TableOfContents';

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<PostType> {
  return await client.get({ endpoint: 'blogs', contentId: id });
}

// 同じカテゴリの記事を取得
async function getSimilarPost(categoryId: string): Promise<PostType[]> {
  if (!categoryId) return [];

  const data = await client.get<{ contents: PostType[] }>({
    endpoint: 'blogs',
    queries: {
      filters: `category[equals]${categoryId}`,
      limit: 3,
    },
  });

  return data.contents;
}

//metadata用の型定義
type metadataProps = {
  params: Promise<{ id: string }>;
};

// metadata を動的に生成
export async function generateMetadata({ params }: metadataProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getBlogPost(id);
  if (!data) notFound();

  return {
    metadataBase: new URL('http://aikopc.net'),
    title: `${data.title} | Aikopc.net`,
    description: '愛光学園パソコン部 ブログ記事ページ',
    openGraph: {
      title: `${data.title} | Aikopc.net`,
      images: [
        {
          url: data.eyecatch?.url || '/images/sample1.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  if (!post) notFound();
  const similar = await getSimilarPost(post.category?.id ?? 'チュートリアル');
  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YY-MM-DD');

  return (
    <main className={'w-full'}>
      <div className={'w-full p-4 pb-0 md:p-10 md:pr-9 md:pb-0'}>
        <div className={'mt-3 mb-6 flex w-full items-center justify-center md:mb-10'}>
          <div className={'max-w-5xl'}>
            <h1 className={'mr-5 text-2xl font-bold md:text-3xl'}>{post.title}</h1>
            <div className={'mt-3 text-center text-lg text-gray-600'}>{formattedDate}</div>
          </div>
        </div>
        <div className={'block w-full lg:flex'}>
          <Card className={'w-full rounded-lg p-4 lg:w-2/3'}>
            <div className="mt-2 flex flex-wrap gap-1 text-xs">
              {post.category && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-gray-600">
                  #{post.category.name}
                </span>
              )}
            </div>
            <hr />
            <article
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: `${post.content}` }}
            />
          </Card>
          <div className={'relative hidden px-4 lg:block lg:w-1/3'}>
            <div className={'sticky top-14'}>
              <Card className={'rounded-lg p-4'}>
                <TableOfContents />
                <div className="toc mb-6">
                  <h2 className="mb-2 text-xl font-bold">目次</h2>
                  <div className="js-toc"></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className={'w-full p-4 md:p-10 md:pr-9'}>
        <h2 className="mb-4 text-2xl font-bold">関連記事</h2>
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((post: PostType) => (
            <div key={post.id}>
              <PostTile post={post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blogs' });

  return contentIds.map(contentId => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
