import { Response } from "express"
import { DateRangeDto, RentDto } from "../../dto/rent.dto"
import { RentRepository } from "./rent.repository"
import moment from "moment"

export class RentService{
    private rentRepository: RentRepository
    constructor(rentRepository: RentRepository){
        this.rentRepository = rentRepository
    }
    async storeData(res: Response, payload: RentDto){
        try {
            await this.rentRepository.store(payload)
            res.status(200)
            res.send('ok')
            return
        } catch (error) {
            res.status(500)
            res.send('error')
            return
        }
    }

    async incomes(res: Response, dto: DateRangeDto){
        try {
            const startDate = moment(dto.startDate).startOf("day").toDate()
            const endDate = moment(dto.endDate).endOf("day").toDate()
            const data = await this.rentRepository.incomes({ startDate, endDate })
            const grandTotal = data.reduce((sum, item) => sum + item.grandTotal, 0);
            const result = { data, total: grandTotal  }
            res.status(200)
            res.send(result)
            return
        } catch (error) {
            res.status(500)
            res.send('error')
            return
        }
    }
}