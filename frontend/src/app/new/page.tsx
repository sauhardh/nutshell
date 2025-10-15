import { GithubLogo } from '@/components/items/logos';
import SearchBar from '@/components/items/search-bar';
import React from 'react'
import NewRepoCardClient from '@/components/NewRepoCardClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

interface NewPageProps {
    searchParams: Promise<{ teamSlug: string }>
}

export default async function Page({ searchParams }: NewPageProps) {
    const teamSlug = (await searchParams).teamSlug;

    return (
        <div className='p-10 pt-0 space-y-5 flex flex-col items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-4xl font-bold'>Let's build Something new.</h1>
                <p className='text-sm text-muted-foreground'>To deploy a new Project, import an existing Git Repository</p>
            </div>

            <div className='flex flex-col items-center gap-2 border-2 bg-slate-50 dark:bg-border p-10 pt-5'>
                <h1 className='text-2xl font-semibold'>Import Git Repository</h1>
                <NewRepoCardClient teamSlug={teamSlug} />
            </div>
        </div>
    )
}
