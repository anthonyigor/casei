'use client'

import { useState } from "react"
import ConvidadosItem from "./ConvidadosItem"
import ReactPaginate from "react-paginate"
import { FaSearch } from "react-icons/fa"

interface ConvidadosListProps {
    convidados: any[]
}

const ConvidadosList: React.FC<ConvidadosListProps> = ({
    convidados
}) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [search, setSearch] = useState('')
    const guestsPerPage = 10
    const pagesVisited = pageNumber * guestsPerPage

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
            />
        ));

    const pageCount = Math.ceil(convidados.length / guestsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

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
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Familiares</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden md:table-cell">Telefone</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase md:table-cell">Confirmado</th>
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Editar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {displayGuests}
                    </tbody>
                </table>
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