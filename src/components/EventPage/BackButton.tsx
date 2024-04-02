"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function Back() {
    const router = useRouter();
    return (
        <Button onClick={() => { router.back() }} variant={"ghost"} className="h-12 w-12 mb-4 p-2">
            <ChevronLeft />
        </Button>
    )
}
