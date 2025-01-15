import { HomeLoginButton } from "@/components/auth/home-login-button";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import { RainbowButton } from "@/components/ui/rainbow-button";
import SparklesText from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Lazy Ledger | Home",
  description: "Lazy Ledger",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className=" border-b">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2">
            <HomeLoginButton />
            <ModeToggle />
          </div>
        </div>
      </header>
      <section className="max-w-screen-lg mx-auto pt-16 px-4 relative h-full">
        <div className="flex flex-col items-center md:items-start w-full">
          <SparklesText text="Lazy Ledger" className="opacity-80 hover:opacity-100 transition-opacity" />
          <p className="text-xl mt-4 text-center md:text-left px-4 md:px-0 italic opacity-50 hover:opacity-100 transition-opacity">
            一个简单的账单分析工具
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Link href="/register">
              <RainbowButton className="px-6 h-9 rounded-md">开始使用</RainbowButton>
            </Link>
            <Link href="" target="_blank">
              <Button variant="secondary">Github</Button>
            </Link>
          </div>
        </div>
        <GridPattern
          width={30}
          height={30}
          x={20}
          y={20}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
            "mt-1 h-[200%] top-10"
          )}
        />
      </section>
    </main>
  );
}
