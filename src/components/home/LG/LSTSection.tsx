"use client";
import { Artwork } from "@/components/Interfaces";
import EventCard from "@/components/home/Events/EventCard"

export default function LSTSections({ title, events }: {
    title: string
    events: Artwork[]
}) {
    return (
        events.length > 0 ?
            <div className="flex flex-col w-full gap-4">
                {title != undefined ?
                    <h4 className="text-sm opacity-50 px-6 line-clamp-1">{title}</h4>
                    :
                    <></>
                }
                <div className="flex flex-col justify-start items-start gap-4 px-6 pb-2">
                    {events.map((d, cnt) => (
                        <EventCard key={cnt} alt={cnt} title={d.title} details={d.details} img={d.img} date={d.date} location={d.location} badge={d.badge && d.badge.length > 0 ? d.badge : undefined} listitem={true} />
                    ))}
                </div>
            </div>
            :
            <></>
    );
}
