const { Sequelize } = require("sequelize");
import { DB, USERNAME, PASSWORD, HOST } from "@env";

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres' 
});

export const testingDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}