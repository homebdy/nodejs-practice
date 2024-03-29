const model = require('./query');

exports.index = async (ctx, next) => {
    // 전체 글 조회
    let result = await model.getAllFeed();
    ctx.response.body = result;
}

exports.store = async (ctx, next) => {
    // 글 작성 모듈
    let user_id = ctx.request.decoded.id
    let { image_id, content } = ctx.request.body;
    let { affectedRows, insertId } = await model.create(user_id, image_id, content);
    if (affectedRows > 0) {
        ctx.body = {
            result: "ok",
            id: insertId,
        }
        ctx.status = 201
    } else {
        ctx.body= { result: "fail" }
    }
}

exports.show = async (ctx, next) => {
    // 특정 글 조회 모듈
    let id = ctx.request.params.id;
    let item = await model.getFeed(id);
    if (item != null) {
        ctx.body = item;
    } else {
        ctx.body = "해당 게시물은 존재하지 않습니다.";
    }
}

exports.update = async (ctx, next) => {
    // 글 수정 모듈
    let id = ctx.params.id;
    let { content } = ctx.request.body;
    let { affectedRows } = await model.update(id, content);
    if (affectedRows > 0) {
        result = `${id} 피드 수정`;
    } else {
        result = { result: "fail" }
    }
    ctx.body = result;
}

exports.delete = async (ctx, next) => {
    //글 삭제 모듈
    let id = ctx.params.id;
    let { affectedRows } = await model.delete(id);
    let result = "";

    if (affectedRows > 0) {
        result = `${id} 피드 삭제`
    } else {
        result = { result: "fail" }
    }
    ctx.body = result;
}