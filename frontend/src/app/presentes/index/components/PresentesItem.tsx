'use client'

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { FaEdit } from "react-icons/fa"

interface presentesItemProps {
    id: string
    nome: string
    descricao?: string
    selecionado?: boolean
    image?: string
    valor?: number
    convidado?: string
    index: number
}

const PresentesItem: React.FC<presentesItemProps> = ({
    nome,
    descricao,
    selecionado,
    image,
    valor,
    convidado,
    index,
    id
}) => {
    const router = useRouter();

    const handleIconClick = () => {
        router.push(`/presentes/${id}/editar`)
    }

    return (
        <tr>
            <td className="py-4 px-6 border-b border-gray-200">{index}</td>
            <td className="py-4 px-6 border-b border-gray-200">{nome}</td>
            <td className="py-4 px-6 border-b border-gray-200 truncate">{descricao}</td>
            <td className="py-4 px-6 border-b border-gray-200"><img src={image} alt="Imagem" width={60} height={60}/></td>
            <td className="py-4 px-6 border-b border-gray-200">R${valor?.toFixed(2)}</td>
            <td className="py-4 px-6 border-b border-gray-200">
                <span className={clsx(`
                    py-1 
                    px-2 
                    rounded-full 
                    text-xs
                    text-white`,
                    selecionado ? 'bg-green-500' : 'bg-red-500'
                    )}>
                        {selecionado ? (
                            'Sim'
                        ) : (
                            'Não'
                        )}
                    </span>
            </td>
            <td className="py-4 px-6 border-b border-gray-200">{selecionado ? convidado : '-'}</td>
            <td className="py-4 px-6 border-b border-gray-200"><FaEdit size={20} onClick={handleIconClick} style={{ cursor: 'pointer' }}/></td>
        </tr>
    )
}

export default PresentesItem