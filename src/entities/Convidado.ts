import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('convidados')
export class Convidado {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    nome: string

    @Column()
    quant_familia: number

    @Column()
    confirmado: boolean

    @Column()
    presente: string

    @Column()
    telefone: string

    @ManyToOne(() => User, user => user.convidados)
    @JoinColumn({name: 'user_id'})
    user?: User

    constructor() {
        this.id = 0
        this.nome = ''
        this.quant_familia = 0
        this.presente = ''
        this.confirmado = false
        this.telefone = ''
    }
}