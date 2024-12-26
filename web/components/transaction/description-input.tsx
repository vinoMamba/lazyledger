"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Banknote } from "lucide-react"

const DescriptionInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {
    return (
      <div className={cn(
        buttonVariants({ variant: "outline" }),
        "w-full justify-start text-left font-normal bg-sidebar hover:bg-sidebar",
      )}
      >
        <Banknote className="w-4 h-4" />
        <input
          type={type}
          className={cn(
            "w-full bg-transparent outline-none border-none",
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

DescriptionInput.displayName = "DescriptionInput"

export { DescriptionInput }
