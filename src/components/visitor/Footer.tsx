import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('mt-10 w-full bg-transparent py-6', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Aiko PC Club. All rights reserved.
            </p>
          </div>

          <div>Build with ❤️ and Next.js by APCC members</div>
        </div>
      </div>
    </footer>
  );
}
