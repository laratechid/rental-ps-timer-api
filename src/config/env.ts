import dotenv from "dotenv"
dotenv.config()


interface mysql {
    host: string
    port: number
    database: string
    username: string
    password: string
}

interface app {
    port: number
    env: string
}

type envType = {
    mysql: mysql
    app: app
}

export const env: envType = ({
    mysql: {
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        password: process.env.MYSQL_PASSWORD,
        username: process.env.MYSQL_USER
    },
    app: {
        port: +process.env.APP_PORT,
        env: process.env.APP_ENV
    }
})