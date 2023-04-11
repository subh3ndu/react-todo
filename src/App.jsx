import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [todo, setTodo] = useState(
    () => JSON.parse(localStorage.getItem("todo")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    isEditing
      ? setTodo((prevTodo) =>
          prevTodo.map((item, i) => (i === editingIndex ? name : item))
        )
      : setTodo((prevTodo) => [...prevTodo, name]);
    setName("");
    setIsEditing(false);
  }

  function handleDelete(ind) {
    setTodo((prevTodo) => prevTodo.filter((itm, i) => i !== ind && itm));
  }

  function handleEdit(item, i) {
    setName(item);
    setIsEditing(true);
    setEditingIndex(i);
    inputRef.current.focus();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          placeholder="input"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      <ul>
        {todo.map((item, i) => (
          <li key={i}>
            <span
              style={{ cursor: "pointer" }}
              onDoubleClick={() => handleEdit(item, i)}
            >
              {item}
            </span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span style={{ cursor: "pointer" }} onClick={() => handleDelete(i)}>
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
