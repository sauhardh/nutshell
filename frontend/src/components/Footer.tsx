import React from 'react'
import { GithubLogo } from './items/logos'
import { Mail, Globe } from 'lucide-react'
import { GITHUB_URL, MAIL_TO, WEBSITE_URL } from '@/lib/constants'

export default function Footer() {
    type FooterIconsType = {
        icon: React.ElementType,
        url: string,
        customClassName?: string
        iconClassName?: string
        url_prefix?: string,
    }

    const footerIcons: FooterIconsType[] = [
        { icon: GithubLogo, url: GITHUB_URL, iconClassName: "w-5 h-5" },
        { icon: Mail, url: MAIL_TO, url_prefix: "mailto:" },
        { icon: Globe, url: WEBSITE_URL, customClassName: "animate-none hover:animate-spin" }];
    return (
        <div className='flex justify-around p-5 items-center'>
            <div className='flex gap-4'>
                {
                    footerIcons.map(({ icon: Icon, url, customClassName = "", iconClassName = "", url_prefix = "" }) => (
                        <a key={url} href={`${url_prefix}${url}`} rel="noopener noreferrer" target="_blank" className={`hover:scale-95 hover:text-muted-foreground ${customClassName}`}>
                            <Icon className={`${iconClassName}`} />
                        </a>
                    ))
                }
            </div>

            <div className='text-muted-foreground text-sm font-mono cursor-pointer'>
                <p>Made with ❤️ by Sauhardha Kafle</p>
            </div>
        </div>
    )
}
