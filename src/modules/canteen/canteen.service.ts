import { Response } from "express"
import moment from "moment-timezone"
import { CanteenRepository } from "./canteen.repository"
import { DateRangeDto } from "../../dto/date-range.dto"
import { CanteenDto } from "../../dto/canteen.dto"

export class CanteenService {
    private canteenRepository: CanteenRepository
    constructor(canteenRepository: CanteenRepository) {
        this.canteenRepository = canteenRepository
    }
    async storeData(res: Response, payload: CanteenDto) {
        try {
            await this.canteenRepository.store(payload)
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
            const data = await this.canteenRepository.incomes({ startDate, endDate });
            const formattedData = data.map(item => ({
                ...item,
                createdAt: moment(item.createdAt)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")
            }));
            const grandTotal = data.reduce((sum, item) => sum + item.grandTotal, 0);
            const result = { data: formattedData, total: grandTotal };
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send('error');
        }
    }
}