const {register, login} = require('./query')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.info = (ctx, next) => {
    let id = ctx.param.id;
    ctx.body= `${id} 회원에 대한 정보`;
}

exports.register = async (ctx, next) => {
    // 회원가입 처리 모듈
    let { email, password, name } = ctx.request.body;
    let result = crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');

    let { affectedRows } = await register(email, result.toString('base64'), name);
    if (affectedRows > 0) {
        token = await generateToken({ name })
        ctx.body = {
            result: "ok",
            token: `${token}`
        }
    } else {
        ctx.body= { result: "fail" };
    }
}

exports.login = async ctx => {
    // 로그인 모듈
    let { email, password } = ctx.request.body;
    let result = crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');
    
    let item = await login(email, result.toString('base64'));
    if (item != null) {
        ctx.body = await generateToken({name: item.name});
    } else {
        ctx.body = {result: "아이디 혹은 패스워드가 올바르지 않습니다."};
    }
} 

/**
 * 토큰 생성
 */
let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.APP_KEY, (error, token) => {
            // if(error) { reject(error) };
            // resolve(token);
            (error) ? reject(error) : resolve(token);
        })
    }
    )
}