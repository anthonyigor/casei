import Sidebar from "../../components/sidebar/Sidebar";

export default async function PresentesLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}