import React from 'react'
import Image from 'next/image'
import CompanyLogo from './items/company-logo'
import Settings from './items/settings'
import LoginButton from './items/login-btn'
import SignupButton from './items/signup-btn'
import ContactButton from './items/contact-btn'

export default function Navbar() {
    return (
        <div className='w-full flex justify-between p-3 px-4 '>
            <div>
                <CompanyLogo className='font-black text-2xl font-roboto' />
                {/*TODO users github */}
            </div>

            <div className='flex gap-4 items-center'>
                <LoginButton />
                <ContactButton />
                <SignupButton />
                <Settings />
            </div>
        </div>
    )
}
