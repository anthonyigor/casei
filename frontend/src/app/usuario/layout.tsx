import Sidebar from "@/app/components/sidebar/Sidebar";
import { ReactNode } from "react";

export default async function UsuarioLayout({children}: {children: ReactNode}) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}