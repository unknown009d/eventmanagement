"use client"
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function BookTicket({ id, user }: any) {

    // const [isBooked, setIsBooked] = useState(false);

    // console.log(user.emailAddresses[0].emailAddress)

    // useEffect(() => {
    //     const checkBooking = async () => {
    //         const response = await fetch(`/api/bookTicket?username=${user.emailAddress}&eventId=${id}`);
    //         const data = await response.json();

    //         if (data.success) {
    //             setIsBooked(data.data);
    //         } else {
    //             toast.error('An error occurred while checking the booking status.');
    //         }
    //     };

    //     checkBooking();
    // }, []);

    const handleClick = async () => {
        try {
            const response = await fetch('/api/bookTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.username, eventId: id }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Ticket booked successfully!');
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error('An error occurred while booking the ticket.');
        }
    };

    return (
        <Button onClick={handleClick} className="flex justify-between items-center gap-2 w-full">
            Book tickets
            <MoveRight />
        </Button>
    )
}
