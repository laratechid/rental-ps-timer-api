import { Response } from "express"
import moment from "moment-timezone"
import { CanteenRepository } from "./canteen.repository"
import { DateRangeDto } from "../../dto/date-range.dto"
import { CanteenDto } from "../../dto/canteen.dto"
import { InventoryRepository } from "../inventory/inventory.repository"
import { FindOneOptions, Raw } from "typeorm"
import { Inventory } from "../../model/enventory.entity"
import { formatDateTime } from "../../helper/time"

export class CanteenService {
    private canteenRepository: CanteenRepository
    private inventoryRepository: InventoryRepository
    constructor(canteenRepository: CanteenRepository, inventoryRepository: InventoryRepository) {
        this.canteenRepository = canteenRepository,
            this.inventoryRepository = inventoryRepository
    }
    async storeData(res: Response, payload: CanteenDto) {
        try {
            var itemParams: string = payload.item
            var decrement: number = 1
            if (payload.item.toLowerCase() == "mie double"){
                itemParams = "mie"
                decrement = 2
            }
            const optFetchStock: FindOneOptions<Inventory> = { where: { item: Raw(alias => `LOWER(${alias}) = LOWER(:item)`, { item: itemParams }), }, }
            await this.canteenRepository.store(payload)
            const e = await this.inventoryRepository.findOne(optFetchStock)
            e.remaining = (e.remaining - decrement)
            await this.inventoryRepository.update(e)
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