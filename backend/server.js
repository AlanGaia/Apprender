//requires 
const express = require('express');
const path  = require('path');
const expHbs = require('express-handlebars');
const PORT = 8018;
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')


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
//Static Files
app.use(express.static(path.join(__dirname, 'public')))


app.use('/user', userRouter);


//Routes
app.get('/', (req, res) => {
  res.render("index");
})




app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})
