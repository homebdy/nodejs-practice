const {pool} = require('../../data')

exports.create = async (user, image, content) => {
    const query = `INSERT INTO feed
    (user_id, image_id, content) 
    VALUES (?, ?, ?)`;
    return await pool(query, [user, image, content]);
}

exports.show = async (id) => {
    const query = `SELECT * FROM feed WHERE id = ?`;
    let result = await pool(query, [id]);
    return (result.length < 0) ? null : result[0];
}

exports.getAllFeed = async () => {
    const query = `select * from feed`;
    let result = await pool(query);
    return result;
}

exports.update = async (id, modifications) => {
    const query = `UPDATE feed
    SET content = ?
    WHERE id = ?`;
    return await pool(query, [modifications, id]);
}

exports.delete = async (id) => {
    const query = `DELETE FROM feed
    WHERE id = ?`;
    return await pool(query, [id]);
}