"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SheetCalendar } from "@/components/ui/calendar-sheet"
import { Input } from "@/components/ui/input"

export const TransactionSheet = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>新的交易</SheetTitle>
          <SheetDescription>
            手动添加交易
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center flex-col gap-2 mt-4">
          <SheetCalendar  
            mode="single"
            selected={date}
            onSelect={setDate}
          />
          <Input placeholder="金额" />
          <Input placeholder="描述" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
