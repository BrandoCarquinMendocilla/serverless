const mysql = require('mysql2');

const conexionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    port: '3306',

    database: 'serverless',
    debug: true
});

export default conexionDB;