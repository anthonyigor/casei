import Sidebar from "../components/sidebar/Sidebar"

interface ConviteLayoutProps {
    children: React.ReactNode
}

const ConviteLayout: React.FC<ConviteLayoutProps> = ({children}) => {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}

export default ConviteLayout