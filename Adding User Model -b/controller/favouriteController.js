const { ObjectId } = require("mongodb");
const Favourite = require("../model/favourite");
const Home = require("../model/home");

exports.getFav = (req, res, next) => {
  Favourite.find()
    .populate('homeId')
    .then(favHouses => {
      const favouriteHomes = favHouses.map(fav => fav.homeId);
      res.render('fav', { newList: favouriteHomes, isLoggedIn: req.isLoggedIn, user: req.session.user });
    })
}

exports.postFav = (req, res, next) => {
  Favourite.findOne({ homeId: req.body.favId })
    .then(existingFav => {
      if (existingFav) {
        console.log('House already in favourites');
        res.redirect('/fav')
      }
      const fav = new Favourite({ homeId: req.body.favId });
      fav.save()
        .then(() => {
          res.redirect('/fav')
        })
        .catch(err => {
          console.log("something went wrong when adding to favourite", err)
        })
    })
}

exports.postFavDelete = (req, res, next) => {
  const id = req.body.id;
  Favourite.findOneAndDelete(id)
    .then(() => {
      res.redirect('/fav');
    })
    .catch(err => {
      console.log(err)
    })
}