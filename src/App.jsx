import React, { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [todo, setTodo] = useState(
    () => JSON.parse(localStorage.getItem("sk")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("sk", JSON.stringify(todo));
  }, [todo]);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    isEditing
      ? setTodo((prev) =>
          prev.map((itm, i) => (i === editingIndex ? name : itm))
        )
      : name && setTodo((prevVal) => [...prevVal, name]);
    setName("");
    setIsEditing(false);
  }

  function handleEdit(item, ind) {
    setIsEditing(true);
    setName(item);
    setTodo((prev) => prev.map((itm, i) => (i === ind ? "" : itm)));
    setEditingIndex(ind);
  }

  function handleDelete(item, ind) {
    setTodo((prev) => prev.filter((itm, i) => i !== ind && itm));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder="Enter name here..."
          onChange={handleChange}
        />
        <button>submit</button>
      </form>
      <ul>
        {todo.map((item, ind) => (
          <li
            key={ind}
            // onClick={() => handleDelete(item, ind)}
            onDoubleClick={(e) => handleEdit(item, ind)}
          >
            {/*  */}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
