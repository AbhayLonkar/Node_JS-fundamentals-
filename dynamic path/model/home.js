const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/pathUtils');
const filePath = path.join(rootDir, "data", "home.json");

module.exports = class Home {
  constructor(title, price, rating, photoUrl) {
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.round(Math.random() * 1000);
    Home.fetchAll(registeredHouses => {
      registeredHouses.push(this);
      fs.writeFile(filePath, JSON.stringify(registeredHouses), (data) => {
        console.log(data);
      });
    });
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
      console.log(house);
      callback(house)
    })
  }

}