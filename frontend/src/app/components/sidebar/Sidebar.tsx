'use client'

import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({children}) => {
    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileSidebar />
            <main className="h-full lg:pl-20">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;