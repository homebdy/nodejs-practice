exports.index = (ctx, next) => {
    let query = ctx.query;
    ctx.body = "안뇽";
}

exports.store = (ctx, next) => {
    let body = ctx.request.body;
    console.log(ctx.request);
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