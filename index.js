const express = require("express");
const app = express();
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const port = 8000;

let tempTodos = [];

app.use(express.urlencoded());

//template setup
app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to the MongoDB database
mongoose.connect(
  "mongodb+srv://akshay:akshay@cluster0.rns1o.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//API
app.get("/", (req, res) => {
  res.render("todopage", { tempTodos });
});

app.post("/form-submit", (req, res) => {
  tempTodos.push({ ...req.body, id: crypto.randomUUID() });
  console.log(tempTodos);
  res.redirect("/");
});

app.delete("/todo-delete/:id", (req, res) => {
  const todoId = req.params.id;
  const todoIndex = tempTodos.findIndex((todo) => todo.id === todoId);
  tempTodos.splice(todoIndex, 1);

  if (todoIndex !== -1) {
    res.status(204).send("Deleted");
    res.redirect("/");
  } else {
    res.status(404).send("Todo not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
