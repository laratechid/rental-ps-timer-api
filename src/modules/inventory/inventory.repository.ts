import { DataSource, FindOneOptions, Repository } from "typeorm"
import { Inventory } from "../../model/enventory.entity"

export class InventoryRepository {
    private inventoryRepository: Repository<Inventory>
    constructor(db: DataSource) {
        this.inventoryRepository = db.getRepository(Inventory)
    }

    getAll() {
        return this.inventoryRepository.find()
    }
    
    findOne(opt : FindOneOptions<Inventory>) {
        return this.inventoryRepository.findOne(opt)
    } 

    update(e: Inventory) {
        console.log(e)
        return this.inventoryRepository.update(e.id, e)
    }
}