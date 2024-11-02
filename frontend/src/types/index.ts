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
    url_produto?: string
}

export type UserCasamento = {
    nome: string
    nome_parceiro: string
    data_casamento: string, 
    localizacao: string, 
    endereco: string, 
    horario: string
}

export type User = {
    id: string,
    nome: string,
    email: string,
    nome_parceiro: string,
    data_casamento: string,
    password: string,
    endereco: string,
    horario: string,
    localizacao: string,
    chave_pix: string,
    cidade: string
}
