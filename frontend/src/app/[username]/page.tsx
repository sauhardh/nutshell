import { authOptions } from '@/lib/authOptions';
import { parseUsername } from '@/lib/parseUsername';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

interface pageProps {
    params: Promise<{
        username: string
    }>
}

export default async function Page(props: pageProps) {
    const { username } = await props.params;
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login")
    }

    const usernameFromSession = parseUsername(session.user?.name);
    console.log("username", username, 'usernamefromsession', usernameFromSession);
    if (username !== usernameFromSession) {
        redirect("/")
    }

    return (
        <div>page {username}</div>
    )
}
