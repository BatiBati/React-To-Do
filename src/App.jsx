import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState(false);

  const [filterState, setFilterState] = useState("ALL");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTaskButton = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTodos([
        ...todos,
        { description: inputValue, status: "ACTIVE", id: uuidv4() },
      ]);
      setInputValue("");
    }
  };
  const handleDeleteTask = (id) => {
    const newTodos = todos.filter((el) => el.id !== id);
    setTodos(newTodos);
  };

  const handleTaskCheckBox = (id) => {
    const tasks = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
        };
      } else {
        return todo;
      }
    });
    setTodos(tasks);
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };

  return (
    <>
      <div className="container">
        <div className="top">
          <p className="toDoList">To-Do list</p>
          <div className="inputContainer">
            {error && alert("Please enter a task!")}
            <input
              className="input"
              placeholder={"Add a new task"}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="button" onClick={handleAddTaskButton}>
              Add
            </button>
          </div>
          {todos
            .filter((todo) => {
              if (filterState === "ACTIVE") {
                return todo.status === "ACTIVE";
              } else if (filterState === "COMPLETED") {
                return todo.status === "COMPLETED";
              } else {
                return true;
              }
            })
            .map((todo, i) => {
              return (
                <div className="todosList" key={i}>
                  <input
                    type="checkbox"
                    checked={todo.status === "COMPLETED"}
                    onChange={() => handleTaskCheckBox(todo.id)}
                  />
                  {todo.description}
                  <div
                    className="delete"
                    onClick={() => handleDeleteTask(todo.id)}
                  >
                    Delete
                  </div>
                </div>
              );
            })}
          <div className="filterContainer">
            <button
              className="allButton"
              onClick={() => handleFilterStateChange("ALL")}
            >
              All
            </button>
            <button
              className="activeButton"
              onClick={() => handleFilterStateChange("ACTIVE")}
            >
              Active
            </button>
            <button
              className="completedButton"
              onClick={() => handleFilterStateChange("COMPLETED")}
            >
              Completed
            </button>
          </div>
        </div>
        <p className="bot">No tasks yet. Add one above!</p>
      </div>
      <div className="footerContainer"></div>
    </>
  );
}

export default App;
