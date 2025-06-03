import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "canteen" })
export class Canteen {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    item: string

    @Column({ nullable: true })
    grandTotal: number

    @CreateDateColumn()
    createdAt?: Date
}