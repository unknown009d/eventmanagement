"use client"
import { useEffect, useRef, useState } from 'react';
import LGSection from "./LGSection";
import LSTSections from "./LSTSection";
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function LGContainer() {
    const [events, setEvents] = useState([]);
    const [nearbyStartIndex, setNearbyStartIndex] = useState(4);
    const loadMoreRef = useRef(null);

    useEffect(() => {
        fetch('/api/post?sort=-1&gt=1')
            .then(response => response.json())
            .then(data => setEvents(data.message));

        // const observer = new IntersectionObserver((entries) => {
        //     if (entries[0].isIntersecting) {
        //         setNearbyStartIndex(nearbyStartIndex + 5);
        //     }
        // });

        // if (loadMoreRef.current) {
        //     observer.observe(loadMoreRef.current);
        // }

        // return () => {
        //     if (loadMoreRef.current) {
        //         observer.unobserve(loadMoreRef.current);
        //     }
        // };
    }, [nearbyStartIndex]);

    const { isLoaded, isSignedIn, user } = useUser();
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const emailaddress = user.emailAddresses[0].toString();
            const username = user.username || user.firstName || emailaddress.split("@")[0];
            fetch(`/api/post?sort=-1&count=1&author=${username}`)
                .then(response => response.json())
                .then(data => {
                    setUpcoming(data.message)
                });
        }
    }, [isLoaded, isSignedIn, user]);

    // const loadMoreNearbyEvents = () => {
    //     setNearbyStartIndex(nearbyStartIndex + 5);
    // }

    const events1 = events ? events.slice(0, 3) : [];
    const nearby = events ? events.slice(3, nearbyStartIndex) : [];

    const handleLoadMore = () => {
        setNearbyStartIndex(nearbyStartIndex + 2)
    }


    return (
        <>
            <LGSection title="Featured Events" events={events1} />
            {upcoming ?
                upcoming.length > 0 ?
                    <LSTSections title="My latest created event" events={upcoming} />
                    :
                    <></>
                :
                <></>
            }
            {
                nearby ?
                    nearby.length > 0 ?
                        <LSTSections title="More Events" events={nearby} />
                        : <></>
                    : <></>
            }
            {/* <div ref={loadMoreRef}>Load more...</div> */}
            <div className='w-full flex items-start justify-end'>
                <Button variant='link' onClick={handleLoadMore} className={nearbyStartIndex >= events.length ? 'hidden' : ''}>Load more</Button>
            </div>
        </>
    )
}
