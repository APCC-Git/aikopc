// app/blog/page/page.tsx
import { redirect } from 'next/navigation';

export default function BlogRedirectPage() {
  redirect('/blog/page/1');
}
