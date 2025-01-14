"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { NumberPad } from "./number-pad"
import { cn } from "@/lib/utils"
type TransactionAmountInputProps = {
  value: number
  onChange: (amount: number) => void
  className?: string
}

export const TransactionAmountInput = ({ value, onChange, className }: TransactionAmountInputProps) => {
  const [amount, setAmount] = useState(value.toString())

  useEffect(() => {
    setAmount(value.toString())
  }, [value])

  const handleChange = (value: string) => {
    setAmount(value)
    onChange(Number(value))
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-full items-center justify-start", className)}>{amount.toString()}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <NumberPad value={amount.toString()} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
