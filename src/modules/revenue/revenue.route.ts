import { Request, Response, Router } from "express";
import { AppDataSource } from "../../config/mysql";
import { DateRangeDto } from "../../dto/date-range.dto";
import { RentRepository } from "../rent/rent.repository";
import { CanteenRepository } from "../canteen/canteen.repository";
import { RevenueService } from "./revenue.service";

const route = Router()

class Route {
    static rentRepository = new RentRepository(AppDataSource)
    static canteenRepository = new CanteenRepository(AppDataSource)
    private static revenueService = new RevenueService(this.rentRepository, this.canteenRepository)

    static async incomes(req: Request, res: Response) {
        const payload = req.body as DateRangeDto
        await this.revenueService.incomes(res, payload)
        return
    }
}

export const revenueRoute = [
    route.post("", (req, res) => Route.incomes(req, res))
]