import { RepoType } from '@/app/new/page'
import { Lock } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export default function RepoCard({
    repo,
    pub,
    date,
    url
}: RepoType) {
    return (
        <div className='flex items-center justify-between px-4 py-2.5 text-sm'>
            <div className='flex gap-1 items-center'>
                <p className='flex font-medium'>
                    {repo}&nbsp;
                    <span className='flex items-center gap-1 text-muted-foreground'>
                        {
                            pub ? "" : <Lock className='w-3 h-3' />
                        }
                        &nbsp;.&nbsp;
                    </span>
                </p>
                <div className='text-muted-foreground text-xs pb-0 pt-1'>
                    {date}
                </div>
            </div>

            <Button size={"sm"}>
                Import
            </Button>
        </div>
    )
}
