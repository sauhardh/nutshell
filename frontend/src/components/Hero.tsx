import React from 'react'
import StartButton from './items/buttons/start-btn'
import { Spotlight } from './ui/spotlight'
import { ShootingStars } from './ui/shooting-stars'
import { StarsBackground } from './ui/stars-background'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { parseUsername } from '@/lib/parseUsername'

export default async function Hero() {
    const session = await getServerSession();

    return (
        <div className='flex-col'>
            {/* Decoration */}
            <div className="fixed inset-0 overflow-hidden -z-50 pointer-events-none">
                <Spotlight className="absolute -top-40 left-0 md:-top-20 md:left-60" fill="#fdf6e3" />
                <ShootingStars className="absolute" />
                <StarsBackground className="absolute" />
            </div>

            <div className='flex-col flex justify-center items-center text-primary gap-7'>
                <h1 className='text-4xl font-bold'>
                    Build and deploy on the cloud
                </h1>
                <p className='text-muted-foreground'>
                    Nutshell provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.
                </p>

                <Link href={session?.user?.name ? `/${parseUsername(session?.user?.name)}` : "/login"}>
                    <StartButton />
                </Link>
            </div>
        </div>
    )
}
