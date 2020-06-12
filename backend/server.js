//requires 
const express = require('express');
const path  = require('path');
const expHbs = require('express-handlebars');
const PORT = 8018;
const bodyParser = require('body-parser');


//Initialization 
const app = express();


//Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




//Engine views Config
app.set('view engine', "handlebars");
app.engine("handlebars", expHbs({
  layoutsDir: path.join(__dirname, "views/layouts"),
  defaultLayout: "layout",
}));
app.set("views", path.join(__dirname, "views"));
//------------------------------------

app.use('/user', require('./routes/user'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.get('/', (req, res) => {
  res.render("index");
})




app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})
