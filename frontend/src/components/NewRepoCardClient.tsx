"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { GithubRepos } from '@/lib/github';
import { GithubAllReposType } from '@/app/api/github/[user]/repos/route';
import RepoCard from './items/repo-card';

export default function NewRepoCardClient({ teamSlug }: { teamSlug: string }) {
    const { data: session } = useSession();
    const [repos, setRepos] = useState<GithubAllReposType[] | null>(null);


    useEffect(() => {
        if (!session?.user.username) return;

        const fetchRepos = async () => {
            const username = session.user.username!;
            const githubRepos = new GithubRepos(username);
            setRepos(await githubRepos.GithubRepos());
        }
        fetchRepos();

    }, [session?.user.username])

    if (!repos) return <div className='text-muted-foreground animate-pulse'>Loading...</div>

    return (
        <div className='flex flex-col justify-between w-full gap-2 border-2 divide-y-2 mt-3'>
            {
                repos.map(({
                    repoName,
                    pub,
                    date,
                    repoLink,
                    branch
                }, _i) => (
                    <RepoCard key={_i} repoName={repoName} pub={pub} date={date} repoLink={repoLink} teamSlug={teamSlug} branch={branch} />
                ))
            }
        </div>)
}
