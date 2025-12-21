import { Response } from "express"
import moment from "moment-timezone"
import { DateRangeDto } from "../../dto/date-range.dto"
import { RentRepository } from "../rent/rent.repository"
import { CanteenRepository } from "../canteen/canteen.repository"
import { InventoryRepository } from "../inventory/inventory.repository"
import { formatDateTime, getDateRangeLabel } from "../../helper/time"

export class RevenueService {
    private rentRepository: RentRepository
    private canteenRepository: CanteenRepository
    private inventoryRepository: InventoryRepository
    constructor(rentRepository: RentRepository, canteenRepository: CanteenRepository, inventoryRepository: InventoryRepository) {
        this.rentRepository = rentRepository
        this.canteenRepository = canteenRepository
        this.inventoryRepository = inventoryRepository
    }

    async incomes(res: Response, dto: DateRangeDto) {
        try {
            const dateLabel = getDateRangeLabel(dto.startDate, dto.endDate)
            const startDate = moment(dto.startDate).startOf("day").add(6, "hour").toDate();
            const endDate = moment(dto.endDate).endOf("day").add(6, "hour").toDate();
            const rent = await this.rentRepository.incomes({ startDate, endDate });
            const canteen = await this.canteenRepository.incomes({ startDate, endDate });
            const inventory = await this.inventoryRepository.getAll()
            const formatData = (data: any[]) => data.map(item => ({
                ...item,
                createdAt: formatDateTime(item.createdAt)
            }));
            const rentTotal = rent.reduce((sum, item) => sum + item.grandTotal, 0);
            const canteenTotal = canteen.reduce((sum, item) => sum + item.grandTotal, 0);
            const rentResult = { data: formatData(rent), total: rentTotal };
            const canteenResult = { data: formatData(canteen), total: canteenTotal };
            const totalRevenue = canteenResult.total + rentResult.total
            res.render("revenue", { rental: rentResult, canteen: canteenResult, inventory, totalRevenue, dateLabel })
        } catch (error) {
            res.status(500).send('error');
        }
    }
}