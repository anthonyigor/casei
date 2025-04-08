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
    const [isProductSelected, setIsProductSelected] = useState<boolean>(false)

    const selectPresente = async() => {
        const confirm = window.confirm('Deseja confirmar a seleção do presente?')
        if (!confirm) return;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${presente.id}/selecionar`, {
                convidadoId,
                tipo_selecao: 'entregar'
            })

            setIsProductSelected(true);
            onSelectComplete();
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={() => {
            if (!isProductSelected) {
                const confirm = window.confirm('Você não marcou o presente como selecionado. Deseja desistir e escolher outro?')
                if (confirm) {
                    onClose();
                }
                else {
                    window.alert('Clique no botão "Confirmar" para selecionar o presente')
                }
            }

        }}>
            <div className="text-center">
                <h1 className="text-3xl text-violet-800 font-semibold">Presentear {presente.nome} entregando pessoalmente</h1>
                <p className="text-base text-slate-500 mt-2">Abaixo veja uma sugestão do modelo do presente</p>
            </div>
            <div className="flex flex-row gap-3 mt-6 justify-center">
                <img src={presente.image} alt={presente.nome} className="w-24 h-24 object-cover rounded-md"/>
            </div>
            {presente.url_produto && (
                <div className="text-center mt-2">
                    <Link href={presente.url_produto} target="_blank"><button className="bg-rose-400 rounded-md px-2 py-1.5 text-base text-white hover:bg-rose-700">Compre aqui</button></Link>
                </div>
            )}
            <div className="text-center mt-4">
                <p className="text-base text-slate-500">Endereço da entrega:</p>
                <p className="text-base text-slate-700 font-semibold">{presente.user?.endereco_entrega}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                <button className="w-full py-2 text-white rounded-lg bg-violet-500 hover:bg-violet-700" onClick={selectPresente}>Confirmar</button>
            </div>
        </Modal>
    )
}

export default SelectEntregarModal;
