const express = require('express');
const app = express();
const path = require('path');
const Routes = require('./routes/homeRoute');
const rootDir = require('./utils/pathUtils');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());

app.use(Routes.homeRoute);
app.use((req, res, next) => {
  res.render("404.ejs");
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});