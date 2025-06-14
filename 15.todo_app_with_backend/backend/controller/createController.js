const TODO = require("../model/todo.js");

exports.addItem = (req, res, next) => {
  console.log("Received request to create a new route");
  console.log("Request body:", req.body);
  const todo = new TODO({
    tasks: req.body.name,
    date: req.body.dueDate,
  });
  todo.save()
    .then(() => {
      console.log("New route created successfully");
      res.json(todo);
    })
    .catch((err) => {
      console.error("Error creating new route:", err);
      return res.status(500).json({ "success": false, "message": err.message });
    });
};