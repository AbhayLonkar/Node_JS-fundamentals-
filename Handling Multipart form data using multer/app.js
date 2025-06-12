const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

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

const randomString = (length) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOption = {
  storage: storage,
  fileFilter: fileFilter
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(multer(multerOption).single('photo'));
app.use(session({
  secret: 'Complete NodeJS',
  resave: false,
  saveUninitialized: true,
  store: store,
}));

// app.use(cookieParser())

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
  res.render("404.ejs", { tab: 'error', isLoggedIn: req.isLoggedIn, user: req.session.user });
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

