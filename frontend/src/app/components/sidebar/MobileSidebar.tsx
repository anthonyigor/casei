'use client'

import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const MobileSidebar = () => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="
                    fixed
                    top-0
                    left-0
                    p-4
                    hover:bg-gray-100
                    lg:hidden
                    z-50
                "
            >
                <IoMenu size={24} />
            </button>
            
            {isOpen && (
                <div className="
                    fixed
                    top-0
                    left-0
                    h-full
                    w-56
                    z-40
                    bg-white
                    border-r-[1px]
                    transition-all
                    duration-300
                    lg:hidden
                    pt-14
                ">
                    <nav>
                        {routes.map((route) => (
                            <MobileItem 
                                key={route.href}
                                href={route.href}
                                active={route.active}
                                icon={route.icon}
                                onClick={() => {
                                    route.onClick?.();
                                    setIsOpen(false);
                                }}
                                label={route.label}
                                isOpen={true}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
 
export default MobileSidebar;