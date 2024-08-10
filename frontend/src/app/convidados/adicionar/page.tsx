'use client'

import ConvidadoForm from "@/app/components/forms/ConvidadoForm";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });       

const Convidados = () => {
    return (
        <>  
            <div className={greatVibes.className}>
                <h2 className="text-4xl text-center mt-4 text-teal-600 font-semibold py-2">Adicionar convidado</h2>
            </div>
            <ConvidadoForm />
        </>
    )
}

export default Convidados;