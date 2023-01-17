const {pool} = require('../../data')

/**
 * 회원가입 시 회원을 DB에 저장한다.
 * @param {String} email 
 * @param {String} password 
 * @param {String} name 
 * @returns 
 */
exports.register = async (email, password, name) => {
    const query = `INSERT INTO user
    (email, password, name) 
    VALUES (?,?,?)`;
    return await pool(query, [email, password, name]);
}

/**
 * 로그인 요청시 일차하는 사용자 정보가 있는지 확인한다.
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
exports.login = async (email, password) => {
    const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    let result = await pool(query, [email, password]);
    return (result.length < 0) ? null : result[0];
}