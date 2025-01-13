"use client"

import { useTransaction } from "@/hooks/use-transaction"
import { CategoryIcon } from "../category/catetory-icon"
import { Separator } from "../ui/separator"
import { format } from "date-fns"

export const TransactionPanel = () => {
  const currentTransaction = useTransaction(s => s.currentTransaction)

  if (!currentTransaction) return null

  return (
    <div className="flex flex-col gap-4 p-4">
      <h6 className="text-lg font-medium">{currentTransaction?.name}</h6>
      <span className="text-sm text-muted-foreground">{format(currentTransaction?.date, 'yyyy-MM-dd')}</span>
      <div className="flex items-center gap-2">

        {/* <p className="text-xl font-bold text-muted-foreground" style={{ color: currentTransaction?.type === 'income' ? 'green' : 'red' }}>¥{currentTransaction?.amount}</p> */}
        <CategoryIcon category={currentTransaction?.categoryId || null} />
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
