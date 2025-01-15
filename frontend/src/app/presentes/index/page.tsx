'use client'

import { Great_Vibes } from "next/font/google";
import PresentesList from "./components/PresentesList";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingModal from "@/app/components/LoadingModal";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const url = process.env.NEXT_PUBLIC_BACKEND_URL

const Presentes = () => {
    const [presentes, setPresentes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const session = useSession()

    const onAddPresente = () => {
        router.push('/presentes/adicionar')
        setIsLoading(true)
    }

    async function fetchPresentes() {
        const userId = (session?.data?.user as any).id
        const token = (session?.data?.user as any).token
        axios.get(`${url}/users/${userId}/presentes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setPresentes(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            toast.error('Erro ao buscar presentes')
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (session.data?.user) {
            fetchPresentes()
        }
    }, [session.data?.user])
    
    return (
       <>
            {isLoading && <LoadingModal />}     
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Lista de Presentes</h2>
            </div>
            <div className="lg:pl-40 h-full lg:block mt-4">
                {presentes && (
                    <PresentesList presentes={presentes} onRefresh={() => fetchPresentes()}/>
                )}
            </div>
            <div className="flex justify-center mt-6">
                <Button type="button" onClick={onAddPresente}>
                    Adicionar
                </Button>
            </div>
       </>
    )
}

export default Presentes;