import Link from 'next/link';
import { getPaginationRange } from '@/lib/pagination';

type Props = {
  current: number;
  total: number;
  limit: number;
};

export function Pagination({ current, total, limit }: Props) {
  const range = getPaginationRange(current, total);

  return (
    <div className="flex space-x-2 mt-6 justify-center">
      {range.map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <Link
            key={`Pagination${page}`}
            href={`/blog/page/${page}`}
            className={`px-3 py-1 border rounded ${
              page === current ? 'bg-primary text-white dark:text-black' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        )
      )}
    </div>
  );
}
