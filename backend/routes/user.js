const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send(`<h1>User Index Route </h1>
    <a href="/singin" >Login</a>
    <a href="/singup">Register</a>`);
});

router.get('/singin', (req, res) => {
    res.send(`<h1>Form Sing In User  Route </h1>
    <a href="/singin" >Login</a>
    <a href="/singup">Register</a>`)
})



module.exports = router;