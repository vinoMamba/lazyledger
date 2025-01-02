import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center relative">
      <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), "flex items-center gap-2 absolute top-10 left-10")}>
        <MoveLeft />
        返回首页
      </Link>
      {children}
    </main >
  )
}
