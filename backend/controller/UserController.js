
const index = (req, res) => {
  res.send('hola index')
}

const signin = (req, res) => {
  res.status(200).send('user Register Form');
}



module.exports = 
{
  index,
  signin
}