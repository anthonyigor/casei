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
        let isMounted = true

        async function fetchUserCasamento(userId: string) {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/casamento`);
                if (isMounted) setUserCasamento(response.data.user);
            } catch (error) {
                if (isMounted) router.push('/error');  
            }
        }

        if (params.id) {
            fetchUserCasamento(params.id);
        }

        return () => {
            isMounted = false;
        };
    }, [params.id, router]); 

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            
            {/* Background com camada de sobreposição */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: "url('/img/background.jpg')" }}>
                <div className="absolute inset-0 bg-violet-100 bg-opacity-40 "></div>
            </div>

            {userCasamento && (
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-violet-200 sm:mx-auto sm:w-full sm:max-w-xs rounded-md px-3">
                        <div className={greatVibes.className}>
                            <h2 className="text-3xl text-violet-700 font-semibold py-2 text-center">Bem vindo(a) ao casamento de {userCasamento?.nome} e {userCasamento?.nome_parceiro}!</h2>
                            <p className="mt-4 text-lg text-violet-700 text-center font-semibold">Informe seu nome e telefone para te identificarmos 😉</p>
                        </div>
                        <AuthConvidadoForm userId={params.id}/>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CasamentoHome;
