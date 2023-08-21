const express = require("express");
const app = express();
const crypto = require("crypto");
const path = require("path");
const port = 8000;

let tempTodos = [];

app.use(express.urlencoded());

// app.set("views", __dirname + "/views");
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine());

app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  //   res.render("TodoPage", { tempTodos });
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
