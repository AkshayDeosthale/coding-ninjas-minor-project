const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model");
const port = 8000;
require("dotenv").config();

app.use(express.urlencoded());

//template setup
app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//API
app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.render("todopage", { tempTodos: todos });
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.post("/form-submit", async (req, res) => {
  const { name, date, category } = req.body;
  try {
    const newTodo = new Todo({ name, date, category });
    await newTodo.save();
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
});

app.delete("/todo-delete/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

//delete group
app.get("/todo-delete-group", async (req, res) => {
  const { deletelist } = req.query;
  const temp = deletelist.split(",");
  try {
    const deletedTodo = await Todo.deleteMany({
      _id: {
        $in: temp,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.send(temp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
