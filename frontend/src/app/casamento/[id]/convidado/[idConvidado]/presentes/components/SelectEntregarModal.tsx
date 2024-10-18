'use client'

import Modal from "@/app/components/Modal";
import { Presente } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SelectEntregarModalProps {
    isOpen: boolean;
    onClose: () => void;
    presente: Presente;
    userId: string;
    convidadoId: string;
    onSelectComplete: () => void;
}

const SelectEntregarModal: React.FC<SelectEntregarModalProps> = ({ isOpen, onClose, presente, userId, convidadoId, onSelectComplete }) => {

    const selectPresente = async() => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${presente.id}/selecionar`, {
                convidadoId
            })
            toast.success(response.data.message)
            onSelectComplete();
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h1 className="text-3xl text-teal-800 font-semibold">Presentear {presente.nome} entregando pessoalmente</h1>
                <p className="text-base text-slate-500 mt-2">Abaixo veja uma sugestão do modelo do presente</p>
            </div>
            <div className="flex flex-row gap-3 mt-6 justify-center">
                <img src={presente.image} alt={presente.nome} className="w-24 h-24 object-cover rounded-md"/>
            </div>
            {presente.url_produto && (
                <div className="text-center mt-2">
                    <Link href={presente.url_produto} target="_blank"><button className="bg-rose-500 rounded-md px-2 py-1.5 text-base text-white hover:bg-rose-700">Compre aqui</button></Link>
                </div>
            )}
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                <button className="w-full py-2 text-white rounded-lg bg-teal-500 hover:bg-teal-700" onClick={selectPresente}>Confirmar</button>
            </div>
        </Modal>
    )
}

export default SelectEntregarModal;
