'use client'

import { useState } from "react"
import ConvidadosItem from "./ConvidadosItem"
import ReactPaginate from "react-paginate"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { Convidado, Presente } from "@/types"
import axios from "axios"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

interface ConvidadosListProps {
    convidados: any[],
    onRefresh: () => void
}

const ConvidadosList: React.FC<ConvidadosListProps> = ({
    convidados,
    onRefresh
}) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [search, setSearch] = useState('')
    const guestsPerPage = 10
    const pagesVisited = pageNumber * guestsPerPage
    const router = useRouter()
    const session = useSession()

    const filteredGuests = convidados.filter((convidado) => 
        convidado.nome.toLowerCase().includes(search.toLowerCase())
    )

    const displayGuests = filteredGuests
        .slice(pagesVisited, pagesVisited + guestsPerPage)
        .map((convidado, index) => (
            <ConvidadosItem
                id={convidado.id}
                index={index + 1}
                nome={convidado.nome}
                key={convidado.id}
                confirmado={convidado.confirmado}
                quant_familia={convidado.quant_familia}
                telefone={convidado.telefone}
                onDeleteConvidado={() => onRefresh()}
            />
        ));

    const pageCount = Math.ceil(convidados.length / guestsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const handleDelete = async (convidadoId: string) => {

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

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/${convidadoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            toast.success(response.data.message)
            onRefresh()
        } catch (error: any) {
            toast.error(`Erro ao deletar convidado: ${error.response.data.message}`)
        }
    }

    return (
        <>
        <div className="text-center mt-8">
            <div className="relative w-1/2 mx-auto">
                <input type="text" 
                    className="
                    border-2
                    border-slate-200
                    rounded-md 
                    w-full 
                    h-[40px]
                    px-10
                    focus: outline-none
                    focus:border-slate-600"
                    placeholder="Pesquise por nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"/>
            </div>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 sm:mx-16 mt-5">
            {/* Container que permite rolagem horizontal */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Familiares</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden md:table-cell">Telefone</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase md:table-cell">Confirmado</th>
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Editar</th>
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Deletar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {displayGuests}
                    </tbody>
                </table>
            </div>
            {/* Mobile View */}
            <div className="lg:hidden px-4 mt-4 space-y-4">
                {filteredGuests
                    .slice(pagesVisited, pagesVisited + guestsPerPage)
                    .map((convidado, index) => (
                        <div key={convidado.id} className="border rounded-lg p-4 shadow-sm">
                            <p className="font-bold text-lg">{convidado.nome}</p>
                            <p className="text-sm mt-1">✅ Confirmado: {convidado.confirmado ? 'Sim' : 'Não'}</p>
                            <p className="text-sm mt-1">👨‍👩‍👧‍👦 Família: {convidado.quant_familia}</p>
                            <p className="text-sm mt-1">📞 Telefone: {convidado.telefone}</p>
                            <p className="text-sm mt-1">🎁 Presentes: {convidado.presentes?.map((presente: Presente) => (
                                `${presente.nome}; `
                            ))}</p>
                            <div className="flex justify-end gap-4 mt-3">
                                <button
                                    className="text-blue-500"
                                    onClick={() => {
                                        // Navegar para editar (exemplo)
                                        router.push(`/convidados/${convidado.id}/editar`)
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => {
                                        handleDelete(convidado.id)
                                    }}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {/* Paginação */}
            <div className="pagination-container mt-4 flex justify-center items-center mb-2">
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Próximo'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'border-2 px-1.5 border-slate-300 rounded-md'}
                    className="flex justify-center items-center space-x-4 gap-2"
                />
            </div>
        </div>

        </>
    )
}

export default ConvidadosList