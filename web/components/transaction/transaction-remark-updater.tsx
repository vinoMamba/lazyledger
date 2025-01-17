"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { updateTransactionRemarkAction } from "@/actions/update-transaction-remark"

type TransactionRemarkUpdaterProps = {
  id: string
  value: string
}

export const TransactionRemarkUpdater = ({ id, value }: TransactionRemarkUpdaterProps) => {
  const [remark, setRemark] = useState(value)

  useEffect(() => {
    setRemark(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemark(e.target.value)
  }

  const handleBlur = async () => {
    if (remark === value) return
    if (remark.length === 0) return
    await updateTransactionRemarkAction({ id, remark })
  }

  return (
    <div>
      <Textarea
        value={remark}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={value}
        className=""
      />
    </div>
  )
}
