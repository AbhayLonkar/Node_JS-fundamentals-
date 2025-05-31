const Home = require("../model/home");


exports.initalReq = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'home'
    });
  })
};

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { tab: 'addHome' });
};

exports.postAddHome = (req, res, next) => {
  const { title, price, rating, photoUrl } = req.body;
  let home = new Home({ title, price, rating, photoUrl });
  home.save().then(() => {
    res.render("addHomeSuccess", { tab: 'addHome' });
  })
};

exports.getHome = (req, res, next) => {
  Home.findById(req.params.homeId).then(house => {
    if (house) {
      res.render("selectedHome", { house: house, tab: 'home' });
    } else {
      res.render("404", { tab: 'home' })
    }
  });
}

exports.getEditHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render("home", {
      registeredHouses: registeredHouses,
      tab: 'editHome'
    });
  })
}