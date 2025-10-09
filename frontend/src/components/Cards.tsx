import React from 'react'
import { HandCoins, Cloud } from 'lucide-react'
import HeroCard, { HeroCardType } from './items/hero-card'
import { GithubLogo } from './items/logos'

export default function Cards() {
    const heroCards: HeroCardType[] = [
        {
            heading: "Seamless Deployment",
            paragraph: "Deploy your application with a single click—no extra steps required.",
            icon: Cloud,
            iconClassName: "w-10 h-10 text-[#a2386a]",
            headingClassName: "text-[#a2386a]",
            paragraphClassName: ""

        },
        {
            heading: "Cost Efficiency",
            paragraph: "Reduce unnecessary expenses and save valuable resources.",
            icon: HandCoins,
            iconClassName: "w-10 h-10",
            headingClassName: "",
            paragraphClassName: ""

        },
        {
            heading: "GitHub Integration",
            paragraph: "Deploy your project directly to the internet via GitHub.",
            icon: GithubLogo,
            iconClassName: "w-10 h-10",
            headingClassName: "",
            paragraphClassName: ""
        },
    ];
    return (
        <div className='flex justify-between items-center gap-9 border-2 border-border p-4 divide-x-2 divide-border border-l-0 border-r-0'>
            {
                heroCards.map(({ heading, paragraph, icon, iconClassName, headingClassName, paragraphClassName }: HeroCardType) => (
                    <HeroCard
                        key={heading}
                        heading={heading}
                        paragraph={paragraph}
                        icon={icon}
                        iconClassName={iconClassName}
                        headingClassName={headingClassName}
                        paragraphClassName={paragraphClassName}

                    />
                ))
            }
        </div>
    )
}
