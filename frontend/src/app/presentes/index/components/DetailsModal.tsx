'use client'

import Modal from "@/app/components/Modal";

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    nome: string;
    convidado_nome: string
    valor: number
    image: string
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, nome, convidado_nome, valor, image }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h1 className="text-3xl text-violet-800 font-semibold">{nome}</h1>
            </div>
            <div className="flex flex-col items-center gap-3 mt-6 justify-center">
                <img src={image || '/img/presentes.png'} alt={nome} className="w-24 h-24 object-cover rounded-md"/>

                <div className="flex flex-row gap-1">
                    <p className="font-semibold">Selecionado por:</p>
                    <p>{convidado_nome || 'Não selecionado'}</p>
                </div>

                <div className="flex flex-row gap-1">
                    <p className="font-semibold">Valor:</p>
                    <p>R${valor.toFixed(2)}</p>
                </div>
            </div>
        </Modal>
    )
}

export default DetailsModal;
