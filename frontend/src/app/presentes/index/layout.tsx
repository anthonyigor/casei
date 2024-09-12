import Sidebar from "@/app/components/sidebar/Sidebar"

export default async function PresentesLayout({ children }: {children: React.ReactNode}) {

    return (
        <>
            <Sidebar>
                {children}
            </Sidebar>
        </>
    )

}