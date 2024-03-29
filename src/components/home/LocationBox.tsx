"use client"
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LocationBoxProps{
    className?: string;
}

export default function LocationBox({ className }: LocationBoxProps) {
    const handleClick = () => {
        toast.warning("Feature in development", {
            description: "Changing your location feature is currently in development but we will shortly implement this section."
        })
    }

    return (
        <button onClick={handleClick} className={cn("text-xs rounded-full flex flex-row gap-1 items-center justify-start", className)}>
            <MapPin size={14} />
            <p>New Delhi, India</p>
        </button>
    )
}
