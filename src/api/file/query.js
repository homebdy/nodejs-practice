const { pool } = require('../../data')

/**
 * 업로드한 파일을 DB에 저장
 * @param {String} name 
 * @param {String} path 
 * @param {String} size 
 * @returns 
 */
exports.create = async (name, path, size) => {
    const query = `INSERT INTO files
    (original_name, file_path, file_size)
    VALUES(?,?,?)`;

    return await pool(query, [name, path, size]);
}

/**
 * 파일을 DB로부터 받아와 다운로드
 * @param {number} id 
 * @returns 
 */
exports.show = async (id) => {
    const query = `SELECT * FROM files WHERE id = ?`;
    let result = await pool(query, [id]);

    return (result.length < 0) ? null : result[0];
}