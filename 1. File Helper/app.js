const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const homeRoute = require("./routes/homeRoute");
const contactRoute = require("./routes/contactRoute");
const pathUtils = require('./utils/pathUtils');  // File Helper (importing)

// Middlewares
app.use(express.urlencoded());   // For parsing body
app.use(homeRoute);  // For Home route
app.use(contactRoute);  // For Contact route
app.use((req, res, next) => {  // For 404 not found route
  res.sendFile(path.join(pathUtils, "views", "404.html"))
})

app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}/`);
});