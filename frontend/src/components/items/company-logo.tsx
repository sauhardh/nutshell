import React from 'react'
import { LoaderPinwheel } from 'lucide-react'
import Link from 'next/link'

interface CompanyLogoProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function CompanyLogo({ className = "", ...props }: CompanyLogoProps) {
    return (
        <Link href={"/home"}>
            <div {...props} className={`${className} flex items-center gap-1 cursor-pointer group`}>
                <LoaderPinwheel className='w-6 h-6 animate-none group-hover:animate-spin' />
                Nutshell
            </div>
        </Link>
    )
}
