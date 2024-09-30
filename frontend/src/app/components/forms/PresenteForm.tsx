'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import FormsInput from "../inputs/FormsInput";
import ImageInput from "../inputs/ImageInput";

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
    const [previewSrc, setPreviewSrc] = useState<string>('/img/presentes.png');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const session = useSession()
    
    const {
        register, 
        handleSubmit,
        setValue,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
           nome: '',
           descricao: '',
           valor: '',
           url_produto: ''
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
        const types = ['image/png', 'image/jpeg'];

        if (!types.includes(file.type)) {
            toast.error('Apenas arquivos PNG e JPEG são permitidos.');
            return;
        }

        if (file) {
            const src = URL.createObjectURL(file);
            setPreviewSrc(src); 
            setSelectedFile(file);

            // Opcional: Revogar a URL após o uso
            event.target.onload = function() {
                URL.revokeObjectURL(src);
            };
        }
    };

    const formatToNumber = (valor: string) => {
        // Remove "R$" e espaços
        let numericValue = valor.replace('R$', '').trim();
        
        // Substitui a vírgula por ponto
        numericValue = numericValue.replace(',', '.');
        
        // Converte a string para um número
        return numericValue;
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData()

        formData.append('nome', data.nome)
        formData.append('descricao', data.descricao)
        formData.append('valor', formatToNumber(valor))
        
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id!
        axios.post(`${url}/users/${userId}/presentes/create`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success('Presente cadastrado com sucesso!')
            reset()
            setPreviewSrc('/img/presentes.png')
        })
        .catch((error) => toast.error(error.message))
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormsInput
                        id="nome"
                        label="Nome"
                        register={register}
                        type="text"
                        placeholder="Nome"
                        required={true}
                        key="name"
                    />
                    <FormsInput
                        id="descricao"
                        label="Descrição"
                        register={register}
                        type="text"
                        placeholder="Descrição"
                        required={false}
                        key="descricao"
                    />
                    <FormsInput
                        id="valor"
                        label="Valor"
                        register={register}
                        onChange={handleValorChange}
                        type="text"
                        placeholder="R$0,00"
                        value={valor}
                        required={false}
                        key="valor"
                    />
                    <FormsInput
                        id="url_produto"
                        label="Url produto"
                        register={register}
                        onChange={handleValorChange}
                        type="text"
                        placeholder="Informe a URL do produto"
                        required={false}
                        key="url_produto"
                    />
                    <ImageInput previewSrc={previewSrc} loadFile={loadFile}/>
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