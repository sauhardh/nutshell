import React from 'react'
import { Button } from '../../ui/button'
import { LoaderPinwheel } from 'lucide-react'

export default function StartButton() {
    return (
        <div className='mt-7'>
            <Button className='group border-2 border-transparent hover:border-border px-9 rounded-3xl py-6 text-md transition-all duration-200 hover:scale-99 shadow-sm'>
                <LoaderPinwheel className='animate-none group-hover:animate-spin ' />
                Start Deploying
            </Button>
        </div>
    )
}
