import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Convidado } from "./Convidado";
import { Presente } from "./Presente";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    nome_parceiro: string

    @Column()
    data_casamento: string

    @OneToMany(() => Convidado, convidado => convidado.user)
    convidados?: Convidado[]

    @OneToMany(() => Presente, presente => presente.user)
    presentes?: Presente[]

    constructor() {
        this.id = 0
        this.nome = ''
        this.email = ''
        this.nome_parceiro = ''
        this.data_casamento = ''
    }

}