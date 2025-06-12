const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/pathUtils');
const Favourite = require('./favourite');
const filePath = path.join(rootDir, "data", "home.json");

module.exports = class Home {
  constructor(title, price, rating, photoUrl) {
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.round(Math.random() * 1000).toString();
    Home.fetchAll(registeredHouses => {
      registeredHouses.push(this);
      fs.writeFile(filePath, JSON.stringify(registeredHouses), (data) => {
        console.log(data);
      });
    });
  }

  static sudoSave(data, callback) {
    console.log(data)
    fs.writeFile(filePath, data, err => {
      console.log("File saved")
      if (err) callback(err)
      else callback();
    })
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static fetchOne(homeId, callback) {
    Home.fetchAll(registeredHouses => {
      const house = registeredHouses.find(house => homeId == house.id);
      callback(house)
    })
  }

  static deleteById(id, callback) {
    Home.fetchAll(allHouses => {
      allHouses = allHouses.filter(house => house.id !== id);
      Favourite.deleteById(id, () => {
        fs.writeFile(filePath, JSON.stringify(allHouses), callback)
      })
    })
  }

}