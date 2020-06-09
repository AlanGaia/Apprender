//requires 
const express = require('express');
const path  = require('path');
const expHbs = require('express-handlebars');
const PORT = 8018;
//middlewares


//initialization 
const app = express();


//Engine views Config
app.set('view Engine', "handlebars");
app.set("handlebars", expHbs({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "main",
}));
app.set("views", path.join(__dirname, "views"));
//------------------------------------


//Routes
app.get('/', (req, res) => {
    res.render("")
})
app.use('/user', require('./routes/user'))


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})
