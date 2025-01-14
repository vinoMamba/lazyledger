"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { format, isMatch } from "date-fns"

const DATE_FORMAT = 'yyyy-MM-dd'

const isValidDate = (dateString: string): boolean => {
  return isMatch(dateString, DATE_FORMAT)
}


type TransactionDateInputProps = {
  value: string
  onChange: (date: string) => void
  className?: string
}

export const TransactionDateInput = ({ value, onChange, className }: TransactionDateInputProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isValidDate(value) && value !== format(new Date(value), DATE_FORMAT)) {
      onChange(format(new Date(value), DATE_FORMAT))
    }
  }, [value, onChange])

  const handleChange = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, DATE_FORMAT))
    }
    setOpen(false)
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            className,
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? format(new Date(value), DATE_FORMAT) : <span>选择日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={handleChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
