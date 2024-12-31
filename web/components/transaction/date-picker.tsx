"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { addDays, addMonths, format, startOfWeek, subDays, subMonths } from "date-fns"
import * as chrono from 'chrono-node'

type DateOption = {
  label: string
  value: string
  date: Date
}

const initOptions: DateOption[] = [
  { label: 'Today', value: 'today', date: addDays(new Date(), 0) },
  { label: 'Yesterday', value: 'yesterday', date: subDays(new Date(), 1) },
  { label: 'Tomorrow', value: 'tomorrow', date: addDays(new Date(), 1) },
  { label: 'Last week', value: 'last week', date: subDays(new Date(), 7) },
  { label: 'Next week', value: 'next week', date: addDays(new Date(), 7) },
  { label: 'Last month', value: 'last month', date: subMonths(new Date(), 1) },
  { label: 'Next month', value: 'next month', date: addMonths(new Date(), 1) },
  { label: 'Monday', value: 'monday', date: startOfWeek(new Date(), { weekStartsOn: 1 }) },
  { label: 'Tuesday', value: 'tuesday', date: startOfWeek(new Date(), { weekStartsOn: 2 }) },
  { label: 'Wednesday', value: 'wednesday', date: startOfWeek(new Date(), { weekStartsOn: 3 }) },
  { label: 'Thursday', value: 'thursday', date: startOfWeek(new Date(), { weekStartsOn: 4 }) },
  { label: 'Friday', value: 'friday', date: startOfWeek(new Date(), { weekStartsOn: 5 }) },
  { label: 'Saturday', value: 'saturday', date: startOfWeek(new Date(), { weekStartsOn: 6 }) },
  { label: 'Sunday', value: 'sunday', date: startOfWeek(new Date(), { weekStartsOn: 0 }) },
]



export const DatePicker = ({ value, onChange }: { value: string, onChange: (date: string) => void }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<DateOption[]>([])

  useEffect(() => {
    if (open) {
      setOptions(initOptions.slice(0, 5))
    }
  }, [open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase().trim()
    const newOptions = initOptions.filter(option => option.label.toLowerCase().includes(input))
    if (newOptions.length === 0) {
      const parsed = chrono.parse(input, new Date(), { forwardDate: true })
      if (parsed.length > 0) {
        const item = parsed[0]
        const date = item.start.date()
        const label = item.text
        newOptions.push({ label, value: label, date })
      }
    }

    setOptions(newOptions)
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar">
          <CalendarIcon className="h-4 w-4" />
          {value ? format(new Date(value), 'PPPP') : <span className="text-muted-foreground">日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[29rem]">
        <Command >
          <CommandInput placeholder="Search date..." onChangeCapture={handleInputChange} />
          <CommandList className="max-h-[170px] ">
            <CommandEmpty>No date found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                  onSelect={() => {
                    setOpen(false)
                    onChange(option.date.toISOString())
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <span>{option.label}</span>
                      <span className="text-muted-foreground italic">{format(option.date, 'PPP')}</span>
                    </div>
                    <span className="text-muted-foreground italic">{format(option.date, 'PPPP').split(' ')[0]}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
