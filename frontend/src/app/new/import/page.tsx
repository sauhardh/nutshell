import DeployButton from '@/components/items/buttons/deploy-btn';
import { GithubLogo } from '@/components/items/logos';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/authOptions';
import { GitBranch } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react'

export interface ImportPageProps {
    searchParams: Promise<{
        ["project-name"]: string,
        link?: string,
        teamSlug?: string,
        branch: string
    }>
}
export default async function Page({ searchParams }: ImportPageProps) {
    const { ["project-name"]: projectName, link, teamSlug, branch } = await searchParams;
    const repoUrl: string = decodeURIComponent(link || "");

    const userId = (await getServerSession(authOptions))?.user.id;
    if (!userId) {
        return <div className='text-muted-foreground animate-pulse m-5 text-sm italic flex items-center justify-center'>Unauthorized access</div>
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center gap-2 space-y-4 border-2 bg-slate-50 dark:bg-border max-w-2xl p-10  w-full'>
                <h1 className='text-2xl font-medium self-start'>New Project</h1>

                <div className='flex flex-col text-sm border p-3 gap-1 w-full bg-background rounded-sm'>
                    <p className='text-muted-foreground'>importing from GitHub</p>
                    <div className='flex gap-3'>
                        <span className='flex gap-1 items-center'>
                            <GithubLogo className='w-4 h-4' />
                            <p>{teamSlug}/{projectName}</p>
                        </span>
                        <span className='flex gap-1 items-center text-muted-foreground'>
                            <GitBranch className='w-4 h-4' />
                            <p>{branch}</p>
                        </span>
                    </div>
                </div>

                <div className='w-full'>
                    <p className='text-muted-foreground text-sm'>Root Directory</p>
                    <div className='border border-border w-full rounded-sm p-2 text-sm text-muted-foreground'>
                        ./
                    </div>
                </div>

                <div className='w-full'>
                    <p className='text-muted-foreground text-sm'>Url</p>
                    <div className='border border-border w-full rounded-sm p-2 text-muted-foreground text-sm'>
                        {link}
                    </div>
                </div>

                <DeployButton url={repoUrl} projectName={projectName} branch={branch} userId={userId} teamSlug={teamSlug} />
            </div>
        </div>
    )
}
