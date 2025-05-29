const { ObjectId } = require("mongodb");
const Favourite = require("../model/favourite");
const Home = require("../model/home");

exports.getFav = (req, res, next) => {
  Favourite.fetchAll()
    .then(favHouses => {
      favHouses = favHouses.map(fav => fav.homeId)
      Home.fetchAll()
        .then(registeredHouses => {
          const newList = registeredHouses.filter(house => favHouses.includes(house._id.toString()));
          res.render('fav', { newList });
        })
    });
}

exports.postFav = (req, res, next) => {
  let fav = new Favourite(req.body.favId);
  fav.save()
    .then(() => {
      console.log('saved')
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      res.redirect('/fav')
    })
}

exports.postFavDelete = (req, res, next) => {
  const id = req.body.id;
  Favourite.deleteById(id)
    .then(() => {
      res.redirect('/fav');
    })
    .catch(err => {
      console.log(err)
    })
}