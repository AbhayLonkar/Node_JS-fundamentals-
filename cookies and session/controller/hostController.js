const Home = require("../model/home")

exports.getHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render('./host/home', { registeredHouses, tab: "editHome" });
  })
}

exports.postEditHome = (req, res, next) => {
  const id = req.body.id;
  Home.findById(id).then(house => {
    res.render('./host/editHome', { house: house, tab: "editHome" });
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.body.id;
  Home.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/editHome')
    })
    .catch(err => {
      console.log('error occured: ', err)
    })
}

exports.postEditHomeSuccess = (req, res, next) => {
  const { id, title, price, rating, photoUrl } = req.body;
  Home.findById(id)
    .then(home => {
      home.title = title;
      home.price = price;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.save().then(() => {
        res.render('./host/editHomeSuccess', { tab: "addHome" });
      })
    })
    .catch(err => {
      console.log('error occured while updating: ', err);
    })
}
