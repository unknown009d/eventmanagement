"use client"
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function BookTicket() {
    const handleClick = () => {
        toast.warning("This feature isn't available right now...")
    }

    return (
        <Button onClick={handleClick} className="mt-8 w-full flex justify-between items-center">
            Book tickets
            <MoveRight />
        </Button>
    )
}
