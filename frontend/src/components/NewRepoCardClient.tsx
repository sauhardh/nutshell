"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react'
import { GithubRepos } from '@/lib/github';
import { GithubAllReposType } from '@/app/api/github/[user]/repos/route';
import RepoCard from './items/repo-card';
import SearchBar from './items/search-bar';
import { GithubLogo } from './items/logos';

export default function NewRepoCardClient({ teamSlug }: { teamSlug: string }) {
    const { data: session } = useSession();
    const [repos, setRepos] = useState<GithubAllReposType[] | null>([{ repoName: "Repository", _private: false, date: "", repoLink: "", branch: "main", }]);
    const [search, setSearch] = useState<string>("");

    const username = session?.user.username;
    useEffect(() => {
        if (!username) return;
        const fetchRepos = async () => {
            const githubRepos = new GithubRepos(username);
            setRepos(await githubRepos.GithubRepos());
        }
        fetchRepos();
    }, [username]);

    const filteredRepos = useMemo(() => {
        if (!search.trim()) return repos;

        const s = search.trim().toLowerCase();
        const data = sessionStorage.getItem(`${username}_repos`);

        if (data) {
            const allRepos: GithubAllReposType[] = JSON.parse(data);
            return allRepos.filter((repo) => repo.repoName.toLowerCase().includes(s));
        }
        return [];
    }, [repos, search])

    function LoadingDiv() {
        return (
            <div className='text-muted-foreground animate-pulse m-5 text-sm italic flex items-center justify-center'>Hold tight. Fetching info...</div>
        )
    }
    if (!repos || !username) return LoadingDiv();
    return (
        <>
            <div className='flex gap-4'>
                <div className='flex gap-4 border px-5 pr-8 py-1 text-sm items-center rounded-sm'>
                    <GithubLogo className='w-3 h-3' />
                    <p>{session?.user.username || "username"}</p>
                </div>
                <SearchBar placeholder='Search...' value={search} onChange={setSearch} />
            </div>
            <div className='flex flex-col justify-between w-full gap-2 border-2 divide-y-2 mt-3'>
                {
                    filteredRepos?.length
                    &&
                    filteredRepos.map(({
                        repoName,
                        _private,
                        date,
                        repoLink,
                        branch
                    }, _i) => (
                        <RepoCard key={_i} repoName={repoName} _private={_private} date={date} repoLink={repoLink} teamSlug={teamSlug} branch={branch} username={username} />
                    ))
                }

                {
                    (repos.length == 1 && (repos[0].repoLink == "" && repos[0].date == "" && repos[0].repoName == "Repository")) ? <LoadingDiv /> : ""
                }
            </div>
        </>
    )
}
