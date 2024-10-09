'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/LoginInput";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const formatPhoneNumber = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
  
    // Formata o número de telefone
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
};

const AuthConvidadoForm = () => {
    const [phone, setPhone] = useState('');
    
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
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