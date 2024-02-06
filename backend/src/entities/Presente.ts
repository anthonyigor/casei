import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Convidado } from "./Convidado";
import { User } from "./User";

@Entity('presentes')
export class Presente {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    nome: string

    @Column()
    descricao: string

    @Column()
    selecionado: boolean

    @ManyToOne(() => Convidado, convidado => convidado.presente)
    @JoinColumn({name: 'convidado_id'})
    convidado?: Convidado

    @ManyToOne(() => User, user => user.presentes)
    @JoinColumn({name: 'user_id'})
    user?: User

}