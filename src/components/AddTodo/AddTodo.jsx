import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const handleChange = e => setText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd({ id: uuidv4(), text, status: 'active' });
    setText(''); // 입력값 초기화
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" placeholder="Enter a task..." value={text} onChange={handleChange} />
      <button className={styles.button} type="submit">
        Add task
      </button>
    </form>
  );
}
