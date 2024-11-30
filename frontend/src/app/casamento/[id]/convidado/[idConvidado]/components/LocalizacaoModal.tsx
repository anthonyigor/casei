'use client'

import Modal from "@/app/components/Modal"
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface LocalizacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    lat: number;
    lon: number;
}

const LocalizacaoModal: React.FC<LocalizacaoModalProps> = ({ isOpen, onClose, lat, lon }) => {

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <MapContainer center={[lat, lon]} zoom={13} style={{height: '100vh', width: '100%'}}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[lat, lon]}>

                    </Marker>
            </MapContainer>
        </Modal>
        </>
    )
}

export default LocalizacaoModal;
