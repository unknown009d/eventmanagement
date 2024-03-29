"use client"
import { cn } from "@/lib/utils"
import { Bell, CalendarPlus, Home, Ticket, UserRound } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Nav({ className }: {
    className?: string
}) {
    const pathname = usePathname()

    let menu = 0

    switch (pathname) {
        case '/':
            menu = 1
            break
        case '/tickets':
            menu = 2
            break
        case '/post':
            menu = 3
            break
        case '/notification':
            menu = 4
            break
        case '/settings':
            menu = 5
            break
        default:
            menu = 0
            break
    }

    return (
        <div className={cn("fixed bottom-0 left-0 right-0 w-full p-2 px-4 bg-white flex flex-row items-center justify-around navShadow text-gray-900", className)}>
            <Link href="/" className={cn("transition-all p-4 opacity-50 flex flex-col gap-2 items-center justify-center", {
                "activeitems": menu == 1
            })}>
                <Home size={20} />
                <span className={`transition-all text-xs font-semibold absolute -bottom-4 ${menu == 1 ? '' : 'hidden'} `}>Home</span>
            </Link>
            <Link href="/tickets" className={cn("transition-all p-4 opacity-30 flex flex-col gap-2 items-center justify-center", {
                "activeitems": menu == 2
            })}>
                <Ticket size={20} />
                <span className={`transition-all text-xs font-semibold absolute -bottom-4 ${menu == 2 ? '' : 'hidden'} `}>Tickets</span>
            </Link>
            <Link href="/post" className={cn("transition-all p-4 opacity-30 flex flex-col gap-2 items-center justify-center", {
                "activeitems": menu == 3
            })}>
                <CalendarPlus size={20} />
                <span className={`transition-all text-xs font-semibold absolute -bottom-4 ${menu == 3 ? '' : 'hidden'} `}>Post</span>
            </Link>
            <Link href="/notification" className={cn("transition-all p-4 opacity-30 flex flex-col gap-2 items-center justify-center", {
                "activeitems": menu == 4
            })}>
                <Bell size={20} />
                <span className={`transition-all text-xs font-semibold absolute -bottom-4 ${menu == 4 ? '' : 'hidden'} `}>Updates</span>
            </Link>
            <Link href="/settings" className={cn("transition-all p-4 opacity-30 flex flex-col gap-2 items-center justify-center", {
                "activeitems": menu == 5
            })}>
                <UserRound size={20} />
                <span className={`transition-all text-xs font-semibold absolute -bottom-4 ${menu == 5 ? '' : 'hidden'} `}>Profile</span>
            </Link>
        </div>
    )
}
