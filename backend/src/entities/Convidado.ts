import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Presente } from "./Presente";

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

    @OneToMany(() => Presente, presente => presente.convidado)
    presente?: Presente[]

    @Column()
    telefone: string

    @ManyToOne(() => User, user => user.convidados)
    @JoinColumn({name: 'user_id'})
    user?: User

    constructor() {
        this.id = 0
        this.nome = ''
        this.quant_familia = 0
        this.confirmado = false
        this.telefone = ''
    }
}