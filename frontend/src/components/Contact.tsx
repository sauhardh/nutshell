"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';

export default function Contact() {
    const [status, setStatus] = useState<string | null>(null);
    const [statusSuccess, setStatusSuccess] = useState<boolean | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                message: formData.get("message")
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setStatus("Message sent successfully")
            setStatusSuccess(true);
        } else {
            setStatusSuccess(false);
            setStatus("Something went wrong.");
        }

        e?.currentTarget?.reset();
        setTimeout(() => {
            setStatus(null)
            setStatusSuccess(null)
        }, 3000);
    }
    return (
        <div className='flex gap-4 justify-around items-start'>
            <div className='flex-col flex justify-center items-center gap-12'>
                <h1 className='text-primary font-bold text-3xl'>Talk to our team.</h1>
                <div className='flex-col flex gap-4 items-center text-muted-foreground px-45'>
                    <p>
                        <span className='text-primary font-semibold'>Get a support.&nbsp;&nbsp;</span>
                        Discover the value of Nutshell for your learning and developing journey
                    </p>
                    <p>
                        <span className='text-primary font-semibold'>Report.&nbsp;&nbsp;</span>
                        Make this platform your luxury experience by reporting bugs if found
                    </p>
                </div>
            </div>

            <div className={`flex flex-col w-1/2 border-2 ${statusSuccess == true ? "border-green-800" : statusSuccess == false ? "border-red-900" : "border-border"}  p-10 bg-slate-50 dark:bg-border`}>
                <form onSubmit={handleSubmit} id='contact-form' className='flex flex-col gap-7'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className=''>Enter your mail</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder='Email address'
                            className='px-2 py-2 border border-border rounded-sm'
                        />
                    </div>

                    <div>
                        <label htmlFor="message">How can we help?</label>
                        <textarea
                            name="message"
                            id="message"
                            form='contact-form'
                            placeholder='Enter your text here'
                            rows={5}
                            required
                            className='w-full border resize-none p-2'
                        />
                    </div>
                    <Button className={`transition-colors duration-300 ${statusSuccess == true ? "bg-green-800 text-white hover:bg-green-800" : statusSuccess == false ? "bg-red-900 text-white hover:bg-red-900" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>{status ? status : "Send"}</Button>
                </form>
            </div>
        </div>
    )
}
