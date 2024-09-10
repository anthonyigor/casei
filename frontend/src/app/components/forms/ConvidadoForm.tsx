'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Select from "../Select";

type CustomUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
};


const ConvidadoForm = () => {
    const [presentes, setPresentes] = useState<any[]>([])
    const session = useSession()
    
    useEffect(() => {
        if (session.data?.user) {
            const url = process.env.NEXT_PUBLIC_BACKEND_URL
            const userId = (session.data?.user as CustomUser).id
            axios.get(`${url}/users/${userId}/presentes`)
            .then((response) => {
                setPresentes(response.data)
            })
        }
    }, [session.data?.user])

    const {
        register, 
        handleSubmit,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            presente: ''
        }
    })

    const presente = watch('presente')

    console.log(presentes)
    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-lg font-medium text-black">
                            Nome
                        </label>
                        <input type="text" name="name" id="name" placeholder="Nome"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="mb-3 block text-lg font-medium text-black">
                            Telefone
                        </label>
                        <input type="text" name="phone" id="phone" placeholder="Informe o telefone"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-black">
                            Quantidade de acompanhantes (familia)
                        </label>
                        <input type="number" name="quant_familia" id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        {/* <label htmlFor="email" className="mb-3 block text-lg font-medium text-blakck">
                            Presente
                        </label>
                        <input type="number" name="quant_familia" id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" /> */}
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
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-blakck">
                            Confirmado
                        </label>
                        <input type="number" name="quant_familia" id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
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