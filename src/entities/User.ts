import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Convidado } from "./Convidado";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    nome_parceiro: string

    @Column()
    data_casamento: string

    @OneToMany(() => Convidado, convidado => convidado.user)
    convidados?: Convidado[]

    constructor() {
        this.id = 0
        this.nome = ''
        this.email = ''
        this.nome_parceiro = ''
        this.data_casamento = ''
    }

}