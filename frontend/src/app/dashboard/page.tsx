'use client'

import { Great_Vibes } from "next/font/google";
import CardDashboard from "./components/CardDashboard";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const Dashboard = () => {
    const [userId, setUserId] = useState<string | null>(null)
    const session = useSession()

    useEffect(() => {
        if (session.data?.user) {
            setUserId((session.data?.user as any).id)
        }
    }, [session])

    return (
        <div className="xl:ml-28">
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                <CardDashboard title="Data Casamento" value="17/10/25" imagePath="/img/data_dashboard.png"/>
                <CardDashboard title="Dias restantes" value="35" imagePath="/img/data_dashboard.png"/>
                <CardDashboard title="Total convidados" value="182" imagePath="/img/convidado_dashboard.png"/>
                <CardDashboard title="Confirmados" value="120" imagePath="/img/confirmado_dashboard.png"/>
            </div>
            {userId && (
                <div className="flex flex-col gap-2 justify-center mt-4 lg:w-2/4 lg:mx-auto p-2">
                    <p className="text-base text-slate-500">Link para os convidados</p>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <input 
                            type="text"
                            readOnly
                            value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/casamento/${userId}`}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/casamento/${userId}`);
                                toast.success('Link copiado!');
                            }}
                            className="px-4 py-2 text-white rounded-lg bg-teal-500 hover:bg-teal-700"
                        >
                            Copiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard