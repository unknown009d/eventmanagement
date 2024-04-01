"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { events1, khudkaevents, nearby, upcomming } from "@/lib/events"
import { useState } from "react"
import Link from "next/link"

const allEvents = [...events1, ...upcomming, ...nearby];

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const SearchBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {


    const handleClick = (title: string) => {
      router.push(`/events/${title.split(" ").map(e => e.toLowerCase()).join("-")}`)
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }

    // Filter events based on search term
    const filteredEvents = allEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="group">
        <div className={cn("group flex justify-start items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}>
          <Search size={16} className="pointer-events-none select-none -translate-y-[1px] opacity-50 group-hover:opacity-100" />
          <input
            type={type}
            className="w-full focus:outline-none"
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </div>
        <div className="hidden group-focus-within:flex flex-col gap-2 shadow p-4 rounded-xl">
          {/* Display the filtered events */}
          {filteredEvents.map((event, cnt) => (
            <Link href={`/events/${event.title.split(" ").map(e => e.toLowerCase()).join("-")}`} key={event.title} className={cn("bg-white z-10 border-gray-200 py-2 text-sm", {
              "border-b": (cnt + 1) < filteredEvents.length
            })}>
              <h2>{event.title}</h2>
              <div className="flex justify-between">
                <p>{event.location}</p>
                <p>{event.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
)
SearchBox.displayName = "SearchBox"

export { SearchBox }
