"use client"

import { useTransaction } from "@/hooks/use-transaction"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { CategoryCell } from "../category/category-cell"

export const TransactionPanel = () => {
  const currentTransaction = useTransaction(s => s.currentTransaction)

  if (!currentTransaction) return null

  return (
    <div className="flex flex-col gap-4 p-4 cursor-default">
      <h6 className="text-2xl font-bold">{currentTransaction.name}</h6>
      <div className="flex items-start justify-between pr-4">
        <span className={cn(currentTransaction.type === 1 && " text-green-700", "text-2xl font-semibold")}>{currentTransaction.amount}</span>
        <span className="text-sm text-muted-foreground">{currentTransaction.date}</span>
      </div>
      <div className="flex items-center gap-2">
        <CategoryCell value={currentTransaction.categoryId} />
        {/* <p className="text-xl font-bold text-muted-foreground" style={{ color: currentTransaction?.type === 'income' ? 'green' : 'red' }}>¥{currentTransaction?.amount}</p> */}
      </div>
      {/* <div className="flex items-center gap-2">
        {currentTransaction?.tags.map(tag => (
          <div key={tag.id} className="flex items-center gap-2">
            <Tag
              className='w-[1rem] h-[1rem]'
              style={{ fill: tag.color, stroke: tag.color }}
            />
            <span>{tag.name}</span>
          </div>
        ))}
      </div> */}
      <Separator />
      <div className="flex items-center gap-2">
        <div>相似交易</div>
      </div>
    </div>
  )
}
