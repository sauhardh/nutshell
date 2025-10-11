"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ImportBtn() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = () => {
        const teamSlug = searchParams.get("teamSlug")
        
    }
    return (
        <Button onClick={handleClick}>
            Import
        </Button>
    )
}