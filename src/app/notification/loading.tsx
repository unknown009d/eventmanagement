import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
    return (
        <div className="px-6 mt-2 w-full">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="flex items-center space-x-4 w-full px-2">
                <Skeleton className="h-12 w-14 rounded-full" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="flex items-center space-x-4 w-full px-2 mt-6">
                <Skeleton className="h-12 w-14 rounded-full" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="flex items-center space-x-4 w-full px-2 mt-6">
                <Skeleton className="h-12 w-14 rounded-full" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    )
}
