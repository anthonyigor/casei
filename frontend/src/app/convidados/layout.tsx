import getConvidadosByUser from "@/actions/getConvidadosByUser";
import Sidebar from "../components/sidebar/Sidebar";
import ConvidadosList from "./components/ConvidadosList";

export default async function ConvidadosLayout({ children }: { children: React.ReactNode }) {
    const convidados = await getConvidadosByUser()
  
    return (
        <>
        <div className="lg:pl-40 h-full lg:block mt-4">
            <div className="text-2xl font-semibold text-center">Convidados</div>
            <ConvidadosList convidados={convidados}/>
        </div>
        <Sidebar>
            {children}
        </Sidebar>
        </>
    )
}