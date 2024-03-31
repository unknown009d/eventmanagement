import LGSection from "./LGSection";
import { Artwork } from "@/components/Interfaces";
import LSTSections from "./LSTSection";

export const events1: Artwork[] = [
    {
        title: "Binay Blaze",
        details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure dolores eveniet harum repellendus tempora exercitationem, at non voluptatem incidunt quas consequatur praesentium reprehenderit labore! Vel dolorum, nobis odio, quae quasi voluptas est porro omnis obcaecati molestias eius dolores? Alias aut dolorum magnam ab veritatis quo debitis non laudantium quod ea!",
        img: "Event1.png",
        location: "New Delhi",
        date: "13th May 2024",
        badge: "Trending",
    },
    {
        title: "Challanging you to compete",
        details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure dolores eveniet harum repellendus tempora exercitationem, at non voluptatem incidunt quas consequatur praesentium reprehenderit labore!",
        img: "Event2.png",
        location: "Punjab",
        date: "30th March 2024",
    },
    {
        title: "Event Title",
        details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure dolores eveniet harum repellendus tempora exercitationem, at non voluptatem incidunt quas consequatur praesentium reprehenderit labore!",
        img: "ImagePlaceholder.webp",
        location: "Faridabad",
        date: "14th April 2024",
    },
]

export const upcomming: Artwork[] = [
    {
        title: "INNOSKILL 2024",
        details: "The Annual Tech Fest of Manav Rachna! Calling all students of Manav Rachna to unleash your tech prowess and make the most of this incredible opportunity!",
        img: "Faltu.jpg",
        location: "Manav Rachna Campus",
        date: "3rd-4th April 2024",
    },
]

export const nearby: Artwork[] = [
    {
        title: "7th Film Festival",
        details: "Welcoming all the talented film makers with their films and dreams.Extended deadline: March 5th, 2024 For more: https://jiffindia.org/delhi/",
        img: "Event3.png",
        location: "New Delhi",
        date: "8th April 2024",
    },
    {
        title: "Hanghatik Celebration",
        details: "The celebration ain't gonna be over without y'all. Join us for the 15 Years of Hanghatik Celebration, ALMOST A FESTIVAL (Anniversary Edition)",
        img: "Event4.jpg",
        location: "New Delhi",
        date: "9th April 2024",
    },
]

export default function LGContainer() {
    return (
        <>
            <LGSection title="Featured Events" events={events1} />
            <LSTSections title="Upcomming Events" events={upcomming} />
            <LSTSections title="Nearby Events" events={nearby} />
        </>
    )
}
