import { Request, Response, Router } from "express";
import { AppDataSource } from "../../config/mysql";
import { DateRangeDto } from "../../dto/date-range.dto";
import { CanteenRepository } from "./canteen.repository";
import { CanteenService } from "./canteen.service";
import { CanteenDto } from "../../dto/canteen.dto";

const route = Router()

class Route {
    static canteenRepository = new CanteenRepository(AppDataSource)
    private static canteenService = new CanteenService(this.canteenRepository)
    static async store(req: Request, res: Response) {
        const payload = req.body as CanteenDto
        await this.canteenService.storeData(res, payload)
        return
    }
    static async incomes(req: Request, res: Response) {
        const payload = req.body as DateRangeDto
        await this.canteenService.incomes(res, payload)
        return
    }
}

export const canteenRoute = [
    route.post("/store", (req, res) => Route.store(req, res)),
    route.post("/incomes", (req, res) => Route.incomes(req, res))
]