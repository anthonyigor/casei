'use client'

import { Great_Vibes } from "next/font/google";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingModal from "@/app/components/LoadingModal";
import ConvidadosList from "./components/ConvidadosList";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const url = process.env.NEXT_PUBLIC_BACKEND_URL

const Convidados = () => {
    const [convidados, setConvidados] = useState([])
    const [userCasamento, setUserCasamento] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const session = useSession()

    const onAddConvidado = () => {
        router.push('/convidados/adicionar')
        setIsLoading(true)
    }

    async function fetchConvidados() {
        const userId = (session?.data?.user as any).id
        const token = (session?.data?.user as any).token
        axios.get(`${url}/users/${userId}/convidados`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setConvidados(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            toast.error('Erro ao buscar presentes')
            setIsLoading(false)
        })
    }

    async function fetchUserCasamento() {
        const userId = (session?.data?.user as any).id
        const token = (session?.data?.user as any).token
        
        axios.get(`${url}/users/${userId}/casamento`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUserCasamento(response.data.user)
            setIsLoading(false)
        })
        .catch(error => {
            toast.error('Erro ao buscar informacões do casamento')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (session.data?.user) {
            fetchConvidados()
            fetchUserCasamento()
        }
    }, [session.data?.user])
    
    return (
       <div className="relative min-h-screen">
            {isLoading && <LoadingModal />}     
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-[#646443] font-semibold py-2">Lista de Convidados</h2>
            </div>
            <div className="flex justify-center my-4">
                <Button type="button" onClick={onAddConvidado}>
                    Adicionar
                </Button>
            </div>
            <div className="lg:pl-40 h-full lg:block">
                {convidados && (
                    <ConvidadosList convidados={convidados} user={userCasamento} onRefresh={() => fetchConvidados()}/>
                )}
            </div>
       </div>
    )
}

export default Convidados;