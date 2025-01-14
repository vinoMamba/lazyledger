"use client"

import { CategorySelect } from "../category/category-select"

type TransactionCategoryInputProps = {
  value: string
  onChange: (value: string) => void
}

export const TransactionCategoryInput = ({ value, onChange }: TransactionCategoryInputProps) => {
  return <CategorySelect value={value} onChange={onChange} />
}
