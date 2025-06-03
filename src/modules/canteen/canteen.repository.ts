import { Between, DataSource, Repository } from "typeorm"
import { Canteen } from "../../model/canteen.entity"
import { DateRangeDto } from "../../dto/date-range.dto"

export class CanteenRepository{
    private canteenRepository: Repository<Canteen>
    constructor(db: DataSource){
        this.canteenRepository = db.getRepository(Canteen)
    }

    store(entity: Canteen){
        return this.canteenRepository.save(entity)
    }

    incomes({ startDate, endDate }: DateRangeDto){
        return this.canteenRepository.find({ where: { createdAt: Between(startDate, endDate) } })
    }
}