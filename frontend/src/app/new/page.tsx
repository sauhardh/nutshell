import { GithubLogo } from '@/components/items/logos';
import RepoCard from '@/components/items/repo-card';
import SearchBar from '@/components/items/search-bar';
import React from 'react'

interface NewPageProps {
    searchParams: Promise<{ teamSlug: string }>
}

export type RepoType = {
    repoName: string,
    pub: boolean,
    date: string,
    repoLink: string,
    teamSlug: string,
    branch: string
}

export default async function Page({ searchParams }: NewPageProps) {
    const teamSlug = (await searchParams).teamSlug;

    const repos: RepoType[] = [
        { repoName: "GRE-daily", pub: true, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" },
        { repoName: "nutshell", pub: true, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" },
        { repoName: "lit-code", pub: true, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" },
        { repoName: "react_app", pub: true, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" },
        { repoName: "portfolio", pub: true, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" },
        { repoName: "zizz", pub: false, date: "Sep 28", repoLink: "https://github.com/sauhardh/react_app", teamSlug, branch: "main" }
    ];

    return (
        <div className='p-10 pt-0 space-y-5 flex flex-col items-center'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-4xl font-bold'>Let's build Something new.</h1>
                <p className='text-sm text-muted-foreground'>To deploy a new Project, import an existing Git Repository</p>
            </div>

            <div className='flex flex-col items-center gap-2 border-2 bg-slate-50 dark:bg-border p-10 pt-5'>
                <h1 className='text-2xl font-semibold'>Import Git Repository</h1>
                <div className='flex gap-4'>
                    <div className='flex gap-4 border px-5 pr-8 py-1 text-sm items-center rounded-sm'>
                        <GithubLogo className='w-3 h-3' />
                        <p>sauhardh</p>
                    </div>
                    <SearchBar placeholder='Search...' />
                </div>

                <div className='flex flex-col justify-between w-full gap-2 border-2 divide-y-2 mt-3'>
                    {
                        repos.map(({
                            repoName,
                            pub,
                            date,
                            repoLink,
                            teamSlug,
                            branch
                        }, _i) => (
                            <RepoCard key={_i} repoName={repoName} pub={pub} date={date} repoLink={repoLink} teamSlug={teamSlug} branch={branch} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
