import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "inventory" })
export class Inventory {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    item: string

    @Column()
    stock: number

    @Column()
    remaining: number

    @CreateDateColumn()
    lastRestockAt?: Date

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}