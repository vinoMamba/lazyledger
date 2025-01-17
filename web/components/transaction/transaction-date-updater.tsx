"use client"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { updateTransactionDateAction } from "@/actions/update-transaction-date"

const DATE_FORMAT = 'yyyy-MM-dd'


type TransactionDateUpdaterProps = {
  id: string
  value: string
}

export const TransactionDateUpdater = ({ id, value }: TransactionDateUpdaterProps) => {
  const [date, setDate] = useState(value)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setDate(value)
  }, [value])

  const handleChange = (date: Date | undefined) => {
    if (date) {
      setDate(format(date, DATE_FORMAT))
      updateTransactionDateAction({ id, date: format(date, DATE_FORMAT) })
      setOpen(false)
    }
  }

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <span
            className="border-none p-0 flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            {date ? format(new Date(date), DATE_FORMAT) : <span>选择日期</span>}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(date)}
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
