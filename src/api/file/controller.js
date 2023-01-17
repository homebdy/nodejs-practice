exports.upload = ctx => {
    let file = ctx.request.file;
    console.log(file)
    console.log(ctx.request);
    ctx.body = file;
}