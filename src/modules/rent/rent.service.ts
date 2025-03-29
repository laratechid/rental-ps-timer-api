import { Response } from "express"
import { RentDto } from "../../dto/rent.dto"
import { RentRepository } from "./rent.repository"

export class RentService{
    private rentRepository: RentRepository
    constructor(rentRepository: RentRepository){
        this.rentRepository = rentRepository
    }
    async storeData(res: Response, payload: RentDto){
        try {
            await this.rentRepository.store(payload)
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