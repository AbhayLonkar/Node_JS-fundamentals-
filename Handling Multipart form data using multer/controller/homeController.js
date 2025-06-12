const Home = require("../model/home");


exports.initalReq = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'home',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  })
};

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { tab: 'addHome', isLoggedIn: req.isLoggedIn, user: req.session.user, });
};

exports.postAddHome = (req, res, next) => {
  const { title, price, rating, photo } = req.body;
  console.log(title, price, rating, photo);
  console.log(req.file);
  let home = new Home({ title, price, rating, photo: req.file.path });
  home.save().then(() => {
    res.render("addHomeSuccess", { tab: 'addHome', isLoggedIn: req.isLoggedIn, user: req.session.user, });
  })
};

exports.getHome = (req, res, next) => {
  Home.findById(req.params.homeId).then(house => {
    if (house) {
      res.render("selectedHome", { house: house, tab: 'home', isLoggedIn: req.isLoggedIn, user: req.session.user, });
    } else {
      res.render("404", { tab: 'home', isLoggedIn: req.isLoggedIn, user: req.session.user, })
    }
  });
}

exports.getEditHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'editHome',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  })
}