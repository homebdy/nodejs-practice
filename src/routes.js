const Router = require('@koa/router');
const router = new Router();
const multer = require('@koa/multer');
const path = require('path');
const upload = multer({
    dest: path.resolve(__dirname, '../', 'storage')
})

const { myLogging } = require('./middleware/logging');
const { verify } = require('./middleware/auth');

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller')
const apiFeedController = require('./api/feed/controller');

router.use(myLogging); // 무조건 이 middleware을 거치고 가주세요..

// 순서를 맞춰야함 -> 파라미터 x 주소 먼저
router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
router.get('/file/:id', require('./api/file/controller').download);

router.get('/', webController.home);
router.get('/api/page/:page', webController.page);

router.post('/api/user/register', apiUserController.register);
router.post('/api/user/login', apiUserController.login);

router.use(verify);
router.get('/api/user/:id', apiUserController.info);

router.get('/api/feed', apiFeedController.index);
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router;