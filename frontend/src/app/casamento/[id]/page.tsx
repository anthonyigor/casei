'use client'

import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Item from "./components/Item";

interface IParams {
    id: string;
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });     

const Casamento = ({ params }: { params: IParams }) => {
    const userId = params.id;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            
            {/* Título */}
            <div className={`${greatVibes.className} text-center mt-8`}>
                <h1 className= 'text-5xl text-teal-600 font-semibold'>
                    José e Maria
                </h1>
            </div>

            {/* Envolope */}
            <div className="mt-8">
                <button className="relative w-40 h-28 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                    <Image src='/img/envelope.png' alt="Envelope" width={200} height={160}/>
                </button>
                <span className="text-gray-500 text-sm mx-6">Toque para abrir</span>
            </div>

            {/* Data */}
            <div className="text-center mt-6 text-gray-600">
                <p className="text-lg">SETEMBRO</p>
                <p className="text-2xl font-bold">15</p>
                <p className="text-lg">DOM | 16h00 | 2024</p>
            </div>

            {/* options */}
            <div className="flex justify-evenly w-full mt-8 px-10">
                <Item text="Local" icon='local' onClick={() => {}}/>
                <Item text="Confirmar presença" icon='presenca' onClick={() => {}}/>
                <Item text="Convite" icon='convite' onClick={() => {}}/>
                <Item text="Presentes" icon='presentes' onClick={() => {}}/>
            </div>

        </div>
    )
}

export default Casamento;
