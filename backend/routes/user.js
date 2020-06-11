const {Router} = require('express');
const router = Router();
const {index, signin} = require('../controller/UserController');

router.get('/', index);

router.get('/signin', signin)



module.exports = router;