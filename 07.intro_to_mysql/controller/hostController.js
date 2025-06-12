const Home = require("../model/home")

exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([registeredHouses]) => {
    res.render('./host/home', { registeredHouses, tab: "editHome" });
  })
}


exports.postEditHome = (req, res, next) => {
  const id = req.body.favId;
  Home.fetchOne(id).then(([house]) => {
    res.render('./host/editHome', { house: house[0], tab: "editHome" });
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.body.id;
  Home.deleteById(id)
    .then(() => {
      res.redirect('/editHome')
    })
    .catch(err => {
      console.log('error occured: ', err)
    })
}

exports.postEditHomeSuccess = (req, res, next) => {
  const data = req.body;
  Home.update(data.id, data)
    .then(() => {
      res.render('./host/editHomeSuccess', { tab: "addHome" });
    })
    .catch(err => {
      console.log('error occured while updating: ', err);
    })
}
