import { events1, khudkaevents, nearby, upcomming } from "@/lib/events";
import Image from "next/image"
import { cn } from "@/lib/utils";

const allEvents = [...events1, ...upcomming, ...nearby];

export default function Page({ params }: { params: { slug: string } }) {

  const pageEvent = allEvents.find(event => event.title.toLowerCase() == params.slug.split('-').join(' '));

  if (pageEvent) {
    return (
      <div>
        <Image src={`/EventImages/${pageEvent.img}`} alt={pageEvent.title} width={800} height={600} className="w-full object-cover" />
        <div className="mt-4 flex flex-col gap-2 px-6">
          <h2 className="font-bold text-2xl">{pageEvent.title}</h2>
          <div className="flex justify-between">
            <p>{pageEvent.location}</p>
            <p>{pageEvent.date}</p>
          </div>
          <p className="opacity-80 text-left mt-2">{pageEvent.details}</p>
        </div>
      </div>
    )
  }

  return <p className="text-lg opacity-60">Event not found</p>
}
