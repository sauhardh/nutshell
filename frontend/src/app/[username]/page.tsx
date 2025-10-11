import AddNewBtn from '@/components/items/buttons/addnew-btn';
import ProjectCard, { ProjectCardType } from '@/components/items/project-card';
import SearchBar from '@/components/items/search-bar';
import { authOptions } from '@/lib/authOptions';
import { parseUsername } from '@/lib/parseUsername';
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
    if (!session) redirect("/login");


    const usernameFromSession = parseUsername(session.user?.name);
    console.log("username", username, 'usernamefromsession', usernameFromSession);
    if (username !== usernameFromSession) redirect("/home");


    const projects: ProjectCardType[] = [
        {
            projectName: "portfolio-sauhardhakafle",
            projectUrl: "www.sauhardhakafle.com.np",
            githubUserName: "sauhardh",
            githubRepoName: "portfolio",
            latestCommit: "Tweaks",
            latestCommitTime: "Sep 23",
            githubBranch: "main"
        },
        {
            projectName: "acme",
            projectUrl: "theacme.vercel.app",
            githubUserName: "ostrich-egg",
            githubRepoName: "acme",
            latestCommit: "update",
            latestCommitTime: "Apr 20",
            githubBranch: "main"
        },
    ]

    return (
        <div className='p-10'>

            <div className='flex w-full space-x-2.5 pb-5'>
                <SearchBar placeholder='Search Projects...' />
                <AddNewBtn username={username} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-5'>
                {
                    projects.map(({
                        projectName,
                        projectUrl,
                        githubUserName,
                        githubRepoName,
                        latestCommit,
                        latestCommitTime,
                        githubBranch
                    }, _i) => (
                        <ProjectCard
                            key={_i}
                            projectName={projectName}
                            projectUrl={projectUrl}
                            githubUserName={githubUserName}
                            githubRepoName={githubRepoName}
                            latestCommit={latestCommit}
                            latestCommitTime={latestCommitTime}
                            githubBranch={githubBranch}
                        />
                    ))
                }
            </div>
        </div>
    )
}
