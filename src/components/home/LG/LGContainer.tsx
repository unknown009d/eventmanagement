import LGSection from "./LGSection";
import LSTSections from "./LSTSection";
import { events1, upcomming, nearby, khudkaevents } from "@/lib/events";

export default function LGContainer() {
    return (
        <>
            <LGSection title="Featured Events" events={events1} />
            <LSTSections title="Upcomming Events" events={upcomming} />
            <LSTSections title="Nearby Events" events={nearby} />
        </>
    )
}
