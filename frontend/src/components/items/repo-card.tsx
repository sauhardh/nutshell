import { Lock } from 'lucide-react'
import React from 'react'
import ImportBtn from './buttons/import-btn'

export type RepoType = {
    repoName: string,
    _private: boolean,
    date: string,
    repoLink: string,
    teamSlug?: string,
    branch: string,
    username: string
}

export default function RepoCard({
    repoName,
    _private,
    date,
    repoLink,
    branch,
    username
}: RepoType) {
    return (
        <div className='flex items-center justify-between px-4 py-2.5 text-sm'>
            <div className='flex gap-1 items-center'>
                <p className='flex font-medium'>
                    {repoName}&nbsp;
                    <span className='flex items-center gap-1 text-muted-foreground'>
                        {
                            _private ? <Lock className='w-3 h-3' /> : ""
                        }
                        &nbsp;.&nbsp;
                    </span>
                </p>
                <div className='text-muted-foreground text-xs pb-0 pt-1'>
                    {date}
                </div>
            </div>

            <ImportBtn projectName={repoName} link={repoLink} branch={branch} username={username} />
        </div>
    )
}
