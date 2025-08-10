import { Card, CardContent } from '@/components/common/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { FC } from 'react';
import { PostType } from '@/types/PostType';
//props
type Props = {
  post: PostType;
};

export const PostTile: FC<Props> = ({ post }) => {
  return (
    <Card key={post.id} className="flex h-full flex-col overflow-hidden pt-0">
      <div className="relative h-54 w-full">
        <Image
          src={post.eyecatch?.url ?? '/images/sample1.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col space-y-2 p-4">
        <div className="text-xs text-gray-500">{dayjs(post.publishedAt).format('YYYY-MM-DD')}</div>
        <Link
          href={`/blog/${post.id}`}
          className="line-clamp-2 text-lg font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div className="mt-auto flex flex-wrap gap-1 text-xs">
          {post.category && (
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-gray-600">
              #{post.category.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
