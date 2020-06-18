const {Router} = require('express');
const router = Router();
const {createLearningClass} = require('../controller/ClassesController');
const {mongodb, mongoURL } = require('../database/database');


//GET Routes - Controllers Methods
router.get('/', (req,res) => {
  if (req.session.loggedUser) {
    res.render('learn',{
      layout: 'logged',
      user: req.session.loggedUser
    });
  }else{
    res.redirect('/',{
      layout: 'public',
    })
  }
});

router.get('/class', (req,res) => {
  if (req.session.loggedUser) {
    res.render('formClass',{
      layout: 'logged',
      user: req.session.loggedUser

    });
  }else{
    res.render('login', {
      layout: 'public'
    })
  }
});


// POST Routes - Controller Methods
router.post('/class', createLearningClass);

router.post('/delete/:id', (req, res) => {

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
      const idClass = new mongodb.ObjectId(req.params.id)
      const idUserCreator = new mongodb.ObjectId(req.session.loggedUser._id)

      classesCollection.findOneAndDelete(
        {_id: idClass},
        )
      usersCollection.update(
        {},
        { $pull: { events: { $in: [ idClass] }}},
        {multi: true}
        )

      res.redirect('/');
      return client.close();
    }
})
})




module.exports = router;