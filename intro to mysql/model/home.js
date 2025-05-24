const db = require('../utils/database');


module.exports = class Home {
  constructor(title, price, rating, photoUrl) {
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    return db.execute("INSERT INTO homes (title, price, rating, photoUrl) VALUES (?,?,?,?)", [this.title, this.price, this.rating, this.photoUrl]);
  }

  static update(id, data) {
    return db.execute("UPDATE homes SET title=?, price=?, rating=?, photoUrl=? WHERE id=?", [data.title, data.price, data.rating, data.photoUrl, id])
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes")
  }

  static fetchOne(homeId) {
    return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM homes WHERE id=?', [id]);
  }

}