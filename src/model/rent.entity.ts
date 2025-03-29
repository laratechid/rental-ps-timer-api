import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RentUnit } from "../enum/rent.enum";

@Entity({ name: "rent" })
export class Rent {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({ enum: RentUnit, type: 'enum' })
    unit: RentUnit

    @Column()
    playFor: string

    @Column({ nullable: true })
    grandTotal: number

    @CreateDateColumn()
    createdAt?: Date
}