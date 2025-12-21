import { Request, Response, Router } from "express";
import { RentService } from "./rent.service";
import { RentDto } from "../../dto/rent.dto";
import { RentRepository } from "./rent.repository";
import { AppDataSource } from "../../config/mysql";
import { DateRangeDto } from "../../dto/date-range.dto";

const route = Router()

class Route {
    static rentRepository = new RentRepository(AppDataSource)
    private static rentService = new RentService(this.rentRepository)
    static async store(req: Request, res: Response) {
        const payload = req.body as RentDto
        await this.rentService.storeData(res, payload)
        return
    }
    static async incomes(req: Request, res: Response) {
        const payload = req.body as DateRangeDto
        await this.rentService.incomes(res, payload)
        return
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params
        await this.rentService.delete(res, +id)
        return
    }
}

export const rentRoute = [
    route.get("/delete/:id", (req, res) => Route.delete(req, res)),
    route.post("/store", (req, res) => Route.store(req, res)),
    route.post("/incomes", (req, res) => Route.incomes(req, res)),
]