const jwt = require('jsonwebtoken');

exports.verify = async (ctx, next) => {
    try {
		ctx.request.decoded = jwt.verify(ctx.request.headers.token, process.env.APP_KEY);
		return next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
	  		ctx.status = 419;
            ctx.body = {
                "message":'토큰 만료'
            }
            return;
		}
        ctx.status = 401
        ctx.body = {
            "message":'유효하지 않은 토큰'
        }
        return;
	}
}