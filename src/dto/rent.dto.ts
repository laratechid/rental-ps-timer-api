import { RentUnit } from "../enum/rent.enum"

export class RentDto {
        unit: RentUnit
        playFor: string
        note!: string
        grandTotal: number
}