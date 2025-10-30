'use client'

import Modal from "@/app/components/Modal"
import { Great_Vibes } from "next/font/google";
import toast from "react-hot-toast";

interface ConfirmarPresencaModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    convidadoId: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const ConfirmarPresencaModal: React.FC<ConfirmarPresencaModalProps> = ({ isOpen, onClose, userId, convidadoId }) => {

    const confirmarPresenca = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/${convidadoId}/confirmar-presenca`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error('Erro ao confirmar presença');
                return
            }

            toast.success('Presença confirmada com sucesso!');
            onClose();
        } catch (error) {
            toast.error('Erro ao confirmar presença');
        }
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className={greatVibes.className}>
                    <h1 className="text-4xl text-[#646443] font-semibold">Confirmar presença</h1>
                </div>
                <p className="text-base text-slate-500 mt-2">Deseja confirmar sua presença no casamento?</p>
                <div className="flex flex-row gap-3 mt-6 justify-center">
                    <button className="w-full py-2 text-white rounded-lg bg-red-500 hover:bg-red-700" onClick={onClose}>Cancelar</button>
                    <button className="w-full py-2 text-white rounded-lg bg-[#646443] hover:bg-[#646443]" onClick={confirmarPresenca}>Confirmar</button>
                </div>
            </div>
            
        </Modal>
        </>
    )
}

export default ConfirmarPresencaModal;
