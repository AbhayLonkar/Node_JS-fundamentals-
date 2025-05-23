const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', "ejs");
app.set('views', 'views');

const { homeRoute } = require('./routes/homeRoute')
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoute);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});