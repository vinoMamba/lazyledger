import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ArrowDownWideNarrow, Filter, Search, Plus } from "lucide-react"


export const AppTopNav = () => {
  return (
    <header className={cn(
      "w-full bg-sidebar flex justify-between items-center h-14 border-b",
    )}>
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
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          去问 AI 助手
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </nav>
    </header>
  )
}
