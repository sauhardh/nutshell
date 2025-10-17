import Image from 'next/image'
import React from 'react'
import { GithubLogo } from './logos'
import { GitBranch, Ellipsis } from 'lucide-react'
import Link from 'next/link'

export type ProjectCardType = {
    id?: string,
    projectName: string,
    projectUrl?: string | null,
    githubUserName: string,
    githubRepoName: string,
    latestCommit?: string | null,
    latestCommitTime?: string | null,
    githubBranch: string
    domainId: string,
    status?: string | null
}

export default function ProjectCard({
    projectName,
    githubUserName,
    githubRepoName,
    latestCommit,
    latestCommitTime,
    githubBranch,
    domainId
}: ProjectCardType) {
    const date = (new Date()).toLocaleDateString("en-US", { day: "numeric", month: "short" });
    let projectUrl = `http://${domainId}.localhost:7878/`;

    return (
        <div className='flex flex-col p-4 px-6 gap-3 text-sm border-2 rounded-xl w-full max-w-sm hover:shadow-2xl hover:scale-101'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                    <div className='w-10 h-10 relative'>
                        <Image src={"/placeholder.png"} alt={"ico"} fill className='object-cover rounded-full border-2 border-border' />
                    </div>
                    <div>
                        <p className='font-medium'>{projectName || "project-name"}</p>
                        <Link href={projectUrl} target='_blank'>
                            <p className='text-muted-foreground text-shadow-2xs text-shadow-blue-900 text-xs cursor-pointer hover:text-blue-300'>{projectUrl || "***.nutshell.com"}</p>
                        </Link>
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
