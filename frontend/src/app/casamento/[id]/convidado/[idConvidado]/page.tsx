'use client'

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCasamento } from "@/types";
import { useRouter } from "next/navigation";

interface IParams {
    id: string;
    idConvidado: string
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const Casamento = ({ params }: { params: IParams }) => {
    const [userCasamento, setUserCasamento] = useState<UserCasamento>()
    const router = useRouter();

    useEffect(() => {
        async function fetchUserCasamento(userId: string) {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/casamento`);
                setUserCasamento(response.data.user);
            } catch (error) {
                router.push('/error');  
            }
        }

        if (params.id) {
            fetchUserCasamento(params.id);
        }
    }, [params.id, router]); 

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            
            {/* Background com camada de sobreposição */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: "url('/img/background.jpg')" }}>
                <div className="absolute inset-0 bg-white bg-opacity-20 "></div>
            </div>

            {/* Conteúdo principal, garantindo que fique acima do background */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Título */}
                <div className={`${greatVibes.className} text-center mt-14`}>
                    <h1 className='text-5xl text-teal-800 font-semibold'>
                        {userCasamento?.nome} e {userCasamento?.nome_parceiro}
                    </h1>
                </div>

                {/* Envelope */}
                <div className="mt-12">
                    <button className="relative w-40 h-28 flex items-center justify-center bg-transparent rounded-lg shadow-lg">
                        <Image src='/img/envelope.png' alt="Envelope" width={160} height={160} />
                    </button>
                    <span className="text-gray-500 text-sm mx-6">Toque para abrir</span>
                </div>

                {/* Data */}
                <div className="text-center mt-6 text-gray-600">
                    <p className="text-2xl font-bold">{userCasamento?.data_casamento}</p>
                    <p className="text-lg">{userCasamento?.horario}</p>
                </div>

                {/* Opções */}
                <div className="flex justify-evenly flex-wrap w-full mt-8 gap-8">
                    <Item text="Local" icon='local' onClick={() => { }} />
                    <Item text={"Confirmar\nPresença"} icon='presenca' onClick={() => { }} />
                    <Item text="Convite" icon='convite' onClick={() => { }} />
                    <Item text="Presentes" icon='presentes' onClick={() => {
                        router.push(`/casamento/${params.id}/convidado/${params.idConvidado}/presentes`)
                    }} />
                </div>
            </div>

        </div>
    )
}

export default Casamento;
