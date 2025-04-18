'use client'

import clsx from "clsx"
import Link from "next/link"
import React from "react"

interface MobileItemProps {
    href: string
    active?: boolean
    icon: any
    onClick?: () => void
    label: string
    isOpen: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    active,
    icon: Icon,
    onClick,
    label,
    isOpen
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link
            onClick={onClick}
            href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                text-sm
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-black
                hover:text-white
                hover:bg-violet-400
                `,
                active && 'bg-gray-100 text-black'
            )}
        >
            <Icon className='h-6 w-6' />
            {isOpen && (
                <span className="ml-4">{label}</span>
            )}
        </Link>
    );
}
 
export default MobileItem;