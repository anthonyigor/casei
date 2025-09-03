'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/LoginInput";
import LoadingModal from "@/app/components/LoadingModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
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

const AuthConvidadoForm: React.FC<AuthConvidadoFormProps> = ({ userId }) => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const router = useRouter();
    
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FieldValues>({
        defaultValues: {
            telefone: '',
            nome: ''
        }
    });

    // Memoizar a função de redirecionamento
    const redirectToConvidado = useCallback((convidadoId: string) => {
        router.replace(`/casamento/${userId}/convidado/${convidadoId}`);
    }, [router, userId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(event.target.value);
        setPhone(formattedPhone);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // Evitar duplo submit
        if (isLoading || isRedirecting || isSubmitting) {
            return;
        }
        
        try {
            setIsLoading(true);
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/convidados/identificate`, {
                nome: data.nome,
                telefone: phone
            });

            const convidado = response.data.convidado;
            
            if (!convidado || !convidado.id) {
                throw new Error('Dados do convidado inválidos');
            }

            // Mostrar mensagem de sucesso
            toast.success('Perfeito, já te identificamos!');
            
            // Definir estado de redirecionamento
            setIsRedirecting(true);
            
            // Aguardar um pouco para dar tempo do toast aparecer
            setTimeout(() => {
                redirectToConvidado(convidado.id);
            }, 800);
            
        } catch (error: any) {
            console.error('Form submission error:', error);
            
            // Resetar estados
            setIsLoading(false);
            setIsRedirecting(false);
            
            // Determinar mensagem de erro
            let errorMessage = 'Opa, não conseguimos te identificar. Por favor verifique se os dados estão corretos';
            
            if (error.response?.status === 404) {
                errorMessage = 'Convidado não encontrado. Verifique se o nome e telefone estão corretos';
            } else if (error.response?.status === 400) {
                errorMessage = 'Dados inválidos. Por favor, preencha todos os campos corretamente';
            } else if (!navigator.onLine) {
                errorMessage = 'Sem conexão com a internet. Tente novamente';
            }
            
            toast.error(errorMessage);
        }
    }
    
    // Mostrar loading durante redirecionamento
    const showLoading = isLoading || isRedirecting;
    
    return (
        <>
        {showLoading && (
            <LoadingModal />
        )}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-6 sm:rounded-lg sm:px-10">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="nome"
                        type="text"
                        label="Nome"
                        required={true}
                        register={register}
                        disabled={showLoading}
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
                        disabled={showLoading}
                    />
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            disabled={showLoading}
                        >
                            {isLoading ? 'Identificando...' : 
                             isRedirecting ? 'Redirecionando...' : 
                             'Confirmar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default AuthConvidadoForm;