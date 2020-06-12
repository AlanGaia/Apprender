
const index = (req, res) => {
  res.send('hola index')
}

const signin = (req, res) => {
  res.status(200).send('user Register Form');
}

const register = (req, res) => {
  const {name, email, password, confirmPassword} = req.body;

  if (!name|| !email || !password || !confirmPassword) {
    // return res.status(400).send({
    //   success: false,
    //   message: 'Solicitud mal hecha, Por favor complete TODOS los campos'
    // });
    return res.render('register', {
      layout: 'black',
      message: 'Solicitud mal hecha, Por favor complete TODOS los campos',
      success: false,
      status: 400
    });
  }


  res.status(200).send('cuenta creada :P')
}


module.exports = 
{
  index,
  signin,
  register
}