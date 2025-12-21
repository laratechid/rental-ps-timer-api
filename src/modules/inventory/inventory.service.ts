import { Response } from "express"
import { InventoryRepository } from "./inventory.repository"
import { FindOneOptions, Raw } from "typeorm"
import { Inventory } from "../../model/enventory.entity"
import { UpdateInventoryDto } from "../../dto/inventory.dto"

export class InventoryService {
    private inventoryRepository: InventoryRepository
    constructor(inventoryRepository: InventoryRepository) {
        this.inventoryRepository = inventoryRepository
    }
    async update(res: Response, dto: UpdateInventoryDto) {
        try {
            const { item, stock } = dto
            const optFetchStock: FindOneOptions<Inventory> = { where: { item: Raw(alias => `LOWER(${alias}) = LOWER(:item)`, { item }), }, }
            const e = await this.inventoryRepository.findOne(optFetchStock)
            e.stock = stock
            e.remaining = stock
            e.lastRestockAt = new Date()
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
}