'use client'

import { useState } from "react"
import ReactPaginate from "react-paginate"
import PresentesItem from "./PresentesItem"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next/navigation"

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
    onRefresh: () => void
}


const PresentesList: React.FC<PresentesListProps> = ({
    presentes,
    onRefresh
}) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [search, setSearch] = useState('')
    const giftsPerPage = 10
    const pagesVisited = pageNumber * giftsPerPage
    const router = useRouter()

    const filteredGifts = presentes.filter((presente) => 
        presente.nome.toLowerCase().includes(search.toLowerCase())
    )

    const displayGifts = filteredGifts
        .slice(pagesVisited, pagesVisited + giftsPerPage)
        .map((presente, index) => (
            <PresentesItem
                id={presente.id}
                index={pagesVisited + index + 1}
                nome={presente.nome}
                key={presente.id}
                descricao={presente.descricao}
                image={presente.image}
                selecionado={presente.selecionado}
                valor={presente.valor}
                convidado={presente.convidado?.nome}
                onDeletePresente={() => onRefresh()}
            />
        ));

    const pageCount = Math.ceil(presentes.length / giftsPerPage);

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
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Nome</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Descrição</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Imagem</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Valor</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Selecionado?</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Escolhido por</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Editar</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase hidden sm:table-cell">Deletar</th>
                            <th className="w-2/4 py-4 px-6 text-left text-gray-600 font-bold uppercase sm:hidden">Opções</th>
                        </tr>   
                    </thead>
                    <tbody className="bg-white">
                        {displayGifts}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container px-4 sm:px-0 mt-4 mb-6 flex justify-center items-center overflow-x-auto">
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
                    className="flex justify-center items-center space-x-2 sm:space-x-4 gap-2 text-sm sm:text-base"
                />
            </div>
        </div>
        </>
    )
}

export default PresentesList