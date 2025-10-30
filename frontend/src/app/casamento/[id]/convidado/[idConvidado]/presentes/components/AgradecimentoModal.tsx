'use client'

import Modal from "@/app/components/Modal"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import toast from "react-hot-toast"

interface AgradecimentoModalProps {
    isOpen: boolean,
    onClose: () => void,
    mensagem_agradecimento: string,
    userId: string,
    presenteId: string
}

const AgradecimentoModal: React.FC<AgradecimentoModalProps> = ( { isOpen, onClose, mensagem_agradecimento, userId, presenteId }) => {
    const [mensagem, setMensagem] = useState<string>('')

    const handleSendMessage = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/${presenteId}/mensagem`, {
                message: mensagem
            })

            toast.success(response.data.message)
            onClose()
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h1 className="text-xl text-[#646443] font-semibold">Presente selecionado ❤️</h1>
                <p className="text-base text-slate-600 mt-2">{mensagem_agradecimento}</p>
            </div>
            <div className="flex flex-col items-center mt-2">
                <p className="text-base text-slate-500 mt-2">Deseja deixar alguma mensagem para o casal?</p>
                <textarea 
                    className="w-full p-4 border border-gray-300 rounded-lg mt-4 mb-2 h-32" 
                    placeholder="Mensagem para o casal" 
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                />
                <div className="w-full flex gap-2 mt-4">
                    <button 
                        className="w-full py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100"
                        onClick={() => onClose()}
                    >
                        Não, obrigado
                    </button>
                    <button 
                        className="w-full py-2 text-white rounded-lg bg-[#646443] hover:bg-[#646443]"
                        onClick={handleSendMessage}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default AgradecimentoModal