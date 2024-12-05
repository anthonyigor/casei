'use client'

import FormsInput from "@/app/components/inputs/FormsInput";
import Modal from "@/app/components/Modal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateNewPresentePixProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    convidadoId: string;
    nome: string;
    description?: string
}

const CreateNewPresentePix: React.FC<CreateNewPresentePixProps> = ({ isOpen, onClose, userId, convidadoId, nome, description }) => {
    const [pixBase64, setPixBase64] = useState('');

    async function fetchPix(valor: string) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/qrcode`, {
                valor: Number(valor),
            });
            setPixBase64(response.data.qrCode);
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const { register, handleSubmit } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        await fetchPix(data.valor)
    }

    const createPresente = async() => {
        
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h1 className="text-3xl text-teal-800 font-semibold">Presentear {nome} com pix</h1>
                <p className="text-base text-slate-500 mt-2">Informe o valor que deseja presentear para gerar o QRcode pix</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormsInput
                        id="valor"
                        label="Valor"
                        register={register}
                        type="text"
                    />

                    <button type="submit">Gerar QRCode</button>
                </form>

                {pixBase64 && 
                    <>
                    <div className="flex flex-row gap-3 mt-6 justify-center">
                        {pixBase64 && <img src={pixBase64} alt="QR Code" />}
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                        <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                        <button className="w-full py-2 text-white rounded-lg bg-teal-500 hover:bg-teal-700" onClick={createPresente}>Confirmar</button>
                    </div>
                    </>
                }
            </div>
        </Modal>
    )
}

export default CreateNewPresentePix;
