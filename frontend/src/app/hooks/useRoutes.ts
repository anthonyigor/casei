import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { HiMiniEnvelopeOpen } from "react-icons/hi2";
import { AiFillGift } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { FaHome } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

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
            href: '/convidados/index',
            icon: FaUserFriends,
            active: pathname === '/convidados/index'
        },
        {
            label: 'Presentes',
            href: '/presentes/index',
            icon: AiFillGift,
            active: pathname === '/presentes/index'
        },
        {
            label: 'Convite',
            href: '/convite',
            icon: HiMiniEnvelopeOpen,
            active: pathname === '/convite'
        },
        {
            label: 'Preferências',
            href: '/config',
            icon: IoSettingsSharp,
            active: pathname === '/config'
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