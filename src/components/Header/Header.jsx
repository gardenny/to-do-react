import React from 'react';
import { useDarkMdoe } from '../../context/DarkModeContext';
import styles from './Header.module.css';

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const date = new Date().getDate();

export default function Header({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMdoe();

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.date}>{`${year}/${month < 10 ? `0${month}` : month}/${date < 10 ? `0${date}` : date}`}</h1>
        <h2 className={styles.status}>Today's task</h2>
      </div>
      <div className={styles.menu}>
        <button className={styles.toggle} onClick={toggleDarkMode}>
          {!darkMode && <i className="fa-solid fa-moon"></i>}
          {darkMode && <i className="fa-solid fa-sun"></i>}
        </button>
        <ul className={styles.filters}>
          {filters.map((value, index) => (
            <li key={index}>
              <button className={`${styles.filter} ${filter === value && styles.selected}`} onClick={() => onFilterChange(value)}>
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
