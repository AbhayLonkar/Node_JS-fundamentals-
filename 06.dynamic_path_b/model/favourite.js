const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/pathUtils');
const Home = require('./home');
const { error } = require('console');
const filePath = path.join(rootDir, "data", "fav.json");

module.exports = class Favourite {

  static addFav(id, callback) {
    Favourite.fetchAll(favHouses => {
      if (favHouses.includes(id)) {
        callback("Already in the fav list");
      } else {
        favHouses.push(id);
        fs.writeFile(filePath, JSON.stringify(favHouses), () => {
          console.log('file written');
          callback();
        })
      }
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      callback(!error ? JSON.parse(data) : [])
    })
  }

  static deleteById(id, callback) {
    Favourite.fetchAll(favHouses => {
      favHouses = favHouses.filter(houseId => houseId !== id)
      fs.writeFile(filePath, JSON.stringify(favHouses), callback);
    })
  }

}