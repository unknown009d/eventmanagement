import { events1, khudkaevents, nearby, upcomming } from "@/lib/events";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { CalendarClock, CalendarDays, ChevronLeft, Clock, MapPin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import BackButton from "@/components/EventPage/BackButton";
import BookTicket from "@/components/EventPage/BookTicket";
import Link from "next/link";

const allEvents = [...events1, ...upcomming, ...nearby];

export default async function Page({ params }: { params: { slug: string } }) {

  const user = await currentUser();

  const pageEvent = allEvents.find(event => event.title.toLowerCase() == params.slug.split('-').join(' '));

  if (pageEvent) {

    return (
      <main className="px-6">
        <BackButton />
        <Image src={`/EventImages/${pageEvent.img}`} alt={pageEvent.title} width={800} height={600} className="w-full object-cover rounded-xl" />
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{pageEvent.title}</h2>
          <div className="flex justify-between text-sm">
            <div className="flex gap-2 items-center">
              <MapPin size={16} />
              <p>{pageEvent.location}</p>
            </div>
            <div className="flex gap-2 items-center">
              <CalendarDays size={16} />
              <p>{pageEvent.date}</p>
            </div>
          </div>
          <p className="opacity-80 text-left mt-2">{pageEvent.details}</p>
        </div>
        {user
          ?
          <BookTicket />
          :
          <p className="w-full text-center opacity-50 mt-5 text-sm flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="flex-shrink mx-2">
              Please <Link href="/settings" className="underline">login</Link> to book tickets
            </div>
            <div className="flex-grow border-t border-gray-400"></div>
          </p>
        }
      </main>
    )
  }

  return <p className="text-lg opacity-60">Event not found</p>
}
