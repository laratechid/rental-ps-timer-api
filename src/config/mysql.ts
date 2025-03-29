import { DataSource } from "typeorm"
import { Rent } from "../model/rent.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "lts_game",
    entities: [Rent],
    synchronize: true
})

export async function DBConn(){
    try {
        await AppDataSource.initialize()
        console.log("database ok")
    } catch (error) {
        console.log(error)
    }
}