'use client'

import Button from "@/app/components/Button";
import PresenteForm from "@/app/components/forms/PresenteForm";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });       

const Convidados = () => {
    const router = useRouter()
    return (
        <>  
        <div className={greatVibes.className}>
            <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Adicionar presente</h2>
        </div>
        <div className="fixed top-0 left-48 m-4">
                <Button type="button" onClick={() => router.push('/presentes/index')}>
                    Voltar
                </Button>
        </div>
        <PresenteForm />
        </>
    )
}

export default Convidados;