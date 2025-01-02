'use client'

interface CardDashboardProps {
    title: string,
    value: string,
    imagePath: string
}

const CardDashboard: React.FC<CardDashboardProps> = ({
    title,
    value,
    imagePath
}) => {
    return (
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
                <img src={imagePath} alt="Icone" className="h-10 w-14"/>
            </div>
            <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">{title}</h3>
                <p className="text-xl">{value}</p>
            </div>
        </div>
    );
}
 
export default CardDashboard;