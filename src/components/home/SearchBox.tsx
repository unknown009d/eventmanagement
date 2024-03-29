import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const SearchBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn("group flex justify-start items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}>
        <Search size={16} className="pointer-events-none select-none -translate-y-[1px] opacity-50 group-hover:opacity-100" />
        <input
          type={type}
          className="w-full focus:outline-none"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchBox.displayName = "SearchBox"

export { SearchBox }
