import { RentUnit } from "../enum/rent.enum"

export class RentDto{
        unit: RentUnit
        playFor: string
        grandTotal: number
}

export class DateRangeDto{
        startDate: Date
        endDate: Date
}