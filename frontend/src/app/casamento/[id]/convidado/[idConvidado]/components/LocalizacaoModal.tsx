'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Modal from "@/app/components/Modal";

// Importa o MapContainer dinamicamente, desabilitando SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

interface LocalizacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    lat: number;
    lon: number;
}

const LocalizacaoModal: React.FC<LocalizacaoModalProps> = ({ isOpen, onClose, lat, lon }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; 

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ height: '100vh', width: '100%' }}>
                <MapContainer center={[lat, lon]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lon]} />
                </MapContainer>
            </div>
        </Modal>
    );
}

export default LocalizacaoModal;
