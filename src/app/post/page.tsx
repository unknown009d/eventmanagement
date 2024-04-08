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
import { format } from "date-fns"
import { Calendar as CalendarIcon, CloudUpload, FileImage, Plus } from "lucide-react"

import { cn, imagePlaceHolder, MAX_FILE_SIZE, MAX_FILE_SIZE_FULL, ACCEPTED_IMAGE_TYPES, acceptImage } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"

import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TimePickerDemo } from "@/components/ui/time-picker-demo"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().min(5).max(600),
  location: z.string().min(2).max(80),
  date: z.date({
    required_error: "Event date is needed",
  }),
  category: z.string(),
  banner: z.any().optional()
    .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
    .refine(file => file.length == 1 ? file[0]?.size <= MAX_FILE_SIZE_FULL ? true : false : true, `Max file size allowed is ${MAX_FILE_SIZE} MB.`)
})

// import { events1, khudkaevents, nearby, upcomming } from "@/lib/events"

// const allevents = [...khudkaevents, ...events1, ...upcomming, ...nearby]


// async function fetchEvents() {
//   try {
//     const response = await fetch('/api/events'); // replace '/api/events' with your API endpoint
//     const data = await response.json();
//     const khudkaevents = data.data;
//     return khudkaevents;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// fetchEvents().then(khudkaevents => {
//   // You can now use khudkaevents here
//   khudkaevents.forEach((k: any) => {
//     mevents.push(k)
//   })
// });

export default function Page() {
  const [date, setDate] = useState<Date>()
  const [btn, setBtn] = useState(false)

  const [mevents, setMevents] = useState<Artwork[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setMevents(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchEvents();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: undefined,
      category: "",
      banner: undefined
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema)
  })

  const fileRef = form.register("banner");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtn(true)
    try {
      // allevents.forEach(d => {
      //   if (d.title == values.title) throw new Error("Post Title already exists, consider creating a unique post title")
      // })
      const newEvent = {
        title: values.title,
        details: values.description,
        img: !preview ? imagePlaceHolder : preview,
        location: values.location,
        date: values.date.toLocaleString('en-US', {
          timeZone: "Asia/Kolkata",
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
      }
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        mevents.push(newEvent);
        form.reset();
        setPreview(null)
        setBtn(false)
      } else {
        throw new Error(responseData.message || 'Unknown error');
      }
    } catch (error: any) {
      toast.warning(error)
    }
  }

  const [preview, setPreview] = useState<String | ArrayBuffer | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <main className="w-full mb-10">
      <Card className="w-full mb-6 md:mb-12 mx-auto">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Publish your events by creating a post</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Hack the earth 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write some description about the event" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location of the Event</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Faridabad, Delhi, Bangalore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">DateTime</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePickerDemo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner of the Event</FormLabel>
                    <FormControl>
                      <label>
                        <Input type="file" accept={acceptImage} {...fileRef} onChange={handleFileChange} />
                        <div className="mt-2 w-full aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                          {preview == null
                            ? <div className="flex flex-col justify-center items-center gap-2">
                              <CloudUpload size={48} className="opacity-30" />
                              <p className="opacity-50 text-sm">Select to upload image</p>
                            </div>
                            :
                            <img src={preview.toString()} className="w-full object-cover" alt="Image Preview" />
                          }
                        </div>
                      </label>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end items-center mt-6">
                <Button type="submit" className="flex gap-2" disabled={btn}>
                  Post new event
                  <Plus size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <LSTSections title="Previous Published Events" unOptimizedImg={true} events={mevents.reverse()} />
    </main>
  )
}
