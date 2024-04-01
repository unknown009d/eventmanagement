"use client"
import { events1, khudkaevents, nearby, upcomming } from "@/lib/events";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { ChevronLeft, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const allEvents = [...events1, ...upcomming, ...nearby];

export default function Page({ params }: { params: { slug: string } }) {

  const pageEvent = allEvents.find(event => event.title.toLowerCase() == params.slug.split('-').join(' '));

  const router = useRouter();

  const handleClick = () => {
    toast.warning("This Feature is not available now")
  }

  if (pageEvent) {

    return (
      <div className="px-6">
        <Button onClick={() => {router.back()}} variant={"ghost"} className="h-12 w-12 mb-4 p-2">
          <ChevronLeft />
        </Button>
        <Image src={`/EventImages/${pageEvent.img}`} alt={pageEvent.title} width={800} height={600} className="w-full object-cover rounded-xl" />
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{pageEvent.title}</h2>
          <div className="flex justify-between text-sm">
            <div className="flex gap-2 items-center">
              <MapPin size={16} />
              <p>{pageEvent.location}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Clock size={16} />
              <p>{pageEvent.date}</p>
            </div>
          </div>
          <p className="opacity-80 text-left mt-2">{pageEvent.details}</p>
        </div>
        <Button onClick={handleClick} className="mt-8 w-full">Book tickets</Button>
      </div>
    )
  }

  return <p className="text-lg opacity-60">Event not found</p>
}
