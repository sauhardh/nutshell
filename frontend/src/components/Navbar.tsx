import React from 'react'
import CompanyLogo from './items/company-logo'
import Settings from './items/settings'
import SignupButton from './items/signup-btn'
import ContactButton from './items/contact-btn'
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'


export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const navigateLogin = () => {
        redirect("/login")
    }
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
                            <Button
                                className='px-5'
                                onClick={navigateLogin}
                            >
                                Login
                            </Button>
                            <SignupButton />
                            <ContactButton />
                        </div>
                }
            </div>
        </div >
    )
}
