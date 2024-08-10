'use client'

import Button from "@/app/components/Button"
import ConvidadosList from "./ConvidadosList"
import { useRouter } from "next/navigation"

import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });   

interface BodyProps {
    convidados: any[]
}

const Body: React.FC<BodyProps> = ({ convidados }) => {
    const router = useRouter()
    return (
        <>
            <div className={greatVibes.className}>
                <h2 className="text-4xl text-center mt-4 text-teal-600 font-semibold py-2">Convidados</h2>
            </div>
            <div className="fixed top-0 right-0 m-4">
                <Button type="button" onClick={() => router.push('/convidados/adicionar')}>
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