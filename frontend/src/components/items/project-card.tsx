import Image from 'next/image'
import React from 'react'
import { GithubLogo } from './logos'
import { GitBranch, Ellipsis } from 'lucide-react'

export type ProjectCardType = {
    projectName: string,
    projectUrl: string,
    githubUserName: string,
    githubRepoName: string,
    latestCommit: string,
    latestCommitTime: string,
    githubBranch: string
}

export default function ProjectCard({
    projectName,
    projectUrl,
    githubUserName,
    githubRepoName,
    latestCommit,
    latestCommitTime,
    githubBranch
}: ProjectCardType) {
    const date = (new Date()).toLocaleDateString("en-US", { day: "numeric", month: "short" });
    return (
        <div className='flex flex-col p-4 px-6 gap-3 text-sm border-2 rounded-xl w-full max-w-sm hover:shadow-2xl hover:scale-101'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                    <div className='w-10 h-10 relative'>
                        <Image src={"/placeholder.png"} alt={"ico"} fill className='object-cover rounded-full border-2 border-border' />
                    </div>
                    <div>
                        <p className='font-medium'>{projectName || "project-name"}</p>
                        <p className='text-muted-foreground'>{projectUrl || "***.nutshell.com"}</p>
                    </div>
                </div>
                <Ellipsis className='self-start text-muted-foreground' />
            </div>

            <div className='flex items-center gap-1 border rounded-2xl bg-border text-xs font-medium px-1 w-max mt-2'>
                <GithubLogo className='w-3 h-3' />
                <p>{githubUserName || "user"}/{githubRepoName || "repo-name"}</p>
            </div>

            <div className='flex flex-col'>
                <p className='font-medium'>{latestCommit || "updated"}</p>
                <div className='flex gap-1 text-muted-foreground'>
                    <p>{latestCommitTime || date}</p>
                    <GitBranch className='w-5 h-5' />
                    <p>{githubBranch || "main"}</p>
                </div>
            </div>
        </div>
    )
}
