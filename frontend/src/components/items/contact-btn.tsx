import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function ContactButton() {
    return (
        <div>
            <Link href={"#contact"} className='transition-all duration-1000'>
                <Button className='bg-transparent text-primary border-border border-2 hover:bg-border px-5'>
                    Contact
                </Button>
            </Link>
        </div>
    )
}
