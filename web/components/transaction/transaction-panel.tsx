"use client"

import { useTransaction } from "@/hooks/use-transaction"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { CategoryCell } from "../category/category-cell"
import { TransactionNameUpdater } from "./transaction-name-updater"
import { TransactionAmountUpdater } from "./transaction-amount-updater"
import { TransactionDateUpdater } from "./transaction-date-updater"

export const TransactionPanel = () => {
  const currentTransaction = useTransaction(s => s.currentTransaction)

  if (!currentTransaction) return null

  return (
    <div className="flex flex-col gap-4 p-4 cursor-default">
      <TransactionNameUpdater id={currentTransaction.id} value={currentTransaction.name} />
      <div className="flex items-start justify-between pr-4">
        <TransactionAmountUpdater className={cn(currentTransaction.type === 1 && " text-green-700", "text-2xl font-semibold")} value={currentTransaction.amount} id={currentTransaction.id} />
        <TransactionDateUpdater id={currentTransaction.id} value={currentTransaction.date} />
      </div>
      <CategoryCell id={currentTransaction.id} value={currentTransaction.categoryId} />
      <Separator />
      <div className="flex items-center gap-2">
        <div>相似交易</div>
      </div>
    </div>
  )
}
