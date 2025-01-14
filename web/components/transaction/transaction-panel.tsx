"use client"

import { useTransaction } from "@/hooks/use-transaction"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { CategoryCell } from "../category/category-cell"
import { TransactionNameUpdater } from "./transaction-name-updater"

export const TransactionPanel = () => {
  const currentTransaction = useTransaction(s => s.currentTransaction)

  if (!currentTransaction) return null

  return (
    <div className="flex flex-col gap-4 p-4 cursor-default">
      <TransactionNameUpdater id={currentTransaction.id} value={currentTransaction.name} />
      <div className="flex items-start justify-between pr-4">
        <span className={cn(currentTransaction.type === 1 && " text-green-700", "text-2xl font-semibold")}>{currentTransaction.amount}</span>
        <span className="text-sm text-muted-foreground">{currentTransaction.date}</span>
      </div>
      <CategoryCell value={currentTransaction.categoryId} />
      <Separator />
      <div className="flex items-center gap-2">
        <div>相似交易</div>
      </div>
    </div>
  )
}
