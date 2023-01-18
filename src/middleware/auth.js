const jwt = require('jsonwebtoken');

exports.verify = async (ctx, next) => {
    var token = ctx.request.headers['token'];
    await jwt.verify(token, process.env.APP_KEY, async (error, decoded) => {
        if(error) {
            ctx.body = "에러";
            return
        }
        ctx.request.decoded = decoded;
        await next();
    })
}