"use client"
import React from 'react'
import { Button } from '../../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

interface ImportBtnProps {
    projectName: string,
    link: string,
    teamSlug: string,
    branch: string
}
export default function ImportBtn({ projectName, link, teamSlug, branch }: ImportBtnProps) {
    const router = useRouter();

    const handleClick = () => {
        const url = `/new/import?project-name=${encodeURIComponent(projectName)}&link=${encodeURIComponent(link)}&branch=${branch}&teamSlug=${encodeURIComponent(teamSlug)}`
        router.push(url)
    }
    return (
        <Button onClick={handleClick} size={"sm"}>
            Import
        </Button>
    )
}