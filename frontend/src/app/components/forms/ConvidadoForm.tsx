'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Select from "../Select";
import toast from "react-hot-toast";

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
    const [presentes, setPresentes] = useState<any[]>([])
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState('')
    const session = useSession()
    
    useEffect(() => {
        if (session.data?.user) {
            setUserId((session.data.user as CustomUser).id!)
            if (userId) {
                axios.get(`${url}/users/${userId}/presentes`)
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
            presente: '',
            confirmado: false
        }
    })

    const presente = watch('presente')
    const confirmado = watch('confirmado')

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
                        <label htmlFor="phone" className="mb-3 block text-lg font-medium text-black">
                            Telefone
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="phone" placeholder="Informe o telefone" value={phone} maxLength={15}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" {...register('telefone', {required: true})} onChange={handleChange}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-black">
                            Quantidade de acompanhantes (familia)
                            <span className="text-red-500">*</span>
                        </label>
                        <input type="number" min={1} id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" {...register('quant_familia', { required: true })}/>
                    </div>
                    <div className="mb-5">
                        {presentes && (
                            <Select 
                                disabled={false}
                                label="Presente"
                                options={presentes.map((presente) => ({
                                    value: presente.id,
                                    label: presente.nome
                                }))}
                                onChange={(value) => setValue('presente', value, {
                                    shouldValidate: true
                                })}
                                value={presente}
                                multi={false}
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
                            />
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
 
export default ConvidadoForm;