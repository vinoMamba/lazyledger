"use client"
import { Button } from "@/components/ui/button"
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
          <Button
            variant={"outline"}
            className="border-none"
          >
            <CalendarIcon />
            {date ? format(new Date(date), DATE_FORMAT) : <span>选择日期</span>}
          </Button>
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
