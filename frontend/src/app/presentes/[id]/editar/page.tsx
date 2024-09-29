'use client'

import { Presente } from "@/types";
import { useState } from "react";

interface IParams {
    id: string;
}

const EditarPresente = ({ params }: { params: IParams }) => {
    const { id } = params;
    const [presente, setPresente ] = useState<Presente>()

    return (
        <div>
            <h1>Editar Presente</h1>
        </div>
    )
}

export default EditarPresente;