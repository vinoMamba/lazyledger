"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Palette, Check } from "lucide-react"

type ColorPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const colorOptions = ['#fc6124', '#8a0ff0', '#c3952b', '#ec1bbd', '#561aed', '#beab3c', '#949d2b', '#e21959', '#1b962a', '#ce1d1d', '#20aeab', '#ba6e23', '#1784ec', '#373737']

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false)

  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Palette color={value} size={16} />
    </PopoverTrigger>
    <PopoverContent className="p-1 grid grid-cols-7 gap-1 w-[240px]">
      {colorOptions.map(color => (
        <span key={color} className="w-6 h-6 border rounded-full flex items-center justify-center cursor-pointer" style={{ backgroundColor: color }} onClick={() => onChange(color)} >
          {value === color && <Check className="w-4 h-4 text-white" />}
        </span>
      ))}
    </PopoverContent>
  </Popover>
}
