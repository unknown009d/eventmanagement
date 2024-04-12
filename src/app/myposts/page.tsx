"use client"
import LSTSections from '@/components/home/LG/LSTSection'
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

export default function Myposts() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [mevents, setMevents] = useState(null);


    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const emailaddress = user.emailAddresses[0].toString();
            const username = user.username || user.firstName || emailaddress.split("@")[0];
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/post?author=${username}`);
                    const data = await response.json();
                    if (data.success) setMevents(data.message);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchData();
        }
    }, [isLoaded, isSignedIn, user]);



    return (
        <div className='w-full mb-20'>
            {
                mevents ?
                    <LSTSections title="Previous Published Events" unOptimizedImg={true} events={mevents} />
                    :
                    <div className="flex flex-col justify-start items-start w-full gap-4 px-6">
                        <div className="w-full flex flex-col items-start justify-center">
                            <Skeleton className="h-4 w-[80px]" />
                            {
                                Array.from({ length: 3 }).map((_, i) => (
                                    <figure key={i} className="mt-6 flex flex-row justify-start gap-4 w-full">
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
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
