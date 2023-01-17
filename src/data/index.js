require('dotenv').config();
const mysql = require('mysql2');

exports.connection = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnection: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

/**
 * 
 * connection pool 활용 방식
 * 
 * @param {String} queryString 쿼리 문열
 * @param {array} params 쿼리문의 ?에 들어갈 파라미터들
 * @returns 
 */
exports.pool = (queryString, params) => {
    return new Promise((resolve, reject) => {
        this.connection.query(queryString, params, (err, row, fields) => {
            (err) ? reject(err) : resolve(row)
        });
    })
}