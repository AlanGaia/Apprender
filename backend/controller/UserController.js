const mongodb = require('mongodb');
const mongoURL = "mongodb://localhost:27017";

const index = (req, res) => {
  res.send('hola index')
}

const signin = (req, res) => {
  res.status(200).send('user Register Form');
}

const register = (req, res, result) => {
  console.log(req.body);
  
  const {name, email, password, confirmPassword} = req.body;

  if (!name|| !email || !password || !confirmPassword) {
    return res.render('register', {
      layout: 'black',
      message: 'SECRET REGISTER FORM',
      success: false,
      status: 400
    });
  }

  // mongodb.MongoClient.connect(mongoURL, (err, client) => {
  //   if (err){

  //     result({
  //       success: false,
  //       message: 'Disculpa, El servidor esta en mantenimiento! Intente mas tarde'
  //     });
  //     client.close();
  //   } else{

  //     const database = client.db('apprenderdb');
  //     const usersCollection = database.collection('users');

  //     usersCollection.findOne({email: email}, (err, foundUser) => {
  //       if (err){

  //         result({
  //           success: false,
  //           message: 'Disculpa, Estamos trabajando en una actualización, Intente mas tarde'
  //         });
  //       } else{
  //         if (foundUser) {
  //           result({
  //             success: false,
  //             message: 'Email Registrado en Base de Datos, Inicie sesión'
  //           })
  //         }
  //       }
  //     })
  //   }
  // })


  // res.render('')
  res.send('llego ')
}


module.exports = 
{
  index,
  signin,
  register
}