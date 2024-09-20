import Sidebar from "../../../components/sidebar/Sidebar";

export default async function ConvidadosEditLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}