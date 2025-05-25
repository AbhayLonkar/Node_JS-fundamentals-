const { getDb } = require('../utils/database');


module.exports = class Home {
  constructor(title, price, rating, photoUrl) {
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    const db = getDb();
    return db.collection('homes').insertOne(this);
  }

  static update(id, data) {
  }

  static fetchAll() {
  }

  static fetchOne(homeId) {
  }

  static deleteById(id) {
  }

}