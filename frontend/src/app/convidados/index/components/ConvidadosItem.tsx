'use client'

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { FaUserEdit } from "react-icons/fa"

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

    const handleIconClick = (e: any) => {
        router.push(`/convidados/${id}/editar`)
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
        </tr>
    )
}

export default ConvidadosItem;