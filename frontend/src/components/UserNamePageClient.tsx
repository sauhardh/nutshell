"use client"
import AddNewBtn from '@/components/items/buttons/addnew-btn';
import ProjectCard, { ProjectCardType } from '@/components/items/project-card';
import React, { useMemo, useState } from 'react'
import SearchBar from './items/search-bar';

export default function UserNamePageClient({ projects, username }: { projects: ProjectCardType[], username: string }) {
    const [search, setSearch] = useState<string>("");

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => p.projectName.includes(search) || p.githubRepoName.includes(search));
    }, [search]);

    return (
        <div className='p-10'>

            <div className='flex w-full space-x-2.5 pb-5'>
                <SearchBar placeholder='Search Projects...' value={search} onChange={setSearch} />
                <AddNewBtn username={username} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-5'>
                {
                    filteredProjects.map(({
                        id,
                        projectName,
                        projectUrl,
                        githubUserName,
                        githubRepoName,
                        latestCommit,
                        latestCommitTime,
                        githubBranch,
                        domainId,
                        status
                    }) => (
                        <ProjectCard
                            key={id}
                            projectName={projectName}
                            githubUserName={githubUserName}
                            githubRepoName={githubRepoName}
                            latestCommit={latestCommit}
                            latestCommitTime={latestCommitTime}
                            githubBranch={githubBranch}
                            domainId={domainId}
                        />
                    ))
                }

                {
                    !filteredProjects || filteredProjects.length == 0 ?
                        <div className='text-muted-foreground text-sm italic flex items-center pt-5'>No match found!</div>
                        :
                        ""
                }
            </div>
        </div>
    )
}
