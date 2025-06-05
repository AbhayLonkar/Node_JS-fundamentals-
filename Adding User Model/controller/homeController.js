const Home = require("../model/home");


exports.initalReq = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'home',
      isLoggedIn: req.isLoggedIn
    });
  })
};

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { tab: 'addHome', isLoggedIn: req.isLoggedIn });
};

exports.postAddHome = (req, res, next) => {
  const { title, price, rating, photoUrl } = req.body;
  let home = new Home({ title, price, rating, photoUrl });
  home.save().then(() => {
    res.render("addHomeSuccess", { tab: 'addHome', isLoggedIn: req.isLoggedIn });
  })
};

exports.getHome = (req, res, next) => {
  Home.findById(req.params.homeId).then(house => {
    if (house) {
      res.render("selectedHome", { house: house, tab: 'home', isLoggedIn: req.isLoggedIn });
    } else {
      res.render("404", { tab: 'home', isLoggedIn: req.isLoggedIn })
    }
  });
}

exports.getEditHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'editHome',
      isLoggedIn: req.isLoggedIn
    });
  })
}