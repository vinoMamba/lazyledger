"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NumberPad } from "./number-pad"
import { cn } from "@/lib/utils"
import { updateTransactionAmountAction } from "@/actions/update-transaction-amount"

type TransactionAmountUpdaterProps = {
  value: number
  className?: string
  id: string
}

export const TransactionAmountUpdater = ({ value, className, id }: TransactionAmountUpdaterProps) => {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(value.toString())

  useEffect(() => {
    setAmount(value.toString())
  }, [value])

  const handleChange = async (newValue: string) => {
    if (newValue === amount) {
      setOpen(false)
      return
    }
    setAmount(newValue)
    setOpen(false)
    await updateTransactionAmountAction({ id: id, amount: Number(newValue) })
  }


  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <span
            tabIndex={-1}
            className={cn("border-none outline-none text-2xl font-semibold", className)}
          >
            {amount.toString()}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <NumberPad value={amount.toString()} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
