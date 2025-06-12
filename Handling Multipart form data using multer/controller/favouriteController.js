const { ObjectId } = require("mongodb");
const User = require("../model/user");

exports.getFav = async (req, res, next) => {
  const userID = req.session.user._id;
  const user = await User.findById(userID).populate('favourites');
  res.render('fav', { newList: user.favourites, isLoggedIn: req.isLoggedIn, user: req.session.user });
}

exports.postFav = async (req, res, next) => {

  const userID = req.session.user._id;
  const user = await User.findById(userID);
  if (!user.favourites?.includes(req.body.favId)) {
    user.favourites.push(req.body.favId)
    await user.save();
  }

  res.redirect('/fav')
}

exports.postFavDelete = async (req, res, next) => {
  const id = req.body.id;
  const userId = req.session.user;
  const user = await User.findById(userId);
  user.favourites = user.favourites.filter(favID => !favID.equals(new ObjectId(id.toString())));
  await user.save();
  res.redirect('/fav');
}