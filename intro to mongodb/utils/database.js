const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const mongo_uri = "mongodb+srv://root:root@completecoding.qladk1e.mongodb.net/?retryWrites=true&w=majority&appName=CompleteCoding";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(mongo_uri)
    .then(client => {
      _db = client.db('airbnb');
      callback();
    })
    .catch(err => {
      console.log('err while connecting to mongo', err)
    })
}

const getDb = () => {
  if (!_db) {
    throw new error("Database is not initialized")
  } else {
    return _db;
  }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
