'use client'

import { useState } from "react"
import Input from "../Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../Button"
import { signIn } from "next-auth/react"

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { handleSubmit, register } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback)=> console.log(callback))
    }

    return (
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-6 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="email"
                        type="email"
                        label="Email"
                        register={register}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password"
                        type="password"
                        label="Senha"
                        register={register}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthForm 