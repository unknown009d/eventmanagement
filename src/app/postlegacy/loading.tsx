import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-4 justify-start items-start w-full">
            <div className="w-full p-4 px-12">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[120px] mt-3" />
                <Skeleton className="h-4 w-[80px] mt-8" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-4 w-[80px] mt-4" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-4 w-[80px] mt-4" />
                <Skeleton className="h-10 w-full mt-2" />
                <Skeleton className="h-4 w-[80px] mt-4" />
                <Skeleton className="h-16 w-full mt-2" />
                <Skeleton className="h-4 w-[80px] mt-4" />
                <Skeleton className="h-10 w-full mt-2" />
                <div className="flex items-end justify-end">
                    <Skeleton className="h-10 w-16 mt-5" />
                </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full gap-4 mt-1">
                <div className="px-6 w-full my-8">
                    <Skeleton className="h-4 w-[80px]" />
                    <figure className="mt-6 flex flex-row justify-stretch gap-4 w-full">
                        <Skeleton className="h-28 w-24" />
                        <figcaption className="flex flex-col justify-start gap-2 w-8/12">
                            <div className="flex justify-between gap-4 mt-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-14" />
                            </div>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}