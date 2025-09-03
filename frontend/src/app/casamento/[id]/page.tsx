'use client'

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
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
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Memoizar a função de redirecionamento para evitar que o router seja dependência
    const redirectToError = useCallback(() => {
        router.push('/error');
    }, [router]);

    useEffect(() => {
        let isMounted = true;

        async function fetchUserCasamento(userId: string) {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/casamento`);
                
                if (isMounted) {
                    setUserCasamento(response.data.user);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error: any) {
                
                if (isMounted) {
                    setError('Erro ao carregar dados do casamento');
                    setIsLoading(false);
                    
                    // Redirecionar após um delay
                    setTimeout(() => {
                        if (isMounted) {
                            redirectToError();
                        }
                    }, 2000);
                }
            }
        }

        if (params?.id) {
            fetchUserCasamento(params.id);
        } else {
            setError('ID do casamento não fornecido');
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [params?.id, redirectToError]); // Agora usando a função memoizada

    // Loading state
    if (isLoading) {
        return (
            <div className="relative flex flex-col items-center justify-center min-h-screen">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: "url('/img/background.jpg')" }}>
                    <div className="absolute inset-0 bg-violet-100 bg-opacity-40"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-violet-200 sm:mx-auto sm:w-full sm:max-w-xs rounded-md px-3 py-6">
                        <p className="text-center text-violet-700">Carregando...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="relative flex flex-col items-center justify-center min-h-screen">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-cover z-0" style={{ backgroundImage: "url('/img/background.jpg')" }}>
                    <div className="absolute inset-0 bg-violet-100 bg-opacity-40"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-red-200 sm:mx-auto sm:w-full sm:max-w-xs rounded-md px-3 py-6">
                        <p className="text-center text-red-700">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm w-full"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                            <h2 className="text-3xl text-violet-700 font-semibold py-2 text-center">
                                Bem vindo(a) ao casamento de {userCasamento?.nome} e {userCasamento?.nome_parceiro}!
                            </h2>
                            <p className="mt-4 text-lg text-violet-700 text-center font-semibold">
                                Informe seu nome e telefone para te identificarmos 😉
                            </p>
                        </div>
                        <AuthConvidadoForm userId={params.id}/>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CasamentoHome;