'use client'
import { DateUtils, cn } from "@/lib/utils";
import { CalendarClock, CalendarDays, ChevronLeft, Clock, MapPin, MapPinned, MoveRight, TriangleAlert } from "lucide-react";
import BackButton from "@/components/EventPage/BackButton";
import BookTicket from "@/components/EventPage/BookTicket";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ErrorText from "@/components/posts/ErrorText";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Page({ params }: { params: { slug: string } }) {
  const { isLoaded, user } = useUser();
  let [loading, setLoading] = useState(true)
  const [pageEvent, setPageEvent] = useState<any | null>(null);
  const title = params.slug.split('-').join(' ');
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/post?title=${title}`)
      .then(response => response.json())
      .then(data => {
        setPageEvent(data.message[0])
        setLoading(false)
      })
      .catch(error => console.error(error));
  }, [title]);

  if (loading) {
    return <>
      <p>Loading...</p>
    </>
  }
  if (pageEvent) {
    let lon = pageEvent.loc.coordinates[0]
    let lat = pageEvent.loc.coordinates[1]

    let datetime = DateUtils.formatEventDate(pageEvent.date, "T" + pageEvent.time);

    const badge = pageEvent.badge ? pageEvent.badge[0] ?? null : null;
    const badgeType = pageEvent.badge ? pageEvent.badge[1] ?? null : null;


    return (
      <main className="px-6 mb-14">
        <BackButton />
        <img src={`${pageEvent.img}`} alt={pageEvent.title} className="w-full object-cover rounded-xl" />
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col justify-start items-start">
            <p className="text-xs opacity-50 hidden">Hosted by vbunitynet@gmail.com</p>
            <h2 className="font-bold text-2xl">{pageEvent.title}</h2>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex gap-2 items-center">
              <MapPin size={16} />
              <p>{pageEvent.location}</p>
            </div>
            <div className="flex gap-2 items-center">
              <CalendarDays size={16} />
              <p>{datetime}</p>
            </div>
          </div>
          <p className="opacity-80 text-left mt-2">{pageEvent.details}</p>
        </div>
        {badgeType == 'destructive' ?
          <ErrorText>This event is now {badge}</ErrorText> :
          !isLoaded ? <></> :
            user
              ?
              <div className="flex flex-row gap-2 mt-14">
                <Button onClick={e => { router.push(`https://www.google.com/maps/dir/?api=1&destination=${lon},${lat}`) }} variant={"secondary"} className="flex flex-row gap-2">
                  <MapPinned size={20} />
                  Get Directions
                </Button>
                <BookTicket />
              </div>
              :
              <ErrorText>
                Please <Link href="/settings" className="underline">login</Link> to book tickets
              </ErrorText>

        }
      </main>
    )
  }

  return <p className="text-lg opacity-60 flex gap-2">
    <TriangleAlert />
    Event not found
  </p>
}
