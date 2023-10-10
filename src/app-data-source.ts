import { DataSource } from "typeorm"
import dotenv from "dotenv"
//initialisation dotenv
dotenv.config();

const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number( process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    migrationsTableName: "migrations",
    logging: true,
    synchronize: false,
});
export default myDataSource;