import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useRoutes = () => {
    const pathname = usePathname()
    const routes = useMemo(() => [
        {
            label: 'Convidados',
            href: '/convidados',
            active: pathname === '/convidados'
        },
        {
            label: 'Presentes',
            href: '/presentes',
            active: pathname === '/presentes'
        },
        {
            label: 'Convite',
            href: '/convite',
            active: pathname === '/convite'
        },
    ], [pathname])

    return routes
}

export default useRoutes