'use client'

import ConvidadosItem from "./ConvidadosItem"

interface ConvidadosListProps {
    convidados: any[]
}

const ConvidadosList: React.FC<ConvidadosListProps> = ({
    convidados
}) => {
    return (
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-8 mt-5">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Familiares</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Telefone</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Confirmado</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                {convidados.map((convidado) => (
                    <ConvidadosItem nome={convidado.nome} key={convidado.id} confirmado={convidado.confirmado} quant_familia={convidado.quant_familia} telefone={convidado.telefone}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ConvidadosList