const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');

const { mongoose } = require('mongoose');
const { mongoUri } = require('./utils/mongouri');
const { todoItemRouter } = require('./routes/todoItemRouter');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded());


app.use('/api', todoItemRouter)

app.use((req, res, next) => {
  res.status(404);
  res.send("404 Not Found");
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

