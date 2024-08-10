import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
    label: string
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}) => {
    
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <li onClick={handleClick}>
            <Link href={href}
                 className={clsx(`
                 group
                 flex
                 gap-x-3
                 rounded-md
                 p-3
                 text-sm
                 lg:w-36
                 leading-6
                 font-semibold
                 text-black
                 hover:text-white
                 hover:bg-rose-400
                 
                 `,
                 active && 'bg-gray-100 text-black'
             )}    
        >
                <Icon className="h-6 w-6 shrink-0" />
                <span >{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;