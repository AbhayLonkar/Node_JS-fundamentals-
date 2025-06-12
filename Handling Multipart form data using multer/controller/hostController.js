const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const Home = require("../model/home")

exports.getHome = (req, res, next) => {
  Home.find().then(registeredHouses => {
    res.render('./host/home', { registeredHouses, tab: "editHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
  })
}

exports.postEditHome = (req, res, next) => {
  const id = req.body.id;
  Home.findById(id).then(house => {
    res.render('./host/editHome', { house: house, tab: "editHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
  })
}

exports.postDeleteHome = (req, res, next) => {
  const id = req.body.id;
  Home.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/host/editHome')
    })
    .catch(err => {
      console.log('error occured: ', err)
    })
}

exports.postEditHomeSuccess = (req, res, next) => {
  const { id, title, price, rating } = req.body;
  if (req.file) {
    var photo = req.file.path;
    // If a new file is uploaded, use the new file path
    // Delete the old photo if it exists
    fs.unlinkSync(path.join(rootDir, req.body.oldPhoto));
  } else {
    var photo = req.body.oldPhoto; // If no new file is uploaded, keep the old photo
  }
  Home.findById(id)
    .then(home => {
      home.title = title;
      home.price = price;
      home.rating = rating;
      home.photo = photo;
      home.save().then(() => {
        res.render('./host/editHomeSuccess', { tab: "addHome", isLoggedIn: req.isLoggedIn, user: req.session.user, });
      })
    })
    .catch(err => {
      console.log('error occured while updating: ', err);
    })
}
