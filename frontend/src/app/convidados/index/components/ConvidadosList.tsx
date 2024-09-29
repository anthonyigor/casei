'use client'

import { useState } from "react"
import ConvidadosItem from "./ConvidadosItem"
import ReactPaginate from "react-paginate"

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
        .map((convidado) => (
            <ConvidadosItem
                id={convidado.id}
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
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-8 mt-5">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
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