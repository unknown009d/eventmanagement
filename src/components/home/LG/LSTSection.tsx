"use client";
import EventCard from "@/components/home/Events/EventCard"
import { DateUtils } from "@/lib/utils";

export default function LSTSections({ title, events, reverseList, unOptimizedImg }: {
    title: string
    events: any[]
    reverseList?: boolean
    unOptimizedImg?: boolean
}) {
    return (
        events.length > 0 ?
            <div className="flex flex-col w-full gap-4">
                {title != undefined ?
                    <h4 className="text-sm opacity-50 px-6 line-clamp-1">{title}</h4>
                    :
                    <></>
                }
                <div className={`flex flex-col justify-start items-start gap-4 px-6 pb-2 ${reverseList && 'flex-col-reverse'}`}>
                    {events.map((d, cnt) => {
                        const badgeTitle = d.badge ? d.badge[0] ?? undefined : undefined;
                        const badgeVariant = d.badge ? d.badge[1] ?? undefined : undefined;
                        return <EventCard unOptimizedImg={unOptimizedImg} key={cnt} alt={cnt} title={d.title} details={d.details} img={d.img} date={DateUtils.formatEventDate(d.date, "T" + d.time)} location={d.location} badge={badgeTitle} badgeVariant={badgeVariant} listitem={true} />
                    })}
                </div>
            </div>
            :
            <h4 className="text-sm opacity-60 px-6">No {title} found</h4>
    );
}
