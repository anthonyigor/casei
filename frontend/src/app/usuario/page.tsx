'use client'

import Button from "@/app/components/Button";
import EditarConvidadoForm from "@/app/components/forms/EditarConvidadoForm";
import { Convidado, User } from "@/types";
import { useSession } from "next-auth/react";
import { Great_Vibes } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import EditarUsuarioForm from "../components/forms/EditarUsuarioForm";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const Usuario = () => {
    const [usuario, setUsuario] = useState<User>()
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchUsuario(userId: string, token: string) {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) {
                toast.error('Erro ao buscar usuario')
            }
            
            let data = await res.json()
            setUsuario(data.user)
        }
        
        if (session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token
            fetchUsuario(userId, token)
        }

    }, [session])

    return (
        <>  
        <div className={greatVibes.className}>
            <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Editar Usuario</h2>
        </div>
        <div className="hidden lg:block fixed top-0 lg:left-48 m-4">
                <Button type="button" onClick={() => router.push('/convidados/index')}>
                    Voltar
                </Button>
        </div>
        </>
    )
}

export default Usuario;
