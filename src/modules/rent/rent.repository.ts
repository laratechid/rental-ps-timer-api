import { Between, DataSource, Repository } from "typeorm";
import { Rent } from "../../model/rent.entity";
import { DateRangeDto } from "../../dto/date-range.dto";

export class RentRepository {
    private rentRepository: Repository<Rent>
    constructor(db: DataSource) {
        this.rentRepository = db.getRepository(Rent)
    }

    store(entity: Rent) {
        return this.rentRepository.save(entity)
    }

    delete(id: number) {
        return this.rentRepository.delete(id)
    }

    incomes({ startDate, endDate }: DateRangeDto) {
        return this.rentRepository.find({ where: { createdAt: Between(startDate, endDate) } })
    }
}