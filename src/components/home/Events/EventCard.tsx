import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface LocationBoxProps {
    className?: string;
    title?: string;
    details?: string;
    img?: string | String | ArrayBuffer;
    date?: string;
    location?: string;
    alt?: number;
    badge?: string;
    listitem?: boolean;
    unOptimizedImg?: boolean;
    eventslug?: string;
}

export default function EventCard({ className, alt = 1, title = "Event title",
    details = "Event Description Lorem ipsum dolor sit amet consectetur adipisicing elit",
    img = "ImagePlaceholder.webp", date = Date().slice(0, 15), location = "Agartala", badge = undefined,
    listitem = false, unOptimizedImg = false, eventslug = "" }: LocationBoxProps) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/events/${title.split(" ").map(e => e.toLowerCase()).join("-")}`)
    }

    return (
        <>
            <figure onClick={handleClick} className={cn("relative border border-gray-200 rounded-lg cursor-pointer", className, {
                'flex w-full': listitem,
                'grid w-[300px] h-[280px] overflow-hidden': !listitem
            })}>
                {badge != undefined ?
                    <Badge variant={"secondary"} className={cn("absolute bg-emerald-400 m-2 top-0 z-10 right-0", {
                        "-translate-y-2 translate-x-2 m-0": listitem
                    })}>{badge}</Badge>
                    :
                    <></>}
                <div className={cn("overflow-hidden", {
                    "rounded-md m-1": listitem
                })}>
                    {unOptimizedImg
                        ? <>
                            <img src={img.toString()} alt={img.toString() + alt.toString()}
                                className={cn("w-full object-cover",
                                    {
                                        'aspect-square w-[140px] h-full': listitem,
                                        'aspect-video': !listitem
                                    })} />
                        </>
                        :
                        <Image src={`${img}`} alt={title.split(" ").map(w => w[0]).join("") + alt} width={200} height={200} className={cn("w-full object-cover",
                            {
                                'aspect-square w-[140px] h-full': listitem,
                                'aspect-video': !listitem
                            })} />}
                </div>
                <figcaption className={cn("p-4 px-5 h-full w-full", {
                    "px-3": listitem
                })}>
                    <div className={cn("flex flex-row justify-between items-center mb-1.5 text-xs opacity-50")}>
                        <p className="flex flex-row items-center justify-center gap-2">
                            <MapPin size={12} />
                            {location.slice(0, 12)}
                        </p>
                        <p className="">{date}</p>
                    </div>
                    <h4 className={cn("font-bold text-lg w-full leading-5 my-1", {
                        "line-clamp-1": listitem,
                        "line-clamp-2": !listitem,
                    })}>
                        {title}
                    </h4>
                    <p className="text-sm opacity-80 line-clamp-2 w-full">
                        {details}
                    </p>
                </figcaption>
            </figure></>
    )
}
