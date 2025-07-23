import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
});

export async function getBlogPostsByPage(page: number, limit = 10) {
  const offset = (page - 1) * limit;
  const data = await client.get({
    endpoint: 'blogs',
    queries: {
      offset,
      limit,
      fields: 'id,title,eyecatch,publishedAt,category',
    },
  });

  return {
    posts: data.contents,
    totalCount: data.totalCount, // 全件数
  };
}
