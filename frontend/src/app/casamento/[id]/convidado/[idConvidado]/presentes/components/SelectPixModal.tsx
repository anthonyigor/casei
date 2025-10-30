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
    const [pixCopiaCola, setPixCopiaCola] = useState(null);
    const [isProductSelected, setIsProductSelected] = useState<boolean>(false)

    useEffect(() => {
        async function fetchPix() {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/qrcode`, {
                    valor: Number(presente.valor),
                });
                setPixBase64(response.data.qrCode);
                setPixCopiaCola(response.data.copiaCola);
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        }

        fetchPix()
    }, [userId, presente])

    const selectPresente = async() => {
        const confirm = window.confirm('Deseja confirmar a seleção do presente?')
        if (!confirm) return;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${presente.id}/selecionar`, {
                convidadoId,
                tipo_selecao: 'pix'
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
                <h1 className="text-3xl text-[#646443] font-semibold">Presentear {presente.nome} com pix</h1>
                <p className="text-base text-slate-500 mt-2">Escaneie o QR code abaixo para fazer pix no valor do presente</p>
                <p className="text-base text-slate-500 mt-2">R${presente.valor?.toFixed(2)}</p>
            </div>
            <div className="flex flex-row gap-3 mt-3 justify-center">
                {pixBase64 && <img src={pixBase64} alt="QR Code" />}
            </div>
            {pixCopiaCola && (
                <div className="flex flex-col gap-2 justify-center mt-4">
                    <p className="text-base text-slate-500">Ou copie o código pix abaixo:</p>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        
                        <input 
                            type="text"
                            readOnly
                            value={pixCopiaCola}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(pixCopiaCola);
                                toast.success('Código pix copiado!');
                            }}
                            className="px-4 py-2 text-white rounded-lg bg-[#646443] hover:bg-[#646443]"
                        >
                            Copiar
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-2 justify-center">
                <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                <button className="w-full py-2 text-white rounded-lg bg-[#646443] hover:bg-[#646443]" onClick={selectPresente}>Confirmar</button>
            </div>
        </Modal>
    )
}

export default SelectPixModal;
