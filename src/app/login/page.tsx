import { LoginForm } from "@/components/ui/loginForm"

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-10 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
