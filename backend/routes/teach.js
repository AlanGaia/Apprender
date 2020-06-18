const { Router } = require("express");
const router = Router();
const {mongodb, mongoURL } = require('../database/database');
const { get } = require("./user");


//GET Routes - Controllers Methods
router.get("/classes", (req, res) => {
  if (req.session.loggedUser) {
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

        classesCollection.find().toArray((err, classList) => {
          if (err) {
            res.render("error", {
              layout: "logged",
              success: false,
              color: "red",
              message:
                "Disculpa, El servidor esta en mantenimiento! Intente mas tarde",
            });
            return client.close();
          } else {
            if (classList) {
              res.render("list", {
                layout: "logged",
                success: true,
                classList,
                user: req.session.loggedUser,
              });
              return client.close();
            }
          }
        });
      }
    });
  } else {
    res.render("plearn", {
      layout: "public",
    });
  }
});

router.get("/", (req, res) => {
  if (req.session.loggedUser) {
    res.render("teach", {
      layout: "logged",
      user: req.session.loggedUser,
    });
  } else {
    res.render("/", {
      layout: "public",
    });
  }
});

router.post("/requestClass/:id", (req, res) => {
  const { name, email, _id } = req.session.loggedUser;

  const id_event_string = req.body.id_event;
  const id_event = new mongodb.ObjectId(req.body.id_event);
  let id_teacher = new mongodb.ObjectId(_id);

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

      classesCollection.findOneAndUpdate(
        //Find Query
        { _id: id_event },

        //Update query
        {
          $set: {
            confirmed: true,
            pending: false,
            link: `https://meet.jit.si/${id_event_string}`,
            requestedById: id_teacher,
            requestedByMail: email,
            requestedByName: name,
            teacher: name,
          },
        },
        { returnOriginal: false },
        function (err, updatedClass) {
          if (err) {
            res.render("error", {
              layout: "logged",
              success: false,
              color: "red",
              message:
                "Disculpa, no se pudo aplicar a la clase, intenta mas tarde",
            });
            return client.close();
          } else {
            //teacher   update DB
            usersCollection.findOneAndUpdate(
              //Find Query
              { _id: id_teacher },
              {
                $push: {
                  events: updatedClass.value,
                },
              }
            );
            //Student   update DB
            usersCollection.findOneAndUpdate(
              //Find Query
              { _id: updatedClass.value.createdById, "events._id": id_event },
              {
                $set: {
                  events: [updatedClass.value],
                },
              }
            );
            client.close();
          }
        }
      );

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
          const usersCollection = database.collection("users");
          //new session for the teacher
          const oldSessionMail =  req.session.loggedUser.email;
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
              usersCollection.findOne(
                { email: oldSessionMail },
                (err, foundUser) => {
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
                }
              );
            }
          });
        }
      });
    }
  });
});

module.exports = router;
