import { DB, USERNAME, PASSWORD, HOST } from "@env";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";

const dialect : Dialect = "postgres"

const sequelize = new Sequelize({
    dialect: dialect,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    database: DB
});

export const testingDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}