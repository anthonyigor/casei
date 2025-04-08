'use client'

import Modal from "@/app/components/Modal"
import { Great_Vibes } from "next/font/google";
import { useState } from "react";
import { FaPix } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

interface CreateNewPresenteProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    convidadoId: string;
}

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const CreateNewPresente: React.FC<CreateNewPresenteProps> = ({ isOpen, onClose, userId, convidadoId }) => {
    const [valor, setValor] = useState<string>('')
    const [nome, setNome] = useState<string | null>(null)
    const [description, setDescription] = useState<string>('')
    const [pixBase64, setPixBase64] = useState('');
    const [pixCopiaCola, setPixCopiaCola] = useState(null);

    async function fetchPix() {
        if (!nome) {
            toast.error("Informe o nome do presente")
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/qrcode`, {
                valor: formatToNumber(valor),
            });
            setPixBase64(response.data.qrCode);
            setPixCopiaCola(response.data.copiaCola);
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    async function createPresente() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/presentes/create/avulso`, {
                nome,
                descricao: description,
                valor: formatToNumber(valor),
                convidado_id: convidadoId
            })

            toast.success('Presente selecionado com sucesso!')
            onClose()
        } catch (error: any) {
            toast.error(`Erro ao selecionar presente: ${error.response.data.message}`)
        }
    }

    const handleValorChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
        value = (value / 100).toFixed(2) + ''; // Converte para formato decimal
        value = value.replace('.', ','); // Substitui ponto por vírgula
        value = 'R$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos para milhar
        
        setValor(value);
    }

    const formatToNumber = (valor: string): number => {
        // Remove "R$" e espaços, substitui "." por vazio e vírgula por ponto
        const numericValue = valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
        return parseFloat(numericValue);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <div className={greatVibes.className}>
                    <h1 className="text-4xl text-violet-800 font-semibold">Informe o que desejar dar ao casal</h1>
                </div>
            </div>
            {!pixBase64 ? (
                    <div className="mt-2">
                        <div className="mb-5">
                            <label className="mb-3 block text-lg font-medium text-black" htmlFor='name'>
                                Nome
                            </label>
                            <div className="mt-1">
                                <input 
                                    id='name'
                                    type='text'
                                    placeholder='Informe o nome'
                                    className="
                                        w-full
                                        rounded-md
                                        border 
                                        border-[#e0e0e0]
                                        bg-white 
                                        py-3 
                                        px-6 
                                        text-base 
                                        font-medium 
                                        text-gray-600 
                                        outline-none 
                                        focus:border-violet-600 
                                        focus:shadow-md"
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div> 
                        </div>
                        <div className="mb-5">
                            <label className="mb-3 block text-lg font-medium text-black" htmlFor='description'>
                                Descrição
                            </label>
                            <div className="mt-1">
                                <input 
                                    id='description'
                                    type='text'
                                    placeholder='Descrição'
                                    className="
                                        w-full
                                        rounded-md
                                        border 
                                        border-[#e0e0e0]
                                        bg-white 
                                        py-3 
                                        px-6 
                                        text-base 
                                        font-medium 
                                        text-gray-600 
                                        outline-none 
                                        focus:border-violet-600 
                                        focus:shadow-md"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div> 
                        </div>
                        <div className="mb-5">
                            <label className="mb-3 block text-lg font-medium text-black" htmlFor='valor'>
                                Valor
                            </label>
                            <div className="mt-1">
                                <input 
                                    id='valor'
                                    type='text'
                                    placeholder='Valor'
                                    className="
                                        w-full
                                        rounded-md
                                        border 
                                        border-[#e0e0e0]
                                        bg-white 
                                        py-3 
                                        px-6 
                                        text-base 
                                        font-medium 
                                        text-gray-600 
                                        outline-none 
                                        focus:border-violet-600 
                                        focus:shadow-md"
                                    onChange={handleValorChange}
                                    value={valor}
                                />
                            </div> 
                        </div>
                        <div className="flex items-center justify-center">
                            <div onClick={() => fetchPix()}
                                className="flex flex-row gap-2 items-center bg-violet-600 rounded-md px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-violet-900">
                                <FaPix className="h-6 w-6 text-white"/>
                                <p className="text-white text-base font-semibold">Gerar QRCode pix</p>
                            </div>
                        </div>
                    </div>
            ) : (
                <>
                <div className="flex flex-row gap-3 mt-6 justify-center">
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
                                className="px-4 py-2 text-white rounded-lg bg-violet-500 hover:bg-violet-700"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-2 justify-center">
                    <p className="text-base text-slate-500 mt-2">Clique no botão abaixo para confirmar a seleção do presente</p>
                    <button className="w-full py-2 text-white rounded-lg bg-violet-500 hover:bg-violet-700" onClick={() => createPresente()}>Confirmar</button>
                </div>
                
                </>
            )}
        </Modal>
    )
}

export default CreateNewPresente;
