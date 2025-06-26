import { Request, Response, Router } from "express";
import { AppDataSource } from "../../config/mysql";
import { InventoryRepository } from "../inventory/inventory.repository";
import { InventoryService } from "./inventory.service";
import { UpdateInventoryDto } from "../../dto/inventory.dto";

const route = Router()

class Route {
    static inventoryRepository = new InventoryRepository(AppDataSource)
    private static inventoryService = new InventoryService(this.inventoryRepository)
    static async update(req: Request, res: Response) {
        const payload = req.body as UpdateInventoryDto
        await this.inventoryService.update(res, payload)
        return
    }
}

export const inventoryRoute = [
    route.patch("/update", (req, res) => Route.update(req, res)),
]