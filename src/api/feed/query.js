const {pool} = require('../../data')

/**
 * 글을 등록하면 DB에 등록한다.
 * @param {number} user_id
 * @param {number} image_id 
 * @param {String} content 글 내용
 * @returns 
 */
exports.create = async (user_id, image_id, content) => {
    const query = `INSERT INTO feed
    (user_id, image_id, content) 
    VALUES (?, ?, ?)`;
    return await pool(query, [user_id, image_id, content]);
}

/**
 * 특정 글이 존재하는지 확인하고 글이 존재할 경우 내용을 불러온다.
 * @param {number} id 
 * @returns 
 */
exports.getFeed = async (id) => {
    const query = `SELECT * FROM feed WHERE id = ?`;
    let result = await pool(query, [id]);
    return (result.length < 0) ? null : result[0];
}

/**
 * 등록되어 있는 모든 글을 불러온다.
 * @returns 
 */
exports.getAllFeed = async () => {
    const query = `select * from feed`;
    let result = await pool(query);
    return result;
}

/**
 * 선택한 글의 내용을 변경한다.
 * @param {number} id feed의 id (기본키)
 * @param {String} modifications 수정할 내용
 * @returns 
 */
exports.update = async (id, modifications) => {
    const query = `UPDATE feed
    SET content = ?
    WHERE id = ?`;
    return await pool(query, [modifications, id]);
}

/**
 * 선택한 글을 삭제한다.
 * @param {number} id 
 * @returns 
 */
exports.delete = async (id) => {
    const query = `DELETE FROM feed
    WHERE id = ?`;
    return await pool(query, [id]);
}