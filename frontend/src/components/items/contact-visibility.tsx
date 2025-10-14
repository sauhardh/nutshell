"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ContactVisibility({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const show = pathname == "/" || pathname == "/home";

    if (!show) return null;
    return <>{children}</>
}
