"use client"
import { Button } from '@/components/ui/button'
import UploadServer from '@/lib/ServerAPI'
import React, { useState } from 'react'

export default function DeployButton({ url, projectName, branch }: { url: string, projectName: string, branch: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("working on it...");

    const handleClick = async () => {
        setLoading(true);
        try {
            const res = await UploadServer(url, projectName, branch);
            console.log("res", res);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex  flex-col gap-2 w-full '>
            <Button className='w-full py-2' onClick={handleClick}>
                Deploy
            </Button>

            <div className='w-full'>
                <p className='text-sm text-muted-foreground'>Progress</p>
                <div className='flex items-center px-5 italic w-full p-3 border h-20 bg-background rounded-sm'>
                    <p>deploying...</p>
                </div>
            </div>

        </div>
    )
}
