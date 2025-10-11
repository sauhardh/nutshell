import { GithubLogo } from '@/components/items/logos';
import RepoCard from '@/components/items/repo-card';
import SearchBar from '@/components/items/search-bar';
import { Search } from 'lucide-react';
import React from 'react'

interface NewPageProps {
    params: Promise<{ teamSlug?: string }>
}

export type RepoType = {
    repo: string,
    pub: boolean,
    date: string,
    url: string
}

export default async function Page(props: NewPageProps) {
    const { teamSlug } = await props.params;

    const repos: RepoType[] = [
        { repo: "GRE-daily", pub: true, date: "Sep 28", url: "https://github.com/sauhardh/react_app" },
        { repo: "nutshell", pub: true, date: "Sep 28", url: "https://github.com/sauhardh/react_app" },
        { repo: "lit-code", pub: true, date: "Sep 28", url: "https://github.com/sauhardh/react_app" },
        { repo: "react_app", pub: true, date: "Sep 28", url: "https://github.com/sauhardh/react_app" },
        { repo: "portfolio", pub: true, date: "Sep 28", url: "https://github.com/sauhardh/react_app" },
        { repo: "zizz", pub: false, date: "Sep 28", url: "https://github.com/sauhardh/react_app" }
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
                            repo,
                            pub,
                            date,
                            url
                        }, _i) => (
                            <RepoCard key={_i} repo={repo} pub={pub} date={date} url={url} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
