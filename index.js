const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

app.use(bodyParser({formLimit: '5mb'}));

app.use(require('koa-static')(`${__dirname}/public`));
router.use(require('./src/routes').routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log(`웹 서버 구동 중... ${port}`);
});