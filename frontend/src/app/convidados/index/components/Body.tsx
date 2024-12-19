'use client'

import Button from "@/app/components/Button"
import ConvidadosList from "./ConvidadosList"
import { useRouter } from "next/navigation"

import { Great_Vibes } from "next/font/google";
import LoadingModal from "@/app/components/LoadingModal";
import { useState } from "react";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });   

interface BodyProps {
    convidados: any[]
}

const Body: React.FC<BodyProps> = ({ convidados }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onAddConvidado = () => {
        router.push('/convidados/adicionar');
        setIsLoading(true);
    };

    const router = useRouter();
    return (
        <>
            {isLoading && <LoadingModal />}
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">
                    Lista de Convidados
                </h2>
            </div>
            <div className="lg:pl-40 h-full lg:block mt-4">
                <ConvidadosList convidados={convidados} />
            </div>
            {/* Botão reposicionado para baixo da tabela */}
            <div className="flex justify-center mt-6">
                <Button type="button" onClick={onAddConvidado}>
                    Adicionar
                </Button>
            </div>
        </>
    );
};

export default Body;
