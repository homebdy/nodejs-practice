const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';

exports.verify = async (ctx, next) => {
    var token = ctx.request.headers['token'];
    jwt.verify(token, SECRET_KEY, (error, decode) => {
        if(error) {
            ctx.body = '로그인이 필요합니다.';
            return;
        }
        next();
    })
}