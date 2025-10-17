"use client"
import { Button } from '@/components/ui/button'
import { UploadServer } from '@/lib/ServerAPI'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function DeployButton({ url, projectName, branch, userId, teamSlug }: { url: string, projectName: string, branch: string, userId: string, teamSlug: string | undefined }) {
    const [status, setStatus] = useState<string>("Progress will be shown here");
    const [upload, setUpload] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!upload) return;

        console.log("evt source")
        const evtSource = new EventSource(`/api/status/${userId}`);
        evtSource.onmessage = (event) => {
            console.log("event of evt", event);
            setStatus(event.data);
            if (event.data == "success") {
                router.replace(`/${teamSlug}`)
            }
        };
        return () => {
            evtSource.close();
        };
    }, [upload])

    const handleClick = async () => {
        try {
            setUpload(true);
            const res = await UploadServer(url, projectName, branch);
            if (res.message) {
                setStatus(res.message)
            }
        } catch (error) {
            console.error("Error occured", error);
            setStatus((error as Error).message);
        }
    }
    return (
        <div className='flex  flex-col gap-2 w-full '>
            <Button className='w-full py-2' onClick={handleClick}>
                Deploy
            </Button>

            <div className='w-full'>
                <p className='text-sm text-muted-foreground'>Progress</p>
                <div className='flex justify-center text-blue-300 text-sm items-center px-5 italic w-full p-3 border h-20 bg-background rounded-sm'>
                    <p>{status || "loading..."}</p>
                </div>
            </div>
        </div>
    )
}
