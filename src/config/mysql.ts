import { DataSource } from "typeorm"
import { Rent } from "../model/rent.entity"
import { env } from "./env"
import signale from "signale"
import { Canteen } from "../model/canteen.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: env.mysql.host,
    port: env.mysql.port,
    username: env.mysql.username,
    password: env.mysql.password,
    database: env.mysql.database,
    entities: [Rent, Canteen],
    synchronize: true,
    connectTimeout: 20000
})

export async function DBConn(){
    try {
        await AppDataSource.initialize()
        console.log("database ok")
    } catch (error) {
        signale.info({
            type: "mysql",
            host: env.mysql.host,
            port: env.mysql.port,
            username: env.mysql.username,
            password: env.mysql.password,
            database: env.mysql.database,
        })
        console.log(error)
    }
}