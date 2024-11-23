'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
    const session = useSession()
    const router = useRouter()
    
    const {
        register, 
        handleSubmit,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            nome: usuario.nome,
            email: usuario.email,
            nome_parceiro: usuario.telefone,
        }
    })

    useEffect(() => {
        // Converter para o formato YYYY-MM-DD
        const [day, month, year] = usuario.data_casamento.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        setValue("data_casamento", formattedDate);
    }, [usuario.data_casamento, setValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id;
        
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
                        required={true}
                        key="nome_parceiro"
                        value={usuario.nome_parceiro}
                    />
                    <FormsInput
                        id="data_casamento"
                        label="Data do casamento"
                        register={register}
                        type="date"
                        placeholder="Data do casamento"
                        required={true}
                        key="data_casamento"
                        value={usuario.data_casamento}
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