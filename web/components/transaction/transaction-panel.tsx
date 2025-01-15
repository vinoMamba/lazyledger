"use client"

import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { CategoryCell } from "../category/category-cell"
import { TransactionNameUpdater } from "./transaction-name-updater"
import { TransactionAmountUpdater } from "./transaction-amount-updater"
import { TransactionDateUpdater } from "./transaction-date-updater"
import { z } from "zod"
import { TransactionSchema } from "@/schemas/transaction"

type TransactionPanelProps = {
  transaction: z.infer<typeof TransactionSchema>
}

export const TransactionPanel = ({ transaction }: TransactionPanelProps) => {

  return (
    <div className="flex flex-col gap-4 p-4 cursor-default">
      <TransactionNameUpdater id={transaction.id} value={transaction.name} />
      <div className="flex items-start justify-between pr-4">
        <TransactionAmountUpdater className={cn(transaction.type === 1 && " text-green-700", "text-2xl font-semibold")} value={transaction.amount} id={transaction.id} />
        <TransactionDateUpdater id={transaction.id} value={transaction.date} />
      </div>
      <CategoryCell id={transaction.id} value={transaction.categoryId} />
      <Separator />
      <div className="flex items-center gap-2">
        <div>相似交易</div>
      </div>
    </div>
  )
}
