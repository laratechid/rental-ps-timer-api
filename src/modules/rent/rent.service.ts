import { Response } from "express"
import { RentDto } from "../../dto/rent.dto"
import { RentRepository } from "./rent.repository"
import moment from "moment-timezone"
import { DateRangeDto } from "../../dto/date-range.dto"
import { formatDateTime } from "../../helper/time"

export class RentService {
    private rentRepository: RentRepository
    constructor(rentRepository: RentRepository) {
        this.rentRepository = rentRepository
    }
    async storeData(res: Response, payload: RentDto) {
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

    async delete(res: Response, id: number) {
        console.log(id)
        try {
            await this.rentRepository.delete(id)
            res.status(200)
            res.send('ok')
            return
        } catch (error) {
            res.status(500)
            res.send('error')
            return
        }
    }

    async incomes(res: Response, dto: DateRangeDto) {
        try {
            const startDate = moment(dto.startDate).startOf("day").toDate();
            const endDate = moment(dto.endDate).endOf("day").toDate();
            const data = await this.rentRepository.incomes({ startDate, endDate });
            const formattedData = data.map(item => ({
                ...item,
                createdAt: formatDateTime(item.createdAt)
            }));
            const grandTotal = data.reduce((sum, item) => sum + item.grandTotal, 0);
            const result = { data: formattedData, total: grandTotal };
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send('error');
        }
    }
}