import React from 'react'
import { LoaderPinwheel } from 'lucide-react'

interface CompanyLogoProps extends React.HTMLAttributes<HTMLDivElement> { }
export default function CompanyLogo({ className = "", ...props }: CompanyLogoProps) {
    return (
        <div {...props} className={`${className} flex items-center gap-1 cursor-alias group`}>
            <LoaderPinwheel className='w-6 h-6 animate-none group-hover:animate-spin' />
            Nutshell
        </div>
    )
}
