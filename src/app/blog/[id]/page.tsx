import { client } from '@/lib/microcms';
import { Card, CardContent } from "@/components/ui/card"
import dayjs from 'dayjs';
import { Metadata } from "next"
import { notFound } from 'next/navigation'
import { PostTile } from "@/components/ui/postTile"

// ブログ記事の型定義
// type Props = {
//   id: string;
//   title: string;
//   content: string;
//   publishedAt: string;
//   category: { 
//     id: string
//     name: string 
//   };
// };
type Props = {
  id: string;
  title: string;
  content?: string;
  publishedAt: string;
  eyecatch?: {
    url: string
    height: number
    width: number
  };
  category?: {
    id: string
    name: string
  };
}

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({ endpoint: "blogs", contentId: id });
  return data;
}

async function getSimilarPost(categoryId: string): Promise<Props[]> {
  if (!categoryId) return [];

  const data = await client.get<{ contents: Props[] }>({ 
    endpoint: "blogs", 
    queries: {
      filters: `category[equals]${categoryId}`,
      limit: 3,
    }
  });

  return data.contents;
}

//metadata用の型定義
type metadataProps = {
  params: Promise<{ id: string }>
}

// metadata を動的に生成
export async function generateMetadata({ params }: metadataProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getBlogPost(id);
  if(!data)  notFound();

  return {
    metadataBase: new URL('http://aikopc.net'),
    title: `${data.title} | Aikopc.net`,
    description: "愛光学園パソコン部 ブログ記事ページ",
    openGraph: {
      title: `${data.title} | Aikopc.net`,
      images: [
        {
          url: data.eyecatch?.url || "/images/sample1.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  if(!post)notFound();
  const similar = await getSimilarPost(post.category?.id??"チュートリアル");
  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YY-MM-DD');

  return (
    <main className={"w-full p-4 md:p-10 block lg:flex"}>
      <Card className={"w-full lg:w-2/3 rounded-lg p-4"}>
        <div>
          <h1 className={"text-2xl font-bold mr-5"}>{post.title}</h1>
          <div className={"text-gray-600 mt-2"}>{formattedDate}</div>
          <div className="flex flex-wrap gap-1 text-xs mt-2">
          {post.category &&
            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
              #{post.category.name}
            </span>
          }
          </div>
        </div>
        <hr />
        <article className="prose" dangerouslySetInnerHTML={{ __html: `${post.content}`,}}/>
      </Card>
      <div className={"hidden lg:block w-1/3 p-4 pt-0"}>
        関連記事
        {similar.map((post)=>{
          return(
          <div key={post.id} className={"mt-4"}>
            <PostTile  post={post} />
          </div>
          )
        })}
      </div>
    </main>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blogs' });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}