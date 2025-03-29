import { Request, Response, Router } from "express";
import { RentService } from "./rent.service";
import { RentDto } from "../../dto/rent.dto";
import { RentRepository } from "./rent.repository";
import { AppDataSource } from "../../config/mysql";

const route = Router()

class Route {
    static rentRepository = new RentRepository(AppDataSource)
    private static rentService = new RentService(this.rentRepository)
    static async store(req: Request, res: Response){
        const payload = req.body as RentDto
        await this.rentService.storeData(res, payload)
        return
    }
}

export const rentRoute = [
    route.post("/store", (req, res)=> Route.store(req, res))
]