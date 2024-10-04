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
    const guestsPerPage = 10
    const pagesVisited = pageNumber * guestsPerPage

    const displayGuests = convidados
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
            <div className="relative w-[500px] mx-auto">
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
                    placeholder="Pesquisar"
                />
                <FaSearch className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"/>
            </div>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden mx-16 mt-5">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Familiares</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Telefone</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Confirmado</th>
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">Editar</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {displayGuests}
                </tbody>
            </table>
            <div className="pagination-container mt-4 flex justify-between items-center">
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Próximo'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />
            </div>
        </div>
        </>
    )
}

export default ConvidadosList