'use client'

import Button from "@/app/components/Button"
import ConvidadosList from "./ConvidadosList"

interface BodyProps {
    convidados: any[]
}

const Body: React.FC<BodyProps> = ({ convidados }) => {
    return (
        <>
            <div className="text-2xl font-semibold text-center mt-4">
                Convidados
            </div>
            <div className="fixed top-0 right-0 m-4">
                <Button type="button">
                    Adicionar
                </Button>
            </div>
            <div className="lg:pl-40 h-full lg:block mt-4">
                <ConvidadosList convidados={convidados}/>
            </div>
        </>
)
}

export default Body