"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { NumberPad } from "./number-pad"
type TransactionAmountInputProps = {
  value: number
  onChange: (amount: number) => void
}

export const TransactionAmountInput = ({ value, onChange }: TransactionAmountInputProps) => {
  const [amount, setAmount] = useState(value.toString())

  const handleChange = (value: string) => {
    setAmount(value)
    onChange(Number(value))
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full items-center justify-start">{amount.toString()}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <NumberPad value={amount.toString()} onChange={handleChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
