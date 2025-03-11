'use client'

import Button from "@/app/components/Button";
import ConvidadoForm from "@/app/components/forms/ConvidadoForm";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });       

const Convidados = () => {
    const router = useRouter()
    return (
        <>  
        <div className={greatVibes.className}>
            <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Adicionar convidado</h2>
        </div>
        <div className="hidden lg:block fixed top-0 lg:left-48 m-4">
                <Button type="button" onClick={() => router.push('/convidados/index')}>
                    Voltar
                </Button>
        </div>
        <ConvidadoForm />
        </>
    )
}

export default Convidados;