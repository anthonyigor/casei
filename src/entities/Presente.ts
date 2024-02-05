import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Convidado } from "./Convidado";

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

}