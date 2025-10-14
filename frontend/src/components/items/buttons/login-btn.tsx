"use client"
import React from 'react'
import { Button } from '../../ui/button'
import { useSession, signIn, signOut } from 'next-auth/react'
// import { GithubLogo } from './logos';
import { GithubLogo } from '../logos'
import { BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseUsername } from '@/lib/parseUsername';

export default function LoginButton({ provider, text, iconClassName }: { provider: string, text: string, iconClassName?: string }) {
    const router = useRouter();
    const { data: session } = useSession();
    if (session) {
        if (session.user?.name) {
            let _name = parseUsername(session.user.name)
            router.replace(`/${_name}`);
        } else {
            router.push("/")
        };
    }

    const Icon = provider == "github" ? GithubLogo : BadgeCheck;

    return (
        <Button
            className='w-full py-5 shadow-2xl text-md font-medium'
            variant={"outline"}
            size="lg"
            onClick={() => signIn("github")}
        >
            <Icon className={`${iconClassName}`} />
            {text}
        </Button>
    )
}
