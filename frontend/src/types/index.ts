export type Convidado = {
    id: string,
    nome: string,
    confirmado: boolean,
    quant_familia: number,
    telefone: string,
    user_id: string,
    presentes: Presente[]
}

export type Presente = {
    id: string,
    nome: string,
    descricao?: string,
    image?: string,
    convidado_id?: string,
    selecionado: boolean,
    user_id: string,
    valor?: number
}
