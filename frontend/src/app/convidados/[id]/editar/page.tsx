'use client'

import Button from "@/app/components/Button";
import EditarConvidadoForm from "@/app/components/forms/EditarConvidadoForm";
import { Convidado } from "@/types";
import { useSession } from "next-auth/react";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IParams {
    id: string;
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const EditarConvidado = ({ params }: { params: IParams }) => {
    const { id } = params
    const [convidado, setConvidado] = useState<Convidado>()
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchConvidado(userId: string, convidadoId: string) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/${convidadoId}`)
            if (!res.ok) {
                toast.error('Erro ao buscar convidado')
            }
            
            let data = await res.json()
            setConvidado(data)
        }
        
        if (session.data?.user) {
            const userId = (session.data.user as any).id
            fetchConvidado(userId, id)
        }

    }, [id, session])

    return (
        <>  
        <div className={greatVibes.className}>
            <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Editar convidado</h2>
        </div>
        <div className="fixed top-0 left-48 m-4">
                <Button type="button" onClick={() => router.push('/convidados/index')}>
                    Voltar
                </Button>
        </div>
        {convidado && <EditarConvidadoForm convidado={convidado!}/>}
        </>
    )
}

export default EditarConvidado;