'use client'

import { Great_Vibes } from "next/font/google";
import PresentesList from "./components/PresentesList";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const url = process.env.NEXT_PUBLIC_BACKEND_URL

const Presentes = () => {
    const [presentes, setPresentes] = useState([])

    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token
            axios.get(`${url}/users/${userId}/presentes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setPresentes(response.data)
            })
            .catch(error => {
                toast.error('Erro ao buscar presentes')
            })
        }
    }, [session.data?.user])
    
    return (
       <>
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Presentes</h2>
            </div>
            <div className="fixed top-0 right-0 m-4">
                <Button type="button" onClick={() => router.push('/presentes/adicionar')}>
                    Adicionar
                </Button>
            </div>
            <div className="lg:pl-40 h-full lg:block mt-4">
                {presentes && (
                    <PresentesList presentes={presentes}/>
                )}
            </div>
       </>
    )
}

export default Presentes;