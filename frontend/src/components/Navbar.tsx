import React from 'react'
import CompanyLogo from './items/company-logo'
import Settings from './items/settings'
import SignupButton from './items/buttons/signup-btn'
import ContactButton from './items/buttons/contact-btn'
import { Button } from './ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Link from 'next/link'
import ContactVisibility from './items/contact-visibility'

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className='w-full flex justify-between p-3 px-4 '>
            <div>
                <CompanyLogo className='font-black text-2xl font-roboto' />
            </div>

            <div className='flex gap-4 items-center'>
                {
                    session && session.user ?
                        <Settings />
                        :
                        <div className='flex gap-4'>
                            {/* LoginButton */}
                            <Link href={"/login"}>
                                <Button
                                    className='px-5'
                                >
                                    Login
                                </Button>
                            </Link>
                            <SignupButton />
                            <ContactVisibility>
                                <ContactButton />
                            </ContactVisibility>
                        </div>
                }
            </div>
        </div >
    )
}
