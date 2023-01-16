const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const render = require('koa-ejs');
const path = require('path')

const port = process.env.PORT || 3000;

app.use(bodyParser({formLimit: '5mb'}));

app.use(require('koa-static')(`${__dirname}/public`));
router.use(require('./src/routes').routes());
app.use(router.routes());
app.use(router.allowedMethods());

// 템플릿 엔진 설정
render(app, {
    layout: 'layouts/template',
    root: path.join(__dirname, "/views"),
    viewExt: 'ejs', cache:false
});

app.listen(port, () => {
    console.log(`웹 서버 구동 중... ${port}`);
});