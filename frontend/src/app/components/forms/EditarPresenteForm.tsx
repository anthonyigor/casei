'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormsInput from "../inputs/FormsInput";
import ImageInput from "../inputs/ImageInput";
import { Presente } from "@/types";
import { useRouter } from "next/navigation";

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    token?: string
};

const url = process.env.NEXT_PUBLIC_BACKEND_URL

interface EditarPresenteProps {
    presente: Presente
}

const formatToNumber = (valor: string): number => {
    // Remove "R$" e espaços, substitui "." por vazio e vírgula por ponto
    const numericValue = valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    return parseFloat(numericValue);
};

const EditarPresenteForm: React.FC<EditarPresenteProps> = ({ presente }) => {
    const [valor, setValor] = useState(`R$${presente.valor?.toFixed(2).replace('.', ',')}` || '');
    const [previewSrc, setPreviewSrc] = useState<string>(presente.image || '/img/presentes.png');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();
    
    const session = useSession()
    
    const {
        register, 
        handleSubmit,
        setValue,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
           nome: presente.nome,
           descricao: presente.descricao,
           valor: presente.valor,
           url_produto: presente.url_produto
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData()

        formData.append('nome', data.nome)
        formData.append('descricao', data.descricao)
        formData.append('valor', formatToNumber(valor).toString())
        formData.append('url_produto', data.url_produto)
        
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id!
        axios.put(`${url}/users/${userId}/presentes/${presente.id}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success('Presente editado com sucesso!')
            router.push('/presentes/index')
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
                        type="text"
                        placeholder="Informe a URL do produto"
                        required={false}
                        key="url_produto"
                    />
                    <ImageInput previewSrc={previewSrc} loadFile={loadFile}/>
                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-violet-600 hover:bg-violet-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default EditarPresenteForm;