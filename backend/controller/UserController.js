const mongodb = require("mongodb");
const mongoURL = "mongodb://localhost:27017";

const index = (req, res) => {
  res.send("hola index");
};

const signin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!password) {
    return res.render("login", {
      layout: "public",
      success: false,
      color: "pink",
      message: "Te falto la contraseña, y ahora encima el mail :)",
    });
  }
  if (!email) {
    return res.render("login", {
      layout: "public",
      success: false,
      color: "pink",
      message:
        "De verdad? Forzaste este error solo para ver el mensaje? Te falto completar el campo Mail, que YA estaba completado",
    });
  }

  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      return res.render("error", {
        layout: "public",
        success: false,
        color: "red",
        message:
          "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
      });
    } else {

      const database = client.db("apprenderdb");
      const usersCollection = database.collection("users");
      
      usersCollection.findOne({ email: email }, (err, foundUser) => {
        if (err) {
          res.render("error", {
            layout: "public",
            success: false,
            color: "red",
            message: "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
          });
          return client.close();
        } else {
          if (foundUser.password === password) {
            res.render("welcome",{
              layout: "logged",
              success: true,
              color: 'green',
              message: `Hola ${foundUser.name}`,
              user: foundUser,
            });
          return client.close();
          }
        }
      });

    }
      
});
}



const register = (req, res) => {
  console.log(req.body);

  const { name, email, password, confirmPassword, hacker } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.render("register", {
      layout: "black",
      message: "SECRET REGISTER FORM",
      success: false,
      status: 400,
    });
  }

  const newUser = {
    name,
    email,
    password,
    hacker,
  };

  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      return res.render("error", {
        layout: "public",
        success: false,
        color: "red",
        message:
          "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
      });
    } else {
      const database = client.db("apprenderdb");
      const usersCollection = database.collection("users");

      usersCollection.findOne({ email: email }, (err, foundUser) => {
        if (err) {
          res.render("error", {
            layout: "public",
            success: false,
            color: "red",
            message:
              "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
          });
          return client.close();
        } else {
          if (foundUser) {
            res.render("login", {
              layout: "public",
              success: false,
              color: "orange",
              message: "Email Registrado en Base de Datos, Inicie sesión",
              user: foundUser,
            });
            return client.close();
          } else {
            usersCollection.insertOne(newUser, (err) => {
              if (err) {
                res.render("error", {
                  layout: "public",
                  success: false,
                  color: "red",
                  message:
                    "Disculpa, no se ha podido crear la cuenta, intente mas tarde",
                });
              } else {
                res.render("login", {
                  layout: "public",
                  success: true,
                  color: "green",
                  message: "Cuenta Creada! Por favor Inicia Sesión",
                  user: newUser,
                });
                return client.close();
              }
            });
          }
        }
      });
    }
  });
};

module.exports = {
  index,
  signin,
  register,
};
