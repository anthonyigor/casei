'use client'

import Modal from "@/app/components/Modal";
import { Presente } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SelectPixModalProps {
    isOpen: boolean;
    onClose: () => void;
    presente: Presente;
    userId: string;
    convidadoId: string;
    onSelectComplete: () => void;
}

const SelectPixModal: React.FC<SelectPixModalProps> = ({ isOpen, onClose, presente, userId, convidadoId, onSelectComplete }) => {
    const [pixBase64, setPixBase64] = useState('');

    useEffect(() => {
        async function fetchPix() {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/qrcode`, {
                    valor: Number(presente.valor),
                });
                setPixBase64(response.data.qrCode);
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        }

        fetchPix()
    }, [userId, presente])

    const selectPresente = async() => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${presente.id}/selecionar`, {
                convidadoId,
                tipo_selecao: 'pix'
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
                <h1 className="text-3xl text-teal-800 font-semibold">Presentear {presente.nome} com pix</h1>
                <p className="text-base text-slate-500 mt-2">Escaneie o QR code abaixo para fazer pix no valor do presente</p>
            </div>
            <div className="flex flex-row gap-3 mt-6 justify-center">
                {pixBase64 && <img src={pixBase64} alt="QR Code" />}
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                <button className="w-full py-2 text-white rounded-lg bg-teal-500 hover:bg-teal-700" onClick={selectPresente}>Confirmar</button>
            </div>
        </Modal>
    )
}

export default SelectPixModal;
