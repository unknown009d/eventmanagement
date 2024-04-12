"use client";
import { Artwork } from "@/components/Interfaces";
import EventCard from "@/components/home/Events/EventCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DateUtils } from "@/lib/utils";


export default function Recents({ title, events }: {
  title: string
  events: any
}) {
  return (
    events.length > 0 ?
      <div className="flex flex-col w-full gap-4">
        {title != undefined ?
          <h4 className="text-sm opacity-50 px-6 line-clamp-1">{title}</h4>
          :
          <></>
        }
        <ScrollArea className="w-full">
          <div className="flex flex-nowrap gap-4 px-6 pb-5">
            {events.map((d: any, cnt: any) => (
              <EventCard key={cnt} alt={cnt} title={d.title} details={d.details} img={d.img} date={DateUtils.formatEventDate(d.date, "T" + d.time)} location={d.location} badge={d.badge && d.badge.length > 0 ? d.badge : undefined} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      :
      <h4 className="text-sm opacity-60 px-6">No {title} found</h4>
  );
}
