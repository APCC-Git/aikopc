import { LoginForm } from '@/components/visitor/LoginForm';

export default async function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-10 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
