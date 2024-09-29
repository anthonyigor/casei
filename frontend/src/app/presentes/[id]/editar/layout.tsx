import Sidebar from "../../../components/sidebar/Sidebar";

export default async function PresentesEditLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}