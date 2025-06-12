const path = require('path');
const express = require('express');
const rootDir = require('../utils/pathUtils');

const contactRoute = express.Router()

contactRoute.get('/contact-us', (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"))
});

contactRoute.post('/contact-us', (req, res, next) => {
  console.log(`Username is: ${req.body.username}`);
  console.log(`Email is: ${req.body.mail}`);
  res.sendFile(path.join(rootDir, "views", "contact-success.html"))
});

module.exports = contactRoute;