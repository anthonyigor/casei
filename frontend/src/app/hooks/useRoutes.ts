import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { HiMiniEnvelopeOpen } from "react-icons/hi2";
import { AiFillGift } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { FaHome } from "react-icons/fa";

const useRoutes = () => {
    const pathname = usePathname()
    const routes = useMemo(() => [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: FaHome,
            active: pathname === '/'
        },
        {
            label: 'Convidados',
            href: '/convidados',
            icon: FaUserFriends,
            active: pathname === '/convidados'
        },
        {
            label: 'Presentes',
            href: '/presentes',
            icon: AiFillGift,
            active: pathname === '/presentes'
        },
        {
            label: 'Convite',
            href: '/convite',
            icon: HiMiniEnvelopeOpen,
            active: pathname === '/convite'
        },
        {
            label: 'Logout',
            href: '#',
            icon: HiOutlineLogout,
            onClick: () => signOut(),
            active: pathname === '/logout'
        }
    ], [pathname])

    return routes
}

export default useRoutes