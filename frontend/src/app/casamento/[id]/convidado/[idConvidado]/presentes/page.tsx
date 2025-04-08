'use client'

import { Great_Vibes } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { Presente, UserCasamento } from "@/types";
import { useRouter } from "next/navigation";
import SelectPresenteModal from "./components/SelectPresenteModal";
import CreateNewPresente from "./components/CreateNewPresente";

interface IParams {
    id: string;
    idConvidado: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const Casamento = ({ params }: { params: IParams }) => {
    const [gifts, setGifts] = useState<Presente[]>()
    const [selectedGift, setSelectedGift] = useState<Presente>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isCreateNewPresenteOpen, setIsCreateNewPresenteOpen] = useState<boolean>(false)
    const router = useRouter();

    const fetchGifts = async (userId: string) => {
        try {
            const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/disponiveis`);
            setGifts(response.data);
        } catch (error) {
            router.push('/error');  
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchGifts(params.id);
        }
    }, [params.id]);

    return (
        <div className="relative flex flex-col items-center min-h-screen">

            {/* Background com camada de sobreposição */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: "url('/img/background-lista.jpg')" }}>
                <div className="absolute inset-0 bg-slate-100 bg-opacity-100 "></div>
            </div>
            
            {isModalOpen && <SelectPresenteModal convidadoId={params.idConvidado} userId={params.id} presente={selectedGift!} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReloadGifts={() => fetchGifts(params.id)} />}
            {isCreateNewPresenteOpen && <CreateNewPresente isOpen={isCreateNewPresenteOpen} onClose={() => setIsCreateNewPresenteOpen(false)} userId={params.id} convidadoId={params.idConvidado}/>}
            
            {/* Conteúdo principal, garantindo que fique acima do background */}
            <div className="mt-4 relative z-10 flex flex-col items-center w-full">
                <div className={greatVibes.className}>
                    <h1 className="text-5xl font-semibold text-violet-600">Lista de presentes</h1>
                </div>
                <div className="m-3">
                    <p className="text-violet-600 font-semibold italic">Deseja dar algum presente que não está na lista? <button className="text-violet-500 italic underline hover:text-violet-500" onClick={() => setIsCreateNewPresenteOpen(true)}>Clique aqui</button></p>
                </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-5xl">
                    {gifts?.map((gift) => (
                        <div key={gift.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                            <img src={gift.image} alt={gift.nome} className="w-full h-24 object-contain rounded-md mb-4"/>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{gift.nome}</h3>
                            {gift.descricao && <p className="text-sm text-gray-500 mb-4">{gift.descricao}</p>}
                            <button
                                className="w-full py-2 text-white rounded-lg bg-violet-500 hover:bg-violet-700"
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setSelectedGift(gift)
                                }}
                            >
                                Selecionar
                            </button>
                        </div>
                    ))}
               </div>
            </div>

        </div>
    )
}

export default Casamento;
