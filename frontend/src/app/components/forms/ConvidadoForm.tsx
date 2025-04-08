'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Select from "../Select";
import toast from "react-hot-toast";
import FormsInput from "../inputs/FormsInput";

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
    token?: string
};

const formatPhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
  
    // Formata o número de telefone
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
};
  
const url = process.env.NEXT_PUBLIC_BACKEND_URL
const ConvidadoForm = () => {
    const [presentess, setPresentes] = useState<any[]>([])
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState('')
    const session = useSession()
    
    useEffect(() => {
        if (session.data?.user) {
            setUserId((session.data.user as CustomUser).id!)
            if (userId) {
                axios.get(`${url}/users/${userId}/presentes/disponiveis`)
                .then((response) => {
                    setPresentes(response.data)
                })
                .catch((error) => toast.error(error.message))
            }
        }
    }, [session.data?.user, userId])

    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            nome: "",
            telefone: '',
            presentes: '',
            confirmado: false,
            tipo_selecao: ''
        }
    })

    const presentes = watch('presentes')
    const confirmado = watch('confirmado')
    const tipo_selecao = watch('tipo_selecao')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const token = (session.data?.user as CustomUser).token;
        axios.post(`${url}/users/${userId}/convidados/create`, 
            {
                ...data,
                quant_familia: Number(data.quant_familia),
                confirmado: data.confirmado.value,
                tipo_selecao: data.tipo_selecao.value
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
                        id="telefone"
                        label="Telefone"
                        maxLenght={15}
                        register={register}
                        type="text"
                        placeholder="Informe o telefone"
                        required={true}
                        key="telefone"
                        onChange={handleChange}
                        value={phone}
                    />
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-black">
                            Quantidade de acompanhantes (familia)
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="number" min={1} id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-violet-600 focus:shadow-md" {...register('quant_familia', { required: true })}/>
                    </div>
                    <div className="mb-5">
                        {presentess && (
                            <Select 
                                disabled={false}
                                label="Presente"
                                options={presentess.map((presente) => ({
                                    value: presente.id,
                                    label: presente.nome
                                }))}
                                onChange={(value) => setValue('presentes', value, {
                                    shouldValidate: true
                                })}
                                value={presentes}
                                multi={true}
                            />
                        )}
                    </div>
                    
                    <div className="mb-5">
                        {presentess && (
                            <Select 
                                disabled={false}
                                label="Tipo de seleção"
                                options={[
                                    {
                                        value: 'entregar',
                                        label: "Entrega"
                                    },
                                    {
                                        value: 'pix',
                                        label: "Pix"
                                    }
                                ]}
                                onChange={(value) => setValue('tipo_selecao', value, {
                                    shouldValidate: true
                                })}
                                value={tipo_selecao}
                            />
                        )}
                    </div>
                    
                    <div className="mb-5">
                        <Select 
                                disabled={false}
                                label="Confirmado"
                                options={[
                                    {
                                        value: true,
                                        label: "Sim"
                                    },
                                    {
                                        value: false,
                                        label: "Não"
                                    }
                                ]}
                                onChange={(value) => setValue('confirmado', value, {
                                    shouldValidate: true
                                })}
                                value={confirmado}
                                multi={false}
                                required={true}
                            />
                    </div>

                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-violet-600 hover:bg-violet-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default ConvidadoForm;