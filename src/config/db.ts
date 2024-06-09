import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'; 
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false
});  // el ! al final garantiza al codigo que siempre va a haber un valor

export default db;