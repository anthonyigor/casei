'use client'

import FormsInput from "@/app/components/inputs/FormsInput";
import Modal from "@/app/components/Modal"
import { Great_Vibes } from "next/font/google";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaGifts } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import CreateNewPresentePix from "./CreateNewPresentePix";

interface CreateNewPresenteProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    convidadoId: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const CreateNewPresente: React.FC<CreateNewPresenteProps> = ({ isOpen, onClose, userId, convidadoId }) => {
    const [isPixModalOpen, setIsPixModalOpen] = useState<boolean>(false)

    const { register } = useForm<FieldValues>()

    return (
        <>
        {isPixModalOpen && <CreateNewPresentePix nome='test'convidadoId={convidadoId} userId={userId} isOpen={isPixModalOpen} onClose={() => setIsPixModalOpen(false)}/>}
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className={greatVibes.className}>
                    <h1 className="text-4xl text-teal-800 font-semibold">Informe o que desejar dar ao casal</h1>
                </div>
                <p className="text-base text-slate-500 mt-2">Escolha uma forma de presentear</p>
            </div>
            <div className="mt-2">
                <form>
                    <FormsInput
                        id="name"
                        label="Nome"
                        required
                        type="text"
                        register={register}
                    />
                    <FormsInput
                        id="description"
                        label="Descrição"
                        type="text"
                        register={register}
                    />
                    <div className="flex flex-row gap-3 mt-6 justify-center">
                        <div onClick={() => {}}
                            className="flex flex-row gap-2 items-center bg-teal-600 rounded-md px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-teal-900">
                            <FaGifts className="h-6 w-6 text-white"/>
                            <p className="text-white text-base font-semibold">Comprar e entregar</p>
                        </div>
                        <div onClick={() => setIsPixModalOpen(true)}
                            className="flex flex-row gap-2 items-center bg-teal-600 rounded-md px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-teal-900">
                            <FaPix className="h-6 w-6 text-white"/>
                            <p className="text-white text-base font-semibold">Fazer pix</p>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
        </>
    )
}

export default CreateNewPresente;
