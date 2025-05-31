const express = require('express');
const app = express();
const path = require('path');
const Routes = require('./routes/homeRoute');
const { favouriteRoute } = require('./routes/favouriteRoute');
const { hostRoute } = require('./routes/hostRoute');
const { mongoose } = require('mongoose');
const { mongoUri } = require('./utils/mongouri');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());

app.use(Routes.homeRoute);
app.use(favouriteRoute);
app.use(hostRoute);

app.use((req, res, next) => {
  res.render("404.ejs", { tab: 'error' });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log("Something went wrong while connecting to MongoDB", err);
  })

