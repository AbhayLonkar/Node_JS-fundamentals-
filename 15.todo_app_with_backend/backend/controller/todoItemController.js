const TODO = require("../model/todo.js");

exports.addItem = (req, res, next) => {
  const todo = new TODO({
    tasks: req.body.name,
    date: req.body.dueDate,
  });
  todo.save()
    .then(() => {
      res.json(todo);
    })
    .catch((err) => {
      console.error("Error creating new route:", err);
      return res.status(500).json({ "success": false, "message": err.message });
    });
};

exports.getItem = async (req, res, next) => {
  const todoItems = await TODO.find();
  res.json(todoItems);
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  await TODO.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TODO.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.json(todoItem);
};