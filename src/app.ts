import express, { json, Response } from "express";
import { rentRoute } from "./modules/rent/rent.route";
import cors from "cors"
import { DBConn } from "./config/mysql";

async function bootstrap() {
    await DBConn()
    const app = express()
    app.use(cors({ origin: "*" }));
    app.use(json())
    app.use('/rent', rentRoute)
    app.get('/', (_req, res: Response) => { res.send('ok') })
    app.listen(8900, ()=> console.log("App run on port 8900"))
}

bootstrap()