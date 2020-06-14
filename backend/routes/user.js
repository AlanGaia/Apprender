const {Router} = require('express');
const router = Router();
const {index, signin, register} = require('../controller/UserController');





//GET Routes - Controllers Methods
router.get('/', index);
router.get('/signin', signin)

//POST Routes - Controllers Methods
router.post('/signin', signin)
router.post('/register', register);



module.exports = router;