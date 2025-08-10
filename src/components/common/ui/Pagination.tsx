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
    <div className="mt-6 flex justify-center space-x-2">
      {range.map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <Link
            key={`Pagination${page}`}
            href={`/blog/page/${page}`}
            className={`rounded border px-3 py-1 ${
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
