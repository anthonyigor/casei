'use client'

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCasamento } from "@/types";
import { useRouter } from "next/navigation";
import AuthConvidadoForm from "./components/AuthConvidadoForm";

interface IParams {
    id: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const CasamentoHome = ({ params }: { params: IParams }) => {
    const [userCasamento, setUserCasamento] = useState<UserCasamento>()
    const router = useRouter();

    useEffect(() => {
        async function fetchUserCasamento(userId: string) {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`);
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

            {userCasamento && (
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-[#ECD1C2] sm:mx-auto sm:w-full sm:max-w-xs rounded-md px-3">
                        <div className={greatVibes.className}>
                            <h2 className="text-3xl text-teal-600 font-semibold py-2 text-center">Bem vindo(a) ao casamento de {userCasamento?.nome} e {userCasamento?.nome_parceiro}!</h2>
                            <p className="mt-4 text-lg text-teal-600 text-center font-semibold">Informe seu nome e telefone para te identificarmos 😉</p>
                        </div>
                        <AuthConvidadoForm />
                    </div>
                </div>
            )}

        </div>
    )
}

export default CasamentoHome;
