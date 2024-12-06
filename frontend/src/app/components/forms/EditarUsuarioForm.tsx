'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormsInput from "../inputs/FormsInput";
import { Convidado, User } from "@/types";
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

interface EditarUsuarioProps {
    usuario: User
}

const EditarUsuarioForm: React.FC<EditarUsuarioProps> = ({ usuario }) => {
    const [phone, setPhone] = useState(usuario.telefone);
    const [dataCasamento, setDataCasamento] = useState(usuario.data_casamento)
    const [horario, setHorario] = useState(usuario.horario)
    const session = useSession()
    const router = useRouter()
    
    const {
        register, 
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            nome: usuario.nome,
            email: usuario.email,
            nome_parceiro: usuario.nome_parceiro,
            data_casamento: dataCasamento,
            horario_casamento: horario
        }
    })

    useEffect(() => {
        // Converter para o formato YYYY-MM-DD
        const [day, month, year] = usuario.data_casamento.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        setDataCasamento(formattedDate);
    }, [usuario.data_casamento]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataCasamento(e.target.value);
    };

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHorario(e.target.value);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id;

        console.log(data)
        
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
                        value={usuario.nome}
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
                    <FormsInput
                        id="email"
                        label="Email"
                        register={register}
                        type="text"
                        placeholder="Email"
                        required={true}
                        key="email"
                        value={usuario.email}
                    />
                    <FormsInput
                        id="nome_parceiro"
                        label="Nome parceiro(a)"
                        register={register}
                        type="text"
                        placeholder="Nome parceiro(a)"
                        required={false}
                        key="nome_parceiro"
                        value={usuario.nome_parceiro}
                    />
                    <FormsInput
                        id="data_casamento"
                        label="Data do casamento"
                        register={register}
                        type="date"
                        placeholder="Data do casamento"
                        required={false}
                        key="data_casamento"
                        value={dataCasamento}
                        onChange={handleDateChange}
                    />
                    <FormsInput
                        id="horario_casamento"
                        label="Horário do casamento"
                        register={register}
                        type="time"
                        placeholder="Horario do casamento"
                        required={false}
                        key="horario_casamento"
                        value={horario}
                        onChange={handleHourChange}
                    />
                    <FormsInput
                        id="endereco"
                        label="Endereço do local"
                        register={register}
                        type="text"
                        placeholder="endereço"
                        required={false}
                        key="endereco"
                        value={usuario.endereco}
                    />
                    <h2 className="mb-3 block text-2xl font-medium text-black">
                        Dados de recebimento
                    </h2>
                    <FormsInput
                        id="chave_pix"
                        label="Chave pix"
                        register={register}
                        type="text"
                        placeholder="Chave pix"
                        required={false}
                        key="chave_pix"
                        value={usuario.chave_pix}
                    />
                    <FormsInput
                        id="cidade"
                        label="Cidade"
                        register={register}
                        type="text"
                        placeholder="Cidade"
                        required={false}
                        key="cidade"
                        value={usuario.cidade}
                    />

                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-teal-600 hover:bg-teal-800 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default EditarUsuarioForm;