exports.info = (ctx, next) => {
    let id = ctx.param.id;
    ctx.body= `${id} 회원에 대한 정보`;
}

exports.register = async (ctx, next) => {
    // 회원가입 처리 모듈
    let token = await generateToken({name: 'my-name'});
    ctx.body = token;
}

exports.login = async ctx => {
    // 로그인 모듈
    let { id, pw } = ctx.request.body;
    console.log(ctx);
    let result = "";

    if (id === 'admin' && pw === '1234') {
        result = await generateToken({name: 'abc'});
    } else {
        result = "아이디 혹은 패스워드가 올바르지 않습니다.";
    }
    ctx.body = result;
} 

/**
 * 토큰 생성
 */
const jwt = require('jsonwebtoken');

let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.APP_KEY, (error, token) => {
            if(error) { reject(error) };
            resolve(token);
            // (error) ? reject(error) : resolve(token);
        })
    }
    )
}