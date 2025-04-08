'use client'

import Button from "@/app/components/Button";
import EditarPresenteForm from "@/app/components/forms/EditarPresenteForm";
import { Presente } from "@/types";
import { useSession } from "next-auth/react";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IParams {
    id: string;
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const EditarPresente = ({ params }: { params: IParams }) => {
    const { id } = params;
    const [presente, setPresente ] = useState<Presente>()
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        async function fetchPresente(userId: string, token: string) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) {
                toast.error('Erro ao buscar presente')
            }
            let data = await res.json()
            setPresente(data)
        }

        if (session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token
            fetchPresente(userId, token)
        }
    }, [id, session])

    return (
        <>
         <div className={greatVibes.className}>
            <h2 className="text-5xl text-center mt-4 text-violet-600 font-semibold py-2">Editar presente</h2>
        </div>
        <div className="hidden lg:block fixed top-0 lg:left-48 m-4">
                <Button type="button" onClick={() => router.push('/presentes/index')}>
                    Voltar
                </Button>
        </div>
        {presente && <EditarPresenteForm presente={presente!}/>}
        </>
    )
}

export default EditarPresente;