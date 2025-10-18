import { ProjectCardType } from '@/components/items/project-card';
import UserNamePageClient from '@/components/UserNamePageClient';
import { authOptions } from '@/lib/authOptions';
import { parseUsername } from '@/lib/parseUsername';
import prisma from '@/lib/prisma';
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
    if (!session || !session.user.id) redirect("/login");

    const usernameFromSession = parseUsername(session.user?.name);
    if (username !== usernameFromSession) redirect("/home");

    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { posts: true }
    });
    const projects: ProjectCardType[] = dbUser?.posts ?? [];
    return (
        <div className='p-10'>
            < UserNamePageClient projects={projects} username={username} />
        </div>
    )
}
