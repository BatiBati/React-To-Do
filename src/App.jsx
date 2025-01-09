import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function App() {
  const time = moment().format("LLLL");

  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [error, setError] = useState(false);

  const [filterState, setFilterState] = useState("ALL");

  const [log, setLog] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTaskButton = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      const newTask = {
        description: inputValue,
        status: "ACTIVE",
        id: uuidv4(),
      };
      setTodos([...todos, newTask]);
      setLog([
        ...log,
        {
          description: inputValue,
          status: "ACTIVE",
          id: newTask.id,
          logs: [{ status: "ACTIVE", time: time }],
        },
      ]);
      setInputValue("");
    }
  };
  console.log(log);

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newTodos = todos.filter((el) => el.id !== id);
      setTodos(newTodos);
    }
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
    const logs = log.map((oneLog) => {
      if (oneLog.id === id) {
        return {
          ...oneLog,
          status: oneLog.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
          logs: [
            ...oneLog.logs,
            {
              status: oneLog.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
              time: time,
            },
          ],
        };
      } else {
        return oneLog;
      }
    });
    setLog(logs);
  };
  const completedTasks = () => {
    return todos.filter((item) => item.status === "COMPLETED").length;
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };

  const deleteCompletedTasks = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const deletedTasks = todos.filter((item) => item.status !== "COMPLETED");
      setTodos(deletedTasks);
    }
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
            <button
              className="logButton"
              onClick={() => handleFilterStateChange("LOG")}
            >
              Logs
            </button>
          </div>
          {filterState === "LOG" && (
            <div>
              {log.map((el) => {
                return (
                  <div>
                    <p>{el.description}</p>
                    <div>
                      {el.logs.map((el, index) => (
                        <p key={index}>
                          {el.status} {el.time}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {todos
            .filter((todo) => {
              if (filterState === "ACTIVE") {
                return todo.status === "ACTIVE";
              } else if (filterState === "COMPLETED") {
                return todo.status === "COMPLETED";
              } else if (filterState === "ALL") {
                return true;
              } else {
                return null;
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
        </div>

        {todos.length > 0 ? (
          <div className="bot">
            <div>
              {completedTasks() + " of " + (todos.length + " task completed")}
            </div>
            <div
              className="clearCompleted"
              onClick={() => deleteCompletedTasks()}
            >
              Clear Completed
            </div>
          </div>
        ) : (
          <div className="botLengthNone">
            <p> No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
