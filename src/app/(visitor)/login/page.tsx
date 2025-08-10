import { LoginForm } from '@/components/common/ui/loginForm';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect('/dashboard');
  }
  return (
    <div className="flex w-full items-center justify-center p-10 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
