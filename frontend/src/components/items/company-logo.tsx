import React from 'react'

interface CompanyLogoProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function CompanyLogo({ className = "", ...props }: CompanyLogoProps) {
    return (
        <div {...props} className={`${className}`}>Nutshell</div>
    )
}
