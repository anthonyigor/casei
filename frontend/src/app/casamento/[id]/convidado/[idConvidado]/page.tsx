'use client'

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import { Convidado, UserCasamento } from "@/types";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/LoadingModal";
import ConfirmarPresencaModal from "./components/ConfirmarPresencaModal";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

interface IParams {
    id: string;
    idConvidado: string
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const Casamento = ({ params }: { params: IParams }) => {
    const [userCasamento, setUserCasamento] = useState<UserCasamento>()
    const [convidado, setConvidado] = useState<Convidado>()
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmarModalOpen, setIsConfirmarModalOpen] = useState(false);
    const router = useRouter();
    const session = useSession()

    useEffect(() => {
        async function fetchUserCasamento(userId: string) {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/casamento`);
                setUserCasamento(response.data.user);
            } catch (error) {
                router.push('/error');  
            } finally {
                setIsLoading(false);
            }
        }

        async function fetchConvidado(userId: string, convidadoId: string, token: string) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/${convidadoId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setConvidado(response.data);
            } catch (error) {
                toast.error('Erro ao buscar convidado')
            }
        }

        if (params.id && session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token
            fetchUserCasamento(params.id);
            fetchConvidado(userId, params.idConvidado, token);
        }
    }, [params.id, router, params.idConvidado, session]);

    return (
        <>
        {isLoading && <LoadingModal />}
        {isConfirmarModalOpen && <ConfirmarPresencaModal isOpen={isConfirmarModalOpen} onClose={() => setIsConfirmarModalOpen(false)} userId={params.id} convidadoId={params.idConvidado}/>}
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

                    {convidado?.confirmado && 
                    <div className="mt-4 flex flex-row items-center gap-2">
                        <p className="text-lg">Você já confirmou sua presença nesse evento!</p>
                        <FaCheck className="w-5 h-5 text-green-600"/>
                    </div>
                    }
                </div>

                {/* Opções */}
                <div className="flex justify-evenly flex-wrap w-full mt-8 gap-8">
                    <Item text="Local" icon='local' onClick={() => { }} />
                    {!convidado?.confirmado && <Item text={"Confirmar\nPresença"} icon='presenca' onClick={() => {
                        setIsConfirmarModalOpen(true)
                    }} />}
                   
                    <Item text="Convite" icon='convite' onClick={() => { }} />
                    <Item text="Presentes" icon='presentes' onClick={() => {
                        setIsLoading(true)
                        router.push(`/casamento/${params.id}/convidado/${params.idConvidado}/presentes`)
                    }} />
                </div>
            </div>

        </div>
        </>
    )
}

export default Casamento;
