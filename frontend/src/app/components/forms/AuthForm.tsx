'use client'

import { useEffect, useState } from "react"
import Input from "../inputs/LoginInput"
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form"
import Button from "../Button"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/dashboard')
        }
    }, [session?.status, router])

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
        .then((callback)=> {
            if (callback?.error) {
                toast.error('Credenciais inválidas!')
            } else {
                toast.success('Login realizado!')
                router.push('/dashboard')
            }
        })
        .finally(() => setIsLoading(false))
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
                        required
                        disabled={isLoading}
                    />
                    <Input 
                        id="password"
                        type="password"
                        label="Senha"
                        register={register}
                        required
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