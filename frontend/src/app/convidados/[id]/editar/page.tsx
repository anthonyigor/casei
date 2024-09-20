'use client'

import Button from "@/app/components/Button";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";

interface IParams {
    id: string;
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const EditarConvidado = ({ params }: { params: IParams }) => {
    const router = useRouter()

    return (
        <>  
        <div className={greatVibes.className}>
            <h2 className="text-4xl text-center mt-4 text-teal-600 font-semibold py-2">Editar convidado</h2>
        </div>
        <div className="fixed top-0 left-48 m-4">
                <Button type="button" onClick={() => router.push('/convidados/index')}>
                    Voltar
                </Button>
        </div>
        {/* <ConvidadoForm /> */}
        </>
    )
}

export default EditarConvidado;