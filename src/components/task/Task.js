import { useState } from "react";
import style from "./task.module.css";
import { ImPencil } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { BiUndo } from "react-icons/bi";

export default function Task() {
  const [task, setTask] = useState("");
  const [todos, setTodods] = useState([]);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [taskCount, setTaskCount] = useState(0);

  function handleAddTask() {
    if (!task) {
      setError("enter something");
    } else {
      setTodods([
        ...todos,
        { task: task, showInput: false, isCompleted: false }
      ]);
      setTaskCount(taskCount + 1);
      setTask("");
    }
  }
  function handleShowInput(ind) {
    todos[ind].showInput = true;
    setTodods([...todos]);
  }
  function handleUpdateTask(todo, ind) {
    todos[ind].task = value;
    todos[ind].showInput = false;

    setTodods([...todos]);
  }
  function handleDeleteTask(index) {
    todos.splice(index, 1);
    // return todos;
    setTodods([...todos]);
    setTaskCount(taskCount - 1);
  }

  function handleComplete(ind) {
    todos[ind].isCompleted = !todos[ind].isCompleted;
    setTodods([...todos]);
    if (todos[ind].isCompleted === true) {
      setTaskCount(taskCount - 1);
    } else {
      setTaskCount(taskCount + 1);
    }
    // console.log(todos[ind]);
  }
  return (
    <div className={style.taskContainer}>
      <div className={style.navbar}>
        <h1>Todo App</h1>
      </div>
      <div className={style.addTaskContainer}>
        <h2>Add Tasks </h2>
        <input
          type="text"
          placeholder="Enter your tasks here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {error && <span>{error}</span>}
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className={style.showTaskContainer}>
        <h2>Your Todo List ({taskCount})</h2>
        {todos &&
          todos.map((todo, index) => (
            <div className={style.todo}>
              {todo.showInput ? (
                <input
                  // type="text"
                  defaultValue={todo.task}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => handleUpdateTask(todo, index)}
                />
              ) : (
                <p key={index}>
                  {todo.isCompleted ? <strike>{todo.task}</strike> : todo.task}
                </p>
              )}
              <div className={style.icons}>
                <p onClick={() => handleComplete(index)}>
                  {todo.isCompleted ? (
                    <BiUndo size={28} />
                  ) : (
                    <TiTick size={35} />
                  )}
                </p>
                <p onClick={() => handleShowInput(index)}>
                  <ImPencil />
                </p>
                <p onClick={() => handleDeleteTask(index)}>
                  <AiFillDelete />
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
