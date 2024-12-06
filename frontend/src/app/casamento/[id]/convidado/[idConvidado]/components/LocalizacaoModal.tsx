'use client';

import { useEffect, useRef } from 'react';
import Modal from "@/app/components/Modal";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocalizacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    lat: number;
    lon: number;
}

const LocalizacaoModal: React.FC<LocalizacaoModalProps> = ({ isOpen, onClose, lat, lon }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const leafletMapRef = useRef<L.Map | null>(null);

    const markerIcon = new L.Icon({
        iconUrl: `/img/marker.png`,
        iconSize: [30, 30],
        iconAnchor: [12, 41],
      });


    useEffect(() => {
        if (isOpen && mapRef.current) {
            // Destroi o mapa anterior, se existir
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
            }

            // Cria uma nova instância do mapa
            leafletMapRef.current = L.map(mapRef.current).setView([lat, lon], 13);

            // Adiciona o tile layer ao mapa
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(leafletMapRef.current);

            // Adiciona o marcador ao mapa
            L.marker([lat, lon], { icon: markerIcon }).addTo(leafletMapRef.current);
        }

        // Cleanup ao fechar o modal
        return () => {
            if (leafletMapRef.current) {
                leafletMapRef.current.remove();
                leafletMapRef.current = null;
            }
        };
    }, [isOpen, lat, lon]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div
                ref={mapRef}
                style={{
                    position: 'relative',
                    height: '75vh',
                    width: '100%',
                }}
            />
        </Modal>
    );
}

export default LocalizacaoModal;
