import React from 'react';
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo;
  const handleDelete = () => onDelete(todo);
  const handleChange = e => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status });
  };

  return (
    <li className={styles.todo}>
      <input className={styles.checkbox} type="checkbox" id={id} checked={status === 'completed'} onChange={handleChange} />
      <label className={styles.label} htmlFor={id}>
        <span className={`${text} ${status === 'completed' && styles.completed}`}>{text}</span>
      </label>
      <button className={styles.button} onClick={handleDelete}>
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </li>
  );
}
