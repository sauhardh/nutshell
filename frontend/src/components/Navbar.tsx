import React from 'react'
import Image from 'next/image'
import CompanyLogo from './items/company-logo'
import Settings from './items/settings'

export default function Navbar() {
    return (
        <div className='w-full flex justify-between p-3 px-4'>
            <div>
                <CompanyLogo className='font-black text-2xl font-roboto' />
                {/*TODO users github */}
            </div>

            <div>
                <Settings />
            </div>
        </div>
    )
}
