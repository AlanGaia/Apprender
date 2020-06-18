//requires
const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const PORT = 8018;
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const learnRouter = require("./routes/learn");
const teachRouter = require("./routes/teach");
const expSession = require("express-session");
const cors = require("cors");

//Initialization
const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Engine views Config
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  expHbs({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "layout",
  })
);

app.set("views", path.join(__dirname, "views"));

//------------------------------------
//Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expSession({
    secret: "I don't know about secrets",
    resave: false,
    saveUninitialized: false,
  })
);

//Main Route /
app.get("/", (req, res) => {
  //If it is User redirect Main Site
  if (req.session.loggedUser) {
    res.render("welcome", {
      layout: "logged",
      user: req.session.loggedUser,
    });
    //If it is Guest redirect public site
  } else {
    res.render("index");
  }
});

app.use("/user", userRouter);
app.use("/learn", learnRouter);
app.use("/teach", teachRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
