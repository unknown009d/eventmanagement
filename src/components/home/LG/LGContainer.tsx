import LGSection from "./LGSection";
import LSTSections from "./LSTSection";
import { events1, upcomming, nearby } from "@/lib/events";

export default function LGContainer() {
    return (
        <>
            <LGSection title="Featured Events" events={events1.reverse()} />
            <LSTSections title="Upcomming Events" events={upcomming} />
            <LSTSections title="Nearby Events" events={nearby} />
        </>
    )
}
