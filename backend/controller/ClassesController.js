const {mongodb, mongoURL } = require('../database/database');

const createLearningClass = (req, res) => {
  const { title, category, especiality, description, date_event, time_event, price_event } = req.body;
  const date = new Date;
  const createdDate = date.toLocaleDateString();

  const newClass = {
    title,
    category,
    link: null,
    student: req.session.loggedUser.name,
    especiality,
    description,
    createdById: new mongodb.ObjectId(req.session.loggedUser._id),
    createdByName: req.session.loggedUser.name,
    createdByMail: req.session.loggedUser.email,
    createdDate,
    pending: true,
    requestedById: null,
    requestedByName: null,
    requestedByMail: null,
    teacher: null,
    confirmed: false,
    price_event: Number(price_event),
    date_event,
    time_event,
  };


  if (price_event > req.session.loggedUser.cash) {
    return res.render('formClass',{
      layout: 'logged',
      title,
      category,
      especiality,
      description,
      date_event,
      time_event,
      message:`No tienes ${price_event} Disponible, Tienes ${req.session.loggedUser.cash}`,
      color:'amber'
    })
  } 

  console.log(newClass);
  
  mongodb.MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      return res.render("error", {
        layout: "logged",
        success: false,
        color: "red",
        message:
          "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
      });
    } else {
      const database = client.db("apprenderdb");
      const classesCollection = database.collection("classes");
      const usersCollection = database.collection("users");

      classesCollection.insertOne(newClass, (err, insertedClass) => {
        if (err) {
          res.render("error", {
            layout: "logged",
            success: false,
            color: "red",
            message:
              "Disculpa, no se ha podido crear la cuenta, intente mas tarde",
          });
          return client.close();
        } else {

          const objInsertedClass = insertedClass.ops[0];
          usersCollection.findOneAndUpdate(
            //Find Query
            { _id: new mongodb.ObjectId(req.session.loggedUser._id) },

            //Update query
            { $addToSet: { events: objInsertedClass },
              $min: {cash: req.session.loggedUser.cash - price_event}
            }
          );

          const email = req.session.loggedUser.email;

          req.session.regenerate(function (err) {
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
                    req.session.loggedUser = foundUser;
                    res.redirect("/");
                    return client.close();
                  }
                }
              });
            }
          });
        }
      });
    }
  });
};

const getClassList = (req,res) => {
  res.render('list',{
    layout: 'logged',
  });
}

module.exports = {
  createLearningClass,
};
