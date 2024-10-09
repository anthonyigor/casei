'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/LoginInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AuthConvidadoForm = () => {
    
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            telefone: '',
            nome: ''
        }
    })

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
                        register={register}
                    />
                    <Input 
                        id="telefone"
                        type="text"
                        label="Telefone"
                        register={register}
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