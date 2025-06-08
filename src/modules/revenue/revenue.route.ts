import { Request, Response, Router } from "express";
import { AppDataSource } from "../../config/mysql";
import { DateRangeDto } from "../../dto/date-range.dto";
import { RentRepository } from "../rent/rent.repository";
import { CanteenRepository } from "../canteen/canteen.repository";
import { RevenueService } from "./revenue.service";
import moment from "moment";

const route = Router()

class Route {
    static rentRepository = new RentRepository(AppDataSource)
    static canteenRepository = new CanteenRepository(AppDataSource)
    private static revenueService = new RevenueService(this.rentRepository, this.canteenRepository)

    static async today(res: Response) {
        const payload = new DateRangeDto()
        const dateNow = new Date()
        payload.startDate = dateNow
        payload.endDate = dateNow
        await this.revenueService.incomes(res, payload)
        return
    }

    static async yesterday(res: Response) {
        const payload = new DateRangeDto()
        const dateNow = new Date()
        const yesterday = moment(dateNow).subtract(1, "day").toDate()
        payload.startDate = yesterday
        payload.endDate = yesterday
        await this.revenueService.incomes(res, payload)
        return
    }

    static async incomes(req: Request, res: Response) {
        const payload = req.body as DateRangeDto
        await this.revenueService.incomes(res, payload)
        return
    }
}

export const revenueRoute = [
    route.post("", (req, res) => Route.incomes(req, res)),
    route.get("/today", (_req, res) => Route.today(res)),
    route.get("/yesterday", (_req, res) => Route.yesterday(res))
]