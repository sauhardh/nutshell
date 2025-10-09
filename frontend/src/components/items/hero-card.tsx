import React from 'react'

export type HeroCardType = {
    heading: string,
    paragraph: string,
    icon: React.ElementType,
    iconClassName?: string,
    headingClassName?: string,
    paragraphClassName?: string
}

export default function HeroCard({ heading, paragraph, icon: Icon, iconClassName = "", headingClassName = "", paragraphClassName = "" }: HeroCardType) {
    return (
        <div className='flex items-center justify-center gap-3 overflow-auto'>
            <Icon className={`${iconClassName}`} />
            <div className='flex-col'>
                <p className={`font-medium ${headingClassName}`}>{heading}</p>
                <p className={`text-muted-foreground text-sm ${paragraphClassName}`}>{paragraph}</p>
            </div>
        </div>
    )
}
