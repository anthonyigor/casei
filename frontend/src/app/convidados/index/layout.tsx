import Sidebar from "../../components/sidebar/Sidebar";

export default async function ConvidadosLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <>
        <Sidebar>
            {children}
        </Sidebar>
        </>
    )
}