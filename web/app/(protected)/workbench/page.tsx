import { ArrowDownWideNarrow, Search } from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { TransactionTable } from "@/components/transaction/transaction-table";
import { AddTransaction } from "@/components/transaction/add-transaction";
import { TransactionPanel } from "@/components/transaction/transaction-panel";
import { getTransactionListAction } from "@/actions/get-transaction-list";

export default async function WorkbenchPage() {
  const transactions = await getTransactionListAction()
  return (
    <main className="h-screen flex flex-col">
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
          <ResizablePanel defaultSize={50}>
            <TransactionTable transactions={transactions} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <TransactionPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  )
}
