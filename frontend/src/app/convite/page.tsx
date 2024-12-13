'use client'

import { Convidado } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Great_Vibes } from "next/font/google";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });  

const Convite = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [convidados, setConvidados] = useState<Convidado[] | null>(null)
    const [convidadosSelecionados, setConvidadosSelecionados] = useState<string[]>([])
    const session = useSession()

    useEffect(() => {
        async function getConvidados(userId: string, token: string) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setConvidados(response.data)
            } catch (error: any) {
                toast.error(`Erro ao carregar lista de contatos ${error.response.data}`)
            }
        }

        if (session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token

            getConvidados(userId, token)
        }
    }, [session])

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0])
    } 

    const toggleConvidadoSelection = (id: string) => {
        if (convidadosSelecionados.includes(id)) {
            setConvidadosSelecionados(convidadosSelecionados.filter(convidadoId => convidadoId !== id))
        } else {
            setConvidadosSelecionados([...convidadosSelecionados, id])
        }
    }

    return (
        <>
            <div className={greatVibes.className}>
                <h2 className="text-5xl text-center mt-4 text-teal-600 font-semibold py-2">Gerenciador de Convite</h2>
            </div>
            <div className="max-w-4xl mx-auto mt-8 p-4 border rounded shadow-lg">
                <label className="block mb-4">
                    <span className="text-lg font-semibold text-gray-600">Faça upload do arquivo PDF do convite:</span>
                    <input 
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="block mt-2 w-full px-4 py-2 border rounded text-gray-700"
                    />
                </label>
                <h4 className="text-lg font-semibold text-gray-600 mt-8 mb-4">Envie para seus contatos</h4>
                <ul className="divide-y divide-gray-200">
                    {convidados?.map(convidado => (
                        <li key={convidado.id} className="flex items-center justify-between py-2">
                            <span className="text-gray-800">{convidado.nome} - {convidado.telefone}</span>
                            <input 
                                type="checkbox"
                                checked={convidadosSelecionados.includes(convidado.id)}
                                onChange={() => toggleConvidadoSelection(convidado.id)}
                                className="w-5 h-5"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Convite