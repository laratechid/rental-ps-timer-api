import { Response } from "express"
import moment from "moment-timezone"
import { DateRangeDto } from "../../dto/date-range.dto"
import { RentRepository } from "../rent/rent.repository"
import { CanteenRepository } from "../canteen/canteen.repository"

export class RevenueService {
    private rentRepository: RentRepository
    private canteenRepository: CanteenRepository
    constructor(rentRepository: RentRepository, canteenRepository: CanteenRepository) {
        this.rentRepository = rentRepository
        this.canteenRepository = canteenRepository
    }

    async incomes(res: Response, dto: DateRangeDto) {
        try {
            const startDate = moment(dto.startDate).startOf("day").add(6, "hour").toDate();
            const endDate = moment(dto.endDate).endOf("day").add(6, "hour").toDate();
            console.log(startDate, endDate)
            const rent = await this.rentRepository.incomes({ startDate, endDate });
            const canteen = await this.canteenRepository.incomes({ startDate, endDate });
            const formatData = (data: any[]) => data.map(item => ({
                ...item,
                createdAt: moment(item.createdAt)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm:ss")
            }));
            const rentTotal = rent.reduce((sum, item) => sum + item.grandTotal, 0);
            const canteenTotal = canteen.reduce((sum, item) => sum + item.grandTotal, 0);
            const rentResult = { data: formatData(rent), total: rentTotal };
            const canteenResult = { data: formatData(canteen), total: canteenTotal };
            const totalRevenue = canteenResult.total + rentResult.total
            res.status(200).send({ rental: rentResult, canteen: canteenResult, totalRevenue });
        } catch (error) {
            res.status(500).send('error');
        }
    }
}