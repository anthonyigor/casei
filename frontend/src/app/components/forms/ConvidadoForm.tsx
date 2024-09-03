'use client'

import { FieldValues, useForm } from "react-hook-form";

const ConvidadoForm = () => {

    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {

        }
    })

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
                        <label htmlFor="phone" className="mb-3 block text-lg font-medium text-blakck">
                            Telefone
                        </label>
                        <input type="text" name="phone" id="phone" placeholder="Informe o telefone"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-blakck">
                            Quantidade de acompanhantes (familia)
                        </label>
                        <input type="number" name="quant_familia" id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-lg font-medium text-blakck">
                            Presente
                        </label>
                        <input type="number" name="quant_familia" id="quant_familia" placeholder="Informe a quantidade"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-teal-600 focus:shadow-md" />
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