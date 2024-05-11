import getConvidadosByUser from "@/actions/getConvidadosByUser";
import Sidebar from "../../components/sidebar/Sidebar";
import Body from "./components/Body";

export default async function ConvidadosLayout({ children }: { children: React.ReactNode }) {
    const convidados = await getConvidadosByUser()
  
    return (
        <>
        <Body convidados={convidados}/>
        <Sidebar>
            {children}
        </Sidebar>
        </>
    )
}