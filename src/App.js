import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setInput(todo.text);
    setCurrentTodo(todo);
  };

  const handleUpdate = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, text: input } : todo
      )
    );
    setInput('');
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="input-container">
        <input type="text" value={input} onChange={handleChange} placeholder="Enter a task" />
        {isEditing ? (
          <button className="button update" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="button add" onClick={handleAddTodo}>Add</button>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            <div className="buttons">
              <button className="button edit" onClick={() => handleEdit(todo)}>Edit</button>
              <button className="button delete" onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
