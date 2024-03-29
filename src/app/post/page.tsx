"use client"

import { Artwork } from "@/components/Interfaces"
import LSTSections from "@/components/home/LG/LSTSection"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export const selfEvents: Artwork[] = [
  {
    title: "7th Film Festival",
    details: "Welcoming all the talented film makers with their films and dreams.Extended deadline: March 5th, 2024 For more: https://jiffindia.org/delhi/",
    img: "Event3.png",
    location: "New Delhi",
    date: "8th April 2024",
  },
  {
    title: "Hanghatik Celebration",
    details: "The celebration ain't gonna be over without y'all. Join us for the 15 Years of Hanghatik Celebration, ALMOST A FESTIVAL (Anniversary Edition)",
    img: "Event4.jpg",
    location: "New Delhi",
    date: "9th April 2024",
  },
]

export default function Page() {
  const [date, setDate] = useState<Date>()

  return (
    <div>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Please note, this action is irreversible. It will permanently post to your account and create an event. If this action violates the terms and conditions, it could have serious consequences for your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <Card className="max-w-[580px] mb-6 md:mb-12 mx-auto">
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Publish your events by creating a post</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your event" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="eg. Faridabad" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea placeholder="Type your message here." id="desc" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div></div>
            <AlertDialogTrigger asChild>
              <Button>Post</Button>
            </AlertDialogTrigger>
          </CardFooter>
        </Card>
      </AlertDialog>
      <LSTSections title="Previous Published Events" events={selfEvents} />
    </div>
  )
}
