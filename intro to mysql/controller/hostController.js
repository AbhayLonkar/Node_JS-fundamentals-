const Home = require("../model/home")

exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([registeredHouses]) => {
    res.render('./host/home', { registeredHouses, tab: "editHome" });
  })
}


exports.postEditHome = (req, res, next) => {
  const id = req.body.favId;
  console.log(req.query);
  Home.fetchOne(id).then(house => {
    res.render('./host/editHome', { house, tab: "editHome" });
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.body.id;
  Home.deleteById(id, err => {
    if (err) {
      console.log('err while deleteing', err);
    }
    res.redirect('/editHome')
  })
}

exports.postEditHomeSuccess = (req, res, next) => {
  console.log(req.body);
  Home.fetchAll().then(([allHouse]) => {
    allHouse.map(house => {
      if (house.id === req.body.id) {
        house.title = req.body.title;
        house.price = req.body.price;
        house.rating = req.body.rating;
        house.photoUrl = req.body.photoUrl;
      }
    })
    Home.sudoSave(JSON.stringify(allHouse), err => {
      if (err) console.log(err);
      else {
        res.render('./host/editHomeSuccess', { tab: "addHome" });
      }
    })
  })
}
