import { AppDataSource } from "../config/mysql"
import { Inventory } from "../model/enventory.entity"

export async function runInventorySeeder() {
    const inventoryRepo = AppDataSource.getRepository(Inventory)
    const inventoryItems: string[] = [
        "Kopi",
        "NutriSari",
        "SegarSari",
        "Marimas",
        "Jasjus",
        "Sisri",
        "Frenta",
        "Mie",
    ];
    for await (const element of inventoryItems) {
        const exists = await inventoryRepo.findOneBy({ item: element })
        if (!exists) {
            const item = inventoryRepo.create({
                item: element,
                stock: 100,
                remaining: 100
            })
            await inventoryRepo.save(item)
        }
    }
    console.log("inventory ok")
}