'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import Select from "../Select";
import toast from "react-hot-toast";
import FormsInput from "../inputs/FormsInput";
import { Convidado } from "@/types";
import { useRouter } from "next/navigation";

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

interface EditarConvidadoProps {
    convidado: Convidado
}

const EditarConvidadoForm: React.FC<EditarConvidadoProps> = ({ convidado }) => {
    const [presentes, setPresentes] = useState<any[]>([])
    const [phone, setPhone] = useState(convidado.telefone);
    const session = useSession()
    const router = useRouter()
    
    useEffect(() => {
        async function getPresentesDisponiveis(userId: string, token: string) {
            axios.get(`${url}/users/${userId}/presentes/disponiveis`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setPresentes(response.data)
            })
            .catch((error) => toast.error(error.message))
        }

        if (session.data?.user) {
            const userId = (session.data.user as any).id
            const token = (session.data.user as any).token
            getPresentesDisponiveis(userId, token)
        }
    }, [session])

    const {
        register, 
        handleSubmit,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            nome: convidado.nome,
            telefone: convidado.telefone,
            presentes: convidado.presentes.map((presente) => ({
                value: presente.id,
                label: presente.nome
            })),
            confirmado: {
                value: convidado.confirmado,
                label: convidado.confirmado ? 'Sim' : 'Não'
            },
            quant_familia: convidado.quant_familia
        }
    })

    const presentess = watch('presentes')
    const confirmado = watch('confirmado')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id;
        axios.put(`${url}/users/${userId}/convidados/${convidado.id}`, 
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
            toast.success('Convidado editado com sucesso!')
            router.push('/convidados/index')
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
                                onChange={(value) => setValue('presentes', value, {
                                    shouldValidate: true
                                })}
                                value={presentess}
                                multi={true}
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
                            className="hover:shadow-form w-full rounded-md bg-violet-600 hover:bg-violet-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default EditarConvidadoForm;