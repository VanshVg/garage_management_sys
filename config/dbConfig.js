import mysql from 'mysql2';
import { config } from 'dotenv';
config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dateStrings: true,
    multipleStatements:true
}).promise()

export default conn;