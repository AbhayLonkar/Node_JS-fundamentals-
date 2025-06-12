const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const path = require('path');
const Routes = require('./routes/homeRoute');

const { favouriteRoute } = require('./routes/favouriteRoute');
const { hostRoute } = require('./routes/hostRoute');
const { authRoute } = require('./routes/authRoute');

const { mongoose } = require('mongoose');
const { mongoUri } = require('./utils/mongouri');

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: mongoUri,
  collection: 'sessions'
});

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());
app.use(session({
  secret: 'Complete NodeJS',
  resave: false,
  saveUninitialized: true,
  store: store,
}));

app.use(cookieParser())

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})

app.use(Routes.homeRoute);
app.use(favouriteRoute);
app.use('/host', (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect('/login')
  }
});
app.use(hostRoute);
app.use(authRoute);


app.use((req, res, next) => {
  res.status(404);
  res.render("404.ejs", { tab: 'error', isLoggedIn: req.isLoggedIn });
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

