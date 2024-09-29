'use client'

import { Presente } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IParams {
    id: string;
}

const EditarPresente = ({ params }: { params: IParams }) => {
    const { id } = params;
    const [presente, setPresente ] = useState<Presente>()
    const session = useSession();

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

    console.log(presente)

    return (
        <div>
            <h1>Editar Presente</h1>
            <p>{presente?.nome}</p>
        </div>
    )
}

export default EditarPresente;