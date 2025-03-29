import { DataSource, Repository } from "typeorm";
import { Rent } from "../../model/rent.entity";

export class RentRepository{
    private rentRepository: Repository<Rent>
    constructor(db: DataSource){
        this.rentRepository = db.getRepository(Rent)
    }

    store(entity: Rent){
        return this.rentRepository.save(entity)
    }
}