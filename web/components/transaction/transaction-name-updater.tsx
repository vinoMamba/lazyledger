"use client"

import { updateTransactionNameAction } from "@/actions/update-transaction-name"
import { useEffect, useState } from "react"

type TransactionNameUpdaterProps = {
  id: string
  value: string
}

export const TransactionNameUpdater = ({ id, value }: TransactionNameUpdaterProps) => {
  const [name, setName] = useState(value)

  useEffect(() => {
    setName(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) return
    setName(e.target.value)
  }

  const handleBlur = async () => {
    if (name === value) return
    if (name.length === 0) return
    await updateTransactionNameAction({ id, name })
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={value}
        className="border-none outline-none text-2xl font-semibold"
      />
    </div>
  )
}