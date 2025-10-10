"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignupButton() {
    const router = useRouter();
    return (
        <Link href={"/signup"}>
            <Button className='text-muted-foreground px-5' variant={"outline"}>
                Sign Up
            </Button>
        </Link>
    )
}
