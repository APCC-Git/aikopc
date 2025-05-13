import { Header } from '@/components/ui/header';
import { getUser } from '@/lib/auth';


export default async function VisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <div>
      <Header user={user} />
      <div>{children}</div>
    </div>
  );
}
