import AddNewBtn from '@/components/items/buttons/addnew-btn';
import ProjectCard, { ProjectCardType } from '@/components/items/project-card';
import SearchBar from '@/components/items/search-bar';
import NewRepoCardClient from '@/components/NewRepoCardClient';
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
    if (!dbUser) return redirect("/login");
    const projects: ProjectCardType[] = dbUser?.posts ?? [];

    if (!projects) return <div className='text-muted-foreground animate-pulse m-5 text-sm italic flex items-center justify-center'>Looks like you have no projects yet!</div>
    return (
        <div className='p-10'>
            < UserNamePageClient projects={projects} username={username} />
        </div>
    )
}
