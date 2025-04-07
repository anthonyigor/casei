'use client'

import axios from "axios"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaTrash, FaUserEdit } from "react-icons/fa"

interface convidadosItemProps {
    id: string
    nome: string
    quant_familia?: number
    confirmado?: boolean
    telefone?: string
    index: number
}

const ConvidadosItem: React.FC<convidadosItemProps> = ({
    nome,
    quant_familia,
    confirmado,
    telefone,
    id,
    index
}) => {
    const router = useRouter();
    const session = useSession()

    const handleIconClick = (e: any) => {
        router.push(`/convidados/${id}/editar`)
    }

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este convidado?')

        if (!confirmDelete) {
            return
        }

        try {
            if (!session.data?.user) {
                return
            }

            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            toast.success(response.data.message)
        } catch (error: any) {
            toast.error(`Erro ao deletar convidado: ${error.response.data.message}`)
        }
    }

    return (
        <tr className="border-b border-gray-200">
            {/* ID sempre visível */}
            <td className="py-4 px-6">{index}</td>
            
            {/* Nome sempre visível */}
            <td className="py-4 px-6">{nome}</td>
            
            {/* Familiares visível apenas em telas médias ou maiores */}
            <td className="py-4 px-6 truncate hidden sm:table-cell">
                {quant_familia ?? '-'}
            </td>
            
            {/* Telefone visível apenas em telas médias ou maiores */}
            <td className="py-4 px-6 hidden md:table-cell">
                {telefone ?? 'N/A'}
            </td>
            
            {/* Confirmado com badge de cores */}
            <td className="py-4 px-6 md:table-cell">
                <span className={clsx(`
                    py-1 
                    px-2 
                    rounded-full 
                    text-xs
                    text-white`,
                    confirmado ? 'bg-green-500' : 'bg-red-500'
                )}>
                    {confirmado ? 'Sim' : 'Não'}
                </span>
            </td>
            
            {/* Ícone de edição sempre visível */}
            <td className="py-4 px-6">
                <FaUserEdit 
                    size={30} 
                    onClick={handleIconClick} 
                    style={{ cursor: 'pointer' }}
                />
            </td>

            <td className="py-4 px-6">
                <FaTrash 
                    size={20} 
                    onClick={handleDeleteClick} 
                    style={{ cursor: 'pointer' }}
                />
            </td>
        </tr>
    )
}

export default ConvidadosItem;