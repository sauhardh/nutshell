import React from 'react'
import Link from 'next/link'
import { LoaderPinwheel } from 'lucide-react'
import LoginButton from '@/components/items/login-btn'

export default function Login() {
    return (
        <main className='flex flex-col items-center justify-center'>
            <LoaderPinwheel className='absolute left-5 top-5 animate-none hover:animate-spin' />
            <div className='flex flex-col mt-20 bg-border border shadow-2xl px-20 rounded-xl pt-20 pb-5 gap-10'>
                <div className='flex flex-col items-center gap-10'>
                    <div className='flex items-center justify-center gap-2'>
                        <h1 className='text-3xl font-black'>Log in to Nutshell
                        </h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='text-muted-foreground font-medium px-2 rounded-sm font-mono max-w-2xl'>
                            A one step closer towards your goal
                        </div>
                        <LoginButton provider="github" text='Continue with Github' iconClassName='w-7 h-7' />
                    </div>
                </div>

                <div className='text-muted-foreground flex items-center justify-center p-10 gap-2'>
                    Don't have an account?
                    <Link className='text-blue-500 underline' href={"/signup"}>
                        Sign up
                    </Link>
                </div>
            </div>
        </main >
    )
}
