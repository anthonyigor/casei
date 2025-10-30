'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormsInput from "../inputs/FormsInput";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from "next/dynamic";
import TextAreaInput from "../inputs/TextAreaInput";

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

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL

interface EditarUsuarioProps {
    usuario: User
}

const EditarUsuarioForm: React.FC<EditarUsuarioProps> = ({ usuario }) => {
    const [phone, setPhone] = useState(usuario.telefone);
    const [dataCasamento, setDataCasamento] = useState(usuario.data_casamento)
    const [horario, setHorario] = useState(usuario.horario)
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>({lat: Number(usuario.lat), lng: Number(usuario.lon)});
    const session = useSession()
    const router = useRouter()

    const mapRef = useRef<HTMLDivElement | null>(null);
    const leafletMapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    const markerIcon = new L.Icon({
        iconUrl: `/img/marker.png`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });

    useEffect(() => {
        if (typeof window !== "undefined" && mapRef.current) {
            // Remove o mapa existente, se necessário
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
            }

            // Cria o mapa Leaflet
            leafletMapRef.current = L.map(mapRef.current).setView([location?.lat!, location?.lng!], 15);

            // Adiciona o tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(leafletMapRef.current);

            markerRef.current = L.marker([location?.lat!, location?.lng!], {
                icon: markerIcon,
                draggable: true,
            }).addTo(leafletMapRef.current)

            
            // Atualiza as coordenadas ao arrastar o marcador
            markerRef.current.on('dragend', (event) => {
                const { lat, lng } = event.target.getLatLng();
                setLocation({ lat, lng });
            });

            leafletMapRef.current.on('click', (event) => {
                const { lat, lng } = event.latlng
                setLocation({lat, lng})

                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng])
                }

            })

        }

        // Cleanup
        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, [location?.lat, location?.lng]);
    
    const {
        register, 
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            nome: usuario.nome,
            email: usuario.email,
            nome_parceiro: usuario.nome_parceiro,
            data_casamento: dataCasamento,
            horario_casamento: horario,
            endereco: usuario.endereco,
            endereco_entrega: usuario.endereco_entrega,
            chave_pix: usuario.chave_pix,
            cidade: usuario.cidade,
            mensagem_agradecimento: usuario.mensagem_agradecimento
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

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        const token = (session.data?.user as CustomUser).token;
        const userId = (session.data?.user as CustomUser).id;

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/update/${userId}`, {
                ...data,
                data_casamento: formatDate(dataCasamento!),
                lat: location?.lat,
                lon: location?.lng
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success(response.data.message)
            router.push('/usuario')
        } catch (error: any) {
            console.log(error)
            toast.error(`Erro ao atualizar usuário: ${JSON.stringify(error.response.data)}`)
        }
        
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
                    />
                    <FormsInput
                        id="nome_parceiro"
                        label="Nome parceiro(a)"
                        register={register}
                        type="text"
                        placeholder="Nome parceiro(a)"
                        required={false}
                        key="nome_parceiro"
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
                        label="Endereço da cerimônia"
                        register={register}
                        type="text"
                        placeholder="Endereço da cerimonia"
                        required={false}
                        key="endereco"
                    />

                    <FormsInput
                        id="endereco_entrega"
                        label="Endereço de entrega do presente"
                        register={register}
                        type="text"
                        placeholder="Endereço de entrega"
                        required={false}
                        key="endereco_entrega"
                    />

                    <TextAreaInput
                        id="mensagem_agradecimento"
                        label="Mensagem de agradecimento para convidados"
                        register={register}
                        placeholder="Mensagem de agradecimento"
                        required={false}
                        key="mensagem_agradecimento"
                    />

                    <h3 className="text-lg font-semibold">Selecione a localização do evento:</h3>
                    <FormsInput
                        id="latitude"
                        label="Latitude"
                        type="number"
                        required={false}
                        placeholder="Latitude"
                        value={location?.lat || ""}
                        onChange={(e) => {
                        const lat = parseFloat(e.target.value);
                        if (!isNaN(lat) && location) {
                            setLocation({ ...location, lat });
                        }
                        }}
                        register={register}
                    />
                    <FormsInput
                        id="longitude"
                        label="Longitude"
                        type="number"
                        required={false}
                        placeholder="Longitude"
                        value={location?.lng || ""}
                        onChange={(e) => {
                        const lng = parseFloat(e.target.value);
                        if (!isNaN(lng) && location) {
                            setLocation({ ...location, lng });
                        }
                        }}
                        register={register}
                    />
                    <div
                        ref={mapRef}
                        style={{
                            position: "relative",
                            height: "400px",
                            width: "100%",
                            marginTop: "20px",
                        }}
                    />
                    {location && (
                        <p className="mt-2 text-gray-500">
                            Localização: Latitude {location.lat}, Longitude {location.lng}
                        </p>
                    )}

                    <h2 className="mt-6 mb-3 block text-2xl font-medium text-black">
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
                    />
                    <FormsInput
                        id="cidade"
                        label="Cidade"
                        register={register}
                        type="text"
                        placeholder="Cidade"
                        required={false}
                        key="cidade"
                    />

                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#646443] hover:bg-[#646443] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default dynamic(() => Promise.resolve(EditarUsuarioForm), { ssr: false });