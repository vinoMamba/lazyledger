"use client"

import { Textarea } from "../ui/textarea"

type TransactionRemarkInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TransactionRemarkInput = ({ value, onChange }: TransactionRemarkInputProps) => {
  return <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="添加备注" />
}
