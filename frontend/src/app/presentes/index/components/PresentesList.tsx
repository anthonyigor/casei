'use client'

import { useState } from "react"
import ReactPaginate from "react-paginate"
import PresentesItem from "./PresentesItem"

type Presente = {
    id: string
    nome: string
    descricao?: string
    selecionado?: boolean
    image?: string
    valor?: number
    convidado?: Convidado
}

type Convidado = {
    id: string
    nome: string
    telefone: string
}

interface PresentesListProps {
    presentes: Presente[]
}


const PresentesList: React.FC<PresentesListProps> = ({
    presentes
}) => {
    const [pageNumber, setPageNumber] = useState(0)
    const guestsPerPage = 10
    const pagesVisited = pageNumber * guestsPerPage

    const displayGuests = presentes
        .slice(pagesVisited, pagesVisited + guestsPerPage)
        .map((presente, index) => (
            <PresentesItem
                id={presente.id}
                index={index + 1}
                nome={presente.nome}
                key={presente.id}
                descricao={presente.descricao}
                image={presente.image}
                selecionado={presente.selecionado}
                valor={presente.valor}
                convidado={presente.convidado?.nome}
            />
        ));

    const pageCount = Math.ceil(presentes.length / guestsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-8 mt-5">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Descrição</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Imagem</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Valor</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Selecionado?</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Escolhido por</th>
                        <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Editar</th>
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

export default PresentesList