var React = require("react");

const Todo = (props) => {
  const { tempTodos } = props;

  const deletTodo = async (id) => {
    console.log("delete");
    await fetch(`/todo-delete/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <body>
      <head>
        <link rel="stylesheet" type="text/css" href="public/css/style.css" />
      </head>
      <div className="todo-form">
        <h2>Add Todo</h2>
        <form method="post" action="/form-submit">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="datecategorycontainer">
            <div style={{ width: "50%" }} className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div style={{ width: "50%" }} className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" required>
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>
          </div>

          <button type="submit">Add Todo</button>
        </form>
      </div>

      <div className="todo-list">
        <ul>
          {tempTodos.map((todo, key) => (
            <li key={key} className="todo-item">
              <label className="checkbox">
                <input type="checkbox" className="checkbox" />
              </label>
              <div className="todo-details">
                <h3 className="todo-name">{todo.name}</h3>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <p className="todo-date">{todo.date}</p>
                  <div className="chip todo-category">{todo.category}</div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  // e.preventDefault();
                  console.log("hi");

                  deletTodo(todo.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
};

module.exports = Todo;
