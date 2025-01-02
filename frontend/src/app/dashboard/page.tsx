'use client'

import { Great_Vibes } from "next/font/google";
import CardDashboard from "./components/CardDashboard";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const Dashboard = () => {
    return (
        <>
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Dashboard</h2>
            </div>
            <div className="xl:ml-28 grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                <CardDashboard title="Data Casamento" value="17/10/25" imagePath="/img/data_dashboard.png"/>
                <CardDashboard title="Dias restantes" value="35" imagePath="/img/data_dashboard.png"/>
                <CardDashboard title="Total convidados" value="182" imagePath="/img/convidado_dashboard.png"/>
                <CardDashboard title="Confirmados" value="120" imagePath="/img/confirmado_dashboard.png"/>
            </div>
        </>
    )
}

export default Dashboard