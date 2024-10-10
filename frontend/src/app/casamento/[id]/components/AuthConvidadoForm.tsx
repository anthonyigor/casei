'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/LoginInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const formatPhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
  
    // Formata o número de telefone
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
};

interface AuthConvidadoFormProps {
    userId: string
}

const AuthConvidadoForm: React.FC<AuthConvidadoFormProps> = ( { userId }) => {
    const [phone, setPhone] = useState('');
    const router = useRouter();
    
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            telefone: '',
            nome: ''
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/identificate`, {
                nome: data.nome,
                telefone: phone
            })

            const convidado = response.data.convidado
            toast.success('Perfeito, já te identificamos!')
            router.push(`/casamento/${userId}/convidado/${convidado.id}`)
        } catch (error: any) {
            toast.error('Opa, não conseguimos te identificar. Por favor verifique se o número de telefone está correto')
        }
    }
    
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-6 sm:rounded-lg sm:px-10">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="nome"
                        type="text"
                        label="Nome"
                        required={true}
                        register={register}
                    />
                    <Input 
                        id="telefone"
                        type="text"
                        label="Telefone"
                        register={register}
                        required={true}
                        value={phone}
                        onChange={handleChange}
                        maxLength={15}
                        placeholder="(xx) xxxxx-xxxx"
                    />
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                        >
                            Confirmar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthConvidadoForm;