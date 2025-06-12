const mongo = require('mongodb');
const { mongoUri } = require("./mongouri")

const MongoClient = mongo.MongoClient;

const mongo_uri = mongoUri;

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
