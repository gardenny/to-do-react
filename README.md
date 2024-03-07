![todo-react](https://user-images.githubusercontent.com/110226567/216513282-4e00ce48-80de-467b-9615-ba82ec54d340.png)

# 🗒️ TO-DO LIST (React)

리액트 기반 다크 모드 투두리스트 👉 [Demo](https://jone-to-do.netlify.app)

<br />

## 📢 프로젝트 개요

리액트를 공부하면서 진행한 첫 번째 프로젝트, TO-DO LIST 입니다.<br />
리스트별 진행 상황 필터링 및 다크 모드 기능이 새롭게 추가되었습니다.

<br />

## 🗨️ 사용 기술

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat-square&logo=PostCSS&logoColor=white"/>
</p>

<br />

## 📋 주요 기능

- 리스트 추가/삭제/완료
- 리스트별 상태 필터링
- 다크 모드 테마 지원
- 로컬 스토리지 활용

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/React-TO-DO-LIST-bd42d365689243d0b7547d115cefee7b?pvs=4)

### 📍 리스트 추가

리스트를 보여주는 로직과, 리스트를 추가하는 로직을 각각 따로 분리해주었습니다.<br />
`TodoList` - 리스트를 UI에 표기하는 최상위 컴포넌트로, 전체 리스트 배열의 상태를 관리합니다.<br />
`AddTodo` - `props`로 받은 `onAdd` 콜백함수를 호출하여 새롭게 추가된 리스트를 인자로 전달합니다.

```javascript
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const handleAdd = todo => setTodos([...todos, todo])};

  return (
    <section>
      <ul>{todos.map(item => (<li key={item.id}>{item.text}</li>))}</ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
```
```javascript
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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="add Todo" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
```

### 📍 필터링 적용

필터링 목록을 배열로 정의해두고, `useState`를 통해 현재 필터값의 상태를 관리합니다.<br />
자식 컴포넌트에게 필터링에 필요한 정보들을 각각 `props`로 전달하여 적절하게 상태를 업데이트합니다.

```javascript
const filters = ['all', 'active', 'completed'];
export default function App() {
  const [filter, setFilter] = useState(filters[0]);

  return (
    <div>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </div>
  );
}
```

### 📍 다크 모드 구현

다크모드는 전역적인 데이터의 성격을 띄고 있기 때문에 Context를 통해 관리합니다.<br />
현재 모드 상태와 모드를 토글링할 수 있는 함수를 만든 후 Provider의 `value`로 전달해주고,<br />
컴포넌트가 처음 mount 될 때 로컬 스토리지에 저장된 현재 테마 설정이 그대로 적용되게끔 구현하였습니다.

```javascript
const DarkModeContext = createContext();
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode);
    updateDarkMode(isDarkMode);
  }, []);

  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

// 커스텀 훅
export const useDarkMode = () => useContext(DarkModeContext);
```

<br />

## 😊 배운 점 및 느낀 점

- 리액트 어플리케이션의 전반적인 흐름을 이해할 수 있었습니다.
- 컴포넌트의 상태를 어떤 식으로 업데이트하여 UI에 반영할 수 있는지 원리에 대해 알게 되었습니다.
- 리액트의 단방향 데이터 흐름과 역방향 이벤트 흐름, 상태 끌어올리기에 대한 개념을 더 공부해야겠다고 느꼈습니다.
