"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type TypeSelectProps = {
  value: number
  onChange: (value: number) => void
}

export const TypeSelect = ({ value, onChange }: TypeSelectProps) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSelect = (selectValue: string) => {
    onChange(Number(selectValue))
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar focus-within:ring-1 focus-within:ring-ring">
          {value === 1 ? <ArrowUpRight color="#0685f2" /> : <ArrowDownRight color="#ff5d04" />}
          <span>{value === 1 ? "收入" : "支出"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full" align="start">
        <Command>
          <CommandInput
            placeholder="选择类型..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[170px] ">
            <CommandEmpty>没有找到类型。</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="0"
                onSelect={handleSelect}
              >
                <div className="flex items-center gap-2">
                  <ArrowDownRight color="#ff5d04" />
                  <span>支出</span>
                </div>
              </CommandItem>
              <CommandItem
                value="1"
                onSelect={handleSelect}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpRight color="#0685f2" />
                  <span>收入</span>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
