'use client'

import clsx from "clsx"

interface presentesItemProps {
    nome: string
    descricao?: string
    selecionado?: boolean
    image?: string
    valor?: number
    convidado_id?: string
}

const PresentesItem: React.FC<presentesItemProps> = ({
    nome,
    descricao,
    selecionado,
    image,
    valor,
    convidado_id
}) => {
    return (
        <tr>
            <td className="py-4 px-6 border-b border-gray-200">{nome}</td>
            <td className="py-4 px-6 border-b border-gray-200 truncate">{descricao}</td>
            <td className="py-4 px-6 border-b border-gray-200">{image}</td>
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
        </tr>
    )
}

export default PresentesItem