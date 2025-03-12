'use client'

import axios from "axios"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react"

interface presentesItemProps {
    id: string
    nome: string
    descricao?: string
    selecionado?: boolean
    image?: string
    valor?: number
    convidado?: string
    index: number
    onDeletePresente: () => void
}

const PresentesItem: React.FC<presentesItemProps> = ({
    nome,
    descricao,
    selecionado,
    image,
    valor,
    convidado,
    index,
    id,
    onDeletePresente
}) => {
    const router = useRouter();
    const session = useSession()
    const [showMenu, setShowMenu] = useState(false);

    const handleIconClick = () => {
        router.push(`/presentes/${id}/editar`)
    }

    const handleDeleteClick = async() => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este presente?')
        
        if (!confirmDelete) {
            return
        }

        try {
            if (session.data?.user) {
                const userId = (session.data.user as any).id
                const token = (session.data.user as any).token
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    onDeletePresente()
                    toast.success('Presente deletado com sucesso!')
                }
            }

        } catch (error) {
            toast.error('Erro ao deletar presente!')
        }

    }

    return (
        <tr>
            <td className="py-4 px-6 border-b border-gray-200">{index}</td>
            <td className="py-4 px-6 border-b border-gray-200">{nome}</td>
            <td className="py-4 px-6 border-b border-gray-200 truncate hidden sm:table-cell">{descricao}</td>
            <td className="py-4 px-6 border-b border-gray-200 hidden sm:table-cell"><img src={image || '/img/presentes.png'} alt="Imagem" width={60} height={60}/></td>
            <td className="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">R${valor?.toFixed(2)}</td>
            <td className="py-4 px-6 border-b border-gray-200">
                <span className={clsx(`
                    py-1 
                    px-2 
                    rounded-full 
                    text-xs
                    text-white`,
                    selecionado ? 'bg-green-500' : 'bg-red-500'
                    )}>
                        {selecionado ? 'Sim' : 'Não'}
                    </span>
            </td>
            <td className="py-4 px-6 border-b border-gray-200 hidden sm:table-cell">{selecionado ? convidado : '-'}</td>
            <td className="py-4 px-6 border-b border-gray-200 hidden sm:table-cell"><FaEdit size={20} onClick={handleIconClick} style={{ cursor: 'pointer' }}/></td>
            <td className="py-4 px-6 border-b border-gray-200 hidden sm:table-cell"><FaRegTrashAlt size={20} onClick={handleDeleteClick} style={{ cursor: 'pointer' }}/></td>
            <td className="py-4 px-6 border-b border-gray-200 table-cell sm:hidden relative">
                <SlOptionsVertical 
                    size={20} 
                    onClick={() => setShowMenu(!showMenu)} 
                    style={{ cursor: 'pointer' }}
                />
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    handleIconClick();
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <FaEdit className="mr-2" /> Editar
                            </button>
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    handleDeleteClick();
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                            >
                                <FaRegTrashAlt className="mr-2" /> Deletar
                            </button>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    )
}

export default PresentesItem