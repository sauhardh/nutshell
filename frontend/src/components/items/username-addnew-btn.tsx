"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function AddNewBtn({ username }: { username: string }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/new?teamSlug=${encodeURIComponent(username)}`)
    }

    return (
        <Button onClick={handleClick}>
            Add New
        </Button >
    )
}
