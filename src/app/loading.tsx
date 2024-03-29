import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col justify-start items-start w-full gap-4 mt-1">
            <div className="flex justify-between items-center gap-4 w-full px-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
                <Skeleton className="h-[32px] w-[32px] rounded-full" />
            </div>
            <div className="px-6 w-full">
                <Skeleton className="w-full h-10 my-3 mb-2.5" />
            </div>
            <div className="px-6 w-full">
                <Skeleton className="h-4 w-[80px]" />
                <div className="w-10/12 mt-4">
                    <figure>
                        <div>
                            <Skeleton className="h-40 w-full" />
                            <figcaption className="flex flex-col gap-2 mt-4">
                                <div className="flex justify-between gap-4">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-full" />
                            </figcaption>
                        </div>
                    </figure>
                </div>
            </div>
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
    )
}