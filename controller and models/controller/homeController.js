const path = require("path");
const rootDir = require('../utils/pathUtils');
const Home = require("../model/home");


exports.initalReq = (req, res, next) => {
  Home.fetchAll(registeredHouses => {
    res.render("home", { registeredHouses: registeredHouses });
  })
};

exports.getAddHome = (req, res, next) => {
  res.render("addHome");
};

exports.postAddHome = (req, res, next) => {
  const { title, price, rating, photoUrl } = req.body;
  console.log(title, price, rating, photoUrl);
  let home = new Home(title, price, rating, photoUrl);
  console.log('before save');
  home.save();
  console.log('after save');
  res.render("addHomeSuccess");
};