import express, { json, Response } from "express";
import { rentRoute } from "./modules/rent/rent.route";
import cors from "cors"
import { DBConn } from "./config/mysql";
import { env } from "./config/env";
import { canteenRoute } from "./modules/canteen/canteen.route";
import { revenueRoute } from "./modules/revenue/revenue.route";

async function bootstrap() {
    await DBConn()
    const app = express()
    app.use(cors({ origin: "*" }));
    app.use(json())
    app.use('/rent', rentRoute)
    app.use('/canteen', canteenRoute)
    app.use('/revenue', revenueRoute)
    app.get('/', (_req, res: Response) => { res.send('ok') })
    app.listen(env.app.port, () => console.log(`App run on port ${env.app.port}`))
}

bootstrap()