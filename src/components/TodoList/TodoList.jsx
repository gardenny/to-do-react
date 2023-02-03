import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  // 함수의 레퍼런스만 전달하여 초기값이 필요한 경우에만 호출되도록 해줌
  const [todos, setTodos] = useState(readTodosFromLocalStorage);
  const handleAdd = todo => setTodos([...todos, todo]);
  const handleDelete = deleted => setTodos(todos.filter(todo => todo.id !== deleted.id));
  const handleUpdate = updated => setTodos(todos.map(todo => (todo.id === updated.id ? updated : todo)));

  // 투두 리스트가 변경될 때마다 로컬 스토리지에 업데이트
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  function getFilteredItems(todos, filter) {
    if (filter === 'all') return todos;
    return todos.filter(todo => todo.status === filter);
    // todo의 status값이 전달 받은 filter의 값과 동일한 아이템들만 반환
  }

  return (
    <section className={styles.board}>
      <AddTodo onAdd={handleAdd} />
      <ul className={styles.list}>
        {/* todos.map -> filtered.map */}
        {filtered.map(item => (
          <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </ul>
    </section>
  );
}

// 로컬 스토리지에 저장된 todo가 있다면 parsing 후 받아옴
function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
