'use client'

import Modal from "@/app/components/Modal"
import { Presente } from "@/types";
import { Great_Vibes } from "next/font/google";
import { useState } from "react";
import { FaGifts } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import ConfirmPresenteModal from "./SelectPixModal";
import SelectPixModal from "./SelectPixModal";

interface SelectPresenteModalProps {
    isOpen: boolean;
    onClose: () => void;
    presente: Presente;
    userId: string;
    convidadoId: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const SelectPresenteModal: React.FC<SelectPresenteModalProps> = ({ isOpen, onClose, presente, userId, convidadoId }) => {
    const [isPixModalOpen, setIsPixModalOpen] = useState<boolean>(false)

    return (
        <>
        {isPixModalOpen && <SelectPixModal convidadoId={convidadoId} isOpen={isPixModalOpen} onClose={() => setIsPixModalOpen(false)} presente={presente} userId={userId}/>}
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className={greatVibes.className}>
                    <h1 className="text-4xl text-teal-800 font-semibold">Selecionar {presente.nome}</h1>
                </div>
                <p className="text-base text-slate-500 mt-2">Escolha uma forma de presentear o casal </p>
            </div>
            <div className="flex flex-row gap-3 mt-6 justify-center">
                <div className="flex flex-row gap-2 items-center bg-teal-600 rounded-md px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-teal-900">
                    <FaGifts className="h-6 w-6 text-white"/>
                    <p className="text-white text-base font-semibold">Comprar e entregar</p>
                </div>
                <div onClick={() => setIsPixModalOpen(true)}
                    className="flex flex-row gap-2 items-center bg-teal-600 rounded-md px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-teal-900">
                    <FaPix className="h-6 w-6 text-white"/>
                    <p className="text-white text-base font-semibold">Fazer pix</p>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default SelectPresenteModal;
