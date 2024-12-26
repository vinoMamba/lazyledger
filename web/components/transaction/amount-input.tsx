"use client"
import * as React from "react"
import { MoveDownRight, MoveUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AmountInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { value: number, onChange: (value: number) => void }>(
  ({ type, value, onChange, ...props }, ref) => {
    return (
      <div className={cn(
        buttonVariants({ variant: "outline" }),
        "w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar",
      )}
      >
        {
          value >= 0 ? <MoveUpRight className="w-4 h-4 text-green-500" /> : <MoveDownRight className="w-4 h-4 text-red-500" />
        }
        <input
          type={type}
          className={cn(
            "w-full bg-transparent outline-none border-none",
            value >= 0 ? "text-green-500" : "text-red-500"
          )}
          ref={ref}
          onChange={e => onChange(Number(e.target.value))}
          {...props}
        />
      </div>
    )
  }
)
AmountInput.displayName = "AmountInput"

export { AmountInput }
