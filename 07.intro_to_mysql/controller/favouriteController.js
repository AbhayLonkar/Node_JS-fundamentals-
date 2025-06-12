const Favourite = require("../model/favourite");
const Home = require("../model/home");

exports.getFav = (req, res, next) => {
  Favourite.fetchAll(favHouses => {
    Home.fetchAll().then(([registeredHouses]) => {
      const newList = registeredHouses.filter(house => favHouses.includes(house.id));
      res.render('fav', { newList });
    })
  });
}

exports.postFav = (req, res, next) => {
  Favourite.addFav(req.body.favId, err => {
    if (err) {
      console.log(err)
    }
    res.redirect('/fav')
  })
}

exports.postFavDelete = (req, res, next) => {
  const id = req.body.id;
  Favourite.deleteById(id, err => {
    res.redirect('/fav');
  })
}