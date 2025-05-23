const Home = require("../model/home");


exports.initalReq = (req, res, next) => {
  Home.fetchAll(registeredHouses => {
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
  console.log(title, price, rating, photoUrl);
  let home = new Home(title, price, rating, photoUrl);
  console.log('before save');
  home.save();
  console.log('after save');
  res.render("addHomeSuccess", { tab: 'addHome' });
};

exports.getHome = (req, res, next) => {
  Home.fetchOne(req.params.homeId, (house) => {
    if (house) {
      res.render("selectedHome", { house, tab: 'home' });
    } else {
      res.render("404", { tab: 'home' })
    }
  });
}

exports.getEditHome = (req, res, next) => {
  Home.fetchAll(registeredHouses => {
    res.render('./host/home', { registeredHouses, tab: 'editHome' })
  })
}