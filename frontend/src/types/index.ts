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
    valor?: number,
    url_produto?: string,
    tipo_selecao?: string,
    mensagem?: string,
    convidado?: Convidado,
    user?: User
}

export type UserCasamento = {
    nome: string
    nome_parceiro: string
    data_casamento: string, 
    lat: string,
    lon: string,
    endereco: string, 
    horario: string,
    convite_url: string,
    mensagem_agradecimento?: string
}

export type User = {
    id: string,
    nome: string,
    email: string,
    nome_parceiro: string,
    data_casamento: string,
    password: string,
    endereco: string,
    endereco_entrega: string,
    horario: string,
    lat: string,
    lon: string
    chave_pix: string,
    cidade: string,
    telefone: string,
    mensagem_agradecimento?: string
}
