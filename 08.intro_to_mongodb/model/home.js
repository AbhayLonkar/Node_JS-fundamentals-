const { ObjectId } = require('mongodb');
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
    const db = getDb();
    const updatedData = {
      title: data.title,
      price: data.price,
      rating: data.rating,
      photoUrl: data.photoUrl
    }
    return db.collection('homes').updateOne({ _id: new ObjectId(String(id)) }, { $set: updatedData })
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static fetchOne(homeId) {
    const db = getDb();
    return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(id)) });
  }

}