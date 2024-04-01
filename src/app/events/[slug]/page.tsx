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
        <h2>{pageEvent.title}</h2>
        <p>{pageEvent.details}</p>
        <p>{pageEvent.location}</p>
        <p>{pageEvent.date}</p>
      </div>
    )
  }

  return <p className="text-lg opacity-80">Event not found</p>
}
