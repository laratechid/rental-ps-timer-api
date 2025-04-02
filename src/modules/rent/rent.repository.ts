import { Between, DataSource, Repository } from "typeorm";
import { Rent } from "../../model/rent.entity";
import { DateRangeDto } from "../../dto/rent.dto";

export class RentRepository{
    private rentRepository: Repository<Rent>
    constructor(db: DataSource){
        this.rentRepository = db.getRepository(Rent)
    }

    store(entity: Rent){
        return this.rentRepository.save(entity)
    }

    incomes({ startDate, endDate }: DateRangeDto){
        return this.rentRepository.find({ where: { createdAt: Between(startDate, endDate) } })
    }
}