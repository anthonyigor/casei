'use client'

import clsx from "clsx"

interface convidadosItemProps {
    nome: string
    quant_familia?: number
    confirmado?: boolean
    telefone?: string
}

const ConvidadosItem: React.FC<convidadosItemProps> = ({
    nome,
    quant_familia,
    confirmado,
    telefone
}) => {
    return (
        <tr>
            <td className="py-4 px-6 border-b border-gray-200">{nome}</td>
            <td className="py-4 px-6 border-b border-gray-200 truncate">{quant_familia}</td>
            <td className="py-4 px-6 border-b border-gray-200">{telefone}</td>
            <td className="py-4 px-6 border-b border-gray-200">
                <span className={clsx(`
                    py-1 
                    px-2 
                    rounded-full 
                    text-xs
                    text-white`,
                    confirmado ? 'bg-green-500' : 'bg-red-500'
                    )}>
                        {confirmado ? (
                            'Sim'
                        ) : (
                            'Não'
                        )}
                    </span>
            </td>
        </tr>
    )
}

export default ConvidadosItem