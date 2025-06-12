const Home = require("../model/home")

exports.getHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render('./host/home', { registeredHouses, tab: "editHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
  })
}

exports.postEditHome = (req, res, next) => {
  const id = req.body.id;
  Home.findById(id).then(house => {
    res.render('./host/editHome', { house: house, tab: "editHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.body.id;
  Home.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/host/editHome')
    })
    .catch(err => {
      console.log('error occured: ', err)
    })
}

exports.postEditHomeSuccess = (req, res, next) => {
<<<<<<< HEAD
  const { id, title, price, rating, oldPhoto } = req.body;
  var { photo } = req.body;
  if (!req.file) {
    photo = req.body.oldPhoto;
  } else {
    photo = req.file.path;
  }
=======
  const { id, title, price, rating, photo } = req.body;
>>>>>>> ad316ab243584f617a4814f6db83bd1dc1d30a1b
  Home.findById(id)
    .then(home => {
      home.title = title;
      home.price = price;
      home.rating = rating;
      home.photo = photo;
      home.save().then(() => {
        res.render('./host/editHomeSuccess', { tab: "addHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
      })
    })
    .catch(err => {
      console.log('error occured while updating: ', err);
    })
}
