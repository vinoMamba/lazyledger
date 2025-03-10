import { ArrowDownWideNarrow, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { AddTransaction } from "@/components/transaction/add-transaction";
import { TransactionUpload } from "@/components/transaction/transaction-upload";

export default function WorkbenchLayout({ left, right }: { left: React.ReactNode, right: React.ReactNode }) {
  return (<main className="h-screen flex flex-col">
    <header className={cn("w-full bg-sidebar flex justify-between items-center h-14 border-b p-2")}>
      <nav className="px-8 flex items-center gap-4 justify-between w-full">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <Filter />
          </Button>
          <Button size="icon" variant="outline">
            <ArrowDownWideNarrow />
          </Button>
          <Button size="icon" variant="outline">
            <Search />
          </Button>
          <AddTransaction />
          <TransactionUpload />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          去问 AI 助手
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </nav>
    </header>
    <div className="flex-1">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full"
      >
        <ResizablePanel defaultSize={70} minSize={50}>
          {left}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          {right}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </main>)
}
