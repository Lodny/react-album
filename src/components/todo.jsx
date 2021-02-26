import React, { useState, useEffect } from "react";

const Todo = ({ history, user }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.id <= 0) {
      history.push("/login");
      return "";
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("todos : ", json);
        console.log("Todo : useEffect()");
        setTodos(json);
        setLoading(true);
      });
  }, []);

  if (user.id <= 0) {
    history.push("/login");
    return "";
  }

  const handleClick = (id) => {
    console.log("Todo : handleClick() : id : ", id);

    const newTodos = [...todos];
    const todo = newTodos.find((todo) => id === todo.id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleDelte = (id) => {
    console.log("Todo : handleDelte() : id : ", id);

    const newTodos = todos.filter((todo) => id !== todo.id);
    setTodos(newTodos);
  };

  const getTodos = (id) => {
    if (!loading) return "loading...";

    // console.log("getTodos()");

    return todos.map((todo) => {
      return (
        <div className="d-flex mb-1 border-bottom">
          <div className="form-check flex-grow-1" key={todo.id}>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              checked={todo.completed}
              id={"defaultCheck" + todo.id}
              onClick={() => handleClick(todo.id)}
            />
            <label
              className="form-check-label"
              htmlFor={"defaultCheck" + todo.id}
            >
              {todo.title}
            </label>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger"
            onClick={() => handleDelte(todo.id)}
          >
            X
          </button>
        </div>
      );
    });
  };

  return (
    <div className="col-md-11 ml-4">
      <h3>Todo List</h3>
      <div className="list-group list-group-flush">{getTodos()}</div>
    </div>
  );
};

export default Todo;
