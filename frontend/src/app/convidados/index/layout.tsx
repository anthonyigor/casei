import getConvidadosByUser from "@/actions/getConvidadosByUser";
import Sidebar from "../../components/sidebar/Sidebar";

export default async function ConvidadosLayout({ children }: { children: React.ReactNode }) {
    const convidados = await getConvidadosByUser()
  
    return (
        <>
        <Sidebar>
            {children}
        </Sidebar>
        </>
    )
}