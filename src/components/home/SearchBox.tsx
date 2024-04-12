"use client"
import * as React from "react"
import { cn, validateText } from "@/lib/utils"
import { Search } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
const SearchBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const [searchTerm, setSearchTerm] = useState('');
    const events = useRef([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }


    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/post?title=${encodeURIComponent(searchTerm)}&count=5&sort=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        events.current = data.message
      } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
      }
    };

    useEffect(() => {
      fetchEvents()
    }, [searchTerm.length <= 1])

    useEffect(() => {
      fetchEvents()
    }, [])

    useEffect(() => {
      if (searchTerm) {
        fetchEvents();
      }
    }, [searchTerm]);

    return (
      <div className="group">
        <div className={cn("group flex justify-start items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}>
          <Search size={16} className="pointer-events-none select-none -translate-y-[1px] opacity-50 group-hover:opacity-100" />
          <input
            type={type}
            className="w-full focus:outline-none"
            ref={ref}
            onInput={handleChange}
            onChange={validateText}
            {...props}
          />
        </div>
        <div className={"flex-col gap-2 shadow p-4 rounded-xl hidden group-focus:flex group-focus-within:flex"}>
          {
            events.current.length > 0 ?
              events.current.map((event: any, cnt) => (
                <Link href={`/events/${event.title.split(" ").map((e: string) => e.toLowerCase()).join("-")}`} key={event.title} className={cn("bg-white z-10 border-gray-200 py-2 text-sm", {
                  "border-b": (cnt + 1) < events.current.length
                })}>
                  <h2>{event.title}</h2>
                  <div className="flex justify-between">
                    <p>{event.location}</p>
                    <p>{event.date}</p>
                  </div>
                </Link>
              ))
              :
              searchTerm.length <= 1
                ? <p className="text-left opacity-50 text-sm">Type something to search...</p>
                :
                <p className="text-left opacity-50 text-sm">No events found</p>
          }
        </div>
      </div >
    )
  }
)
SearchBox.displayName = "SearchBox"

export { SearchBox }
