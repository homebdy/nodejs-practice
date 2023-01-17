const fs = require('fs');
const {create, show} = require('./query');

exports.upload = async (ctx) => {
    let file = ctx.request.file;
    console.log(file);

    let { affectedRows, insertId } = await create(file.originalname, file.path, file.size);
    if (affectedRows > 0) {
        ctx.body = {
            result:"ok",
            id: insertId
        }
    } else {
        ctx.body= {
            result: "fail",
        }
    }
}

exports.download = async ctx => {
    let { id } = ctx.request.params;
    
    let item = await show(id);

    ctx.response.set({"content-disposition": `attachment; filename=${item.original_name}`});
    ctx.statusCode = 200;
    ctx.body = fs.createReadStream(item.file_path);
    return ctx.response.body.toString('utf-8');
}