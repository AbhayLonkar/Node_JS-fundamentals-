const { getDb } = require('../utils/database');


const Home = require('./home');

module.exports = class Favourite {

  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();
    return Favourite.fetchAll()
      .then(favHouses => {
        const isDuplicate = favHouses.some(fav => fav.homeId === this.homeId);
        if (isDuplicate) {
          throw new Error('House already in favourites');
        }
        return db.collection('favourites').insertOne(this);
      });
  }


  static fetchAll() {
    const db = getDb();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('favourites').deleteOne({ homeId: String(id) });
  }

}