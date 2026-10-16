import { useMemo, useState } from 'react';

const STORAGE_KEY = 'daylist-todos';
const FILTERS = ['All', 'Active', 'Completed'];

function readTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function TodoPage({ onLogout }) {
  const [todos, setTodos] = useState(readTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');

  function saveTodos(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos));
  }

  function addTodo(event) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    saveTodos([{ id: crypto.randomUUID(), title, completed: false }, ...todos]);
    setNewTodo('');
  }

  function toggleTodo(id) {
    saveTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function deleteTodo(id) {
    saveTodos(todos.filter((todo) => todo.id !== id));
  }

  const visibleTodos = useMemo(() => todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  }), [todos, filter]);
  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="todo-page">
      <header className="topbar">
        <a className="wordmark" href="/todos" aria-label="Daylist home"><span className="brand-mark small">d</span> daylist</a>
        <button className="logout-button" onClick={onLogout}>Log out <span aria-hidden="true">↗</span></button>
      </header>
      <section className="todo-content" aria-labelledby="todo-title">
        <div className="date-line"><span className="date-sparkle">✳</span> YOUR DAILY SPACE</div>
        <h1 id="todo-title">A fresh start,<br /><span>one thing at a time.</span></h1>
        <p className="todo-subtitle">Keep your focus on what matters today.</p>
        <form className="add-form" onSubmit={addTodo}>
          <span className="add-icon" aria-hidden="true">＋</span>
          <input aria-label="Add a task" placeholder="What would you like to do?" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} />
          <button type="submit" aria-label="Add todo">Add task <span aria-hidden="true">→</span></button>
        </form>
        <div className="list-heading">
          <h2>Your list <span className="list-count">{todos.length}</span></h2>
          <div className="filter-tabs" aria-label="Filter todos">
            {FILTERS.map((option) => <button key={option} className={filter === option ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter(option)} aria-pressed={filter === option}>{option}</button>)}
          </div>
        </div>
        <div className="todo-list">
          {visibleTodos.length === 0 ? (
            <div className="empty-state"><div className="empty-icon" aria-hidden="true">✳</div><strong>{filter === 'All' ? 'A little space to breathe.' : `No ${filter.toLowerCase()} tasks.`}</strong><span>{filter === 'All' ? 'Add a task above and make today yours.' : 'Try another filter or add a new task.'}</span></div>
          ) : visibleTodos.map((todo) => (
            <article className={todo.completed ? 'todo-row completed' : 'todo-row'} key={todo.id}>
              <button className="check-button" onClick={() => toggleTodo(todo.id)} aria-label={todo.completed ? `Mark ${todo.title} active` : `Complete ${todo.title}`} aria-pressed={todo.completed}>{todo.completed && <span aria-hidden="true">✓</span>}</button>
              <span className="todo-title">{todo.title}</span>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)} aria-label={`Delete ${todo.title}`}>×</button>
            </article>
          ))}
        </div>
        <footer className="todo-footer"><span><i />{remaining} {remaining === 1 ? 'task' : 'tasks'} left to do</span><span>Make it a good one <b>✳</b></span></footer>
      </section>
      <div className="page-decoration decoration-left" aria-hidden="true">✳</div>
      <div className="page-decoration decoration-right" aria-hidden="true">✳</div>
    </main>
  );
}
