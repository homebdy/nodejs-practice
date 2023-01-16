const formetter = require("../../formatter/date")

exports.index = (ctx, next) => {
    let query = ctx.query;
    let result = formetter.isNewFeed('2023-01-12 15:11:23');
    console.log("새 글인가요?"+ result);
    ctx.body = query;
}

exports.store = (ctx, next) => {
    let body = ctx.request.body
    ctx.body = body;
}

exports.show = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 상세`
}

exports.update = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 수정`
}

exports.delete = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 피드 삭제`
}