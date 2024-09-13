'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    token?: string
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL

const PresenteForm = () => {
    const [valor, setValor] = useState('');
    const [userId, setUserId] = useState('')
    const [previewSrc, setPreviewSrc] = useState<string>('/img/presentes.png');
    
    const session = useSession()
    
    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
           
        }
    })


    const handleValorChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
        value = (value / 100).toFixed(2) + ''; // Converte para formato decimal
        value = value.replace('.', ','); // Substitui ponto por vírgula
        value = 'R$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos para milhar
        
        setValor(value);
        setValue('valor', value);
    };

    const loadFile = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            const src = URL.createObjectURL(file);
            setPreviewSrc(src);  // Atualiza o estado para renderizar a nova imagem

            // Opcional: Revogar a URL após o uso
            event.target.onload = function() {
                URL.revokeObjectURL(src);
            };
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const token = (session.data?.user as CustomUser).token;
        axios.post(`${url}/users/${userId}/convidados/create`, 
            {
                ...data,
                quant_familia: Number(data.quant_familia),
                confirmado: data.confirmado.value
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success('Convidado cadastrado com sucesso!')
            reset()
        })
        .catch((error) => toast.error(error.message))
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-lg font-medium text-black">
                            Nome
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="name" placeholder="Nome"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" {...register('nome', { required: true })}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="descricao" className="mb-3 block text-lg font-medium text-black">
                            Descrição
                        </label>
                        <input type="text" id="description" placeholder="Informe a descrição"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" {...register('descricao', {required: true})}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="valor" className="mb-3 block text-lg font-medium text-black">
                            Valor
                        </label>
                        <input type="text" id="valor" placeholder="R$0,00" value={valor}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" {...register('valor', {required: true})} onChange={handleValorChange}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="image" className="mb-3 block text-lg font-medium text-black">
                            Imagem
                        </label>    
                        <div className="flex items-center space-x-6">
                            <div className="shrink-0">
                                <Image
                                    id="preview_img"
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={previewSrc!}
                                    width={30}
                                    height={30}
                                    alt="Current profile photo"
                                />
                            </div>
                            <label className="block">
                                <span className="sr-only">Selecione uma imagem</span>
                                <input
                                    type="file"
                                    onChange={loadFile}
                                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-teal-100 file:text-teal-600
                                        hover:file:bg-teal-800
                                        hover:file:text-white
                                    "
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-teal-600 hover:bg-teal-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default PresenteForm;