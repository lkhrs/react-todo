import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [todoName, setTodoName] = useState("");

	// Load todos from localStorage on mount
	useEffect(() => {
		let todos = JSON.parse(localStorage.getItem("todos"));
		return () => {
			if (!todos) {
				todos = [];
			}
			setTodos(todos);
		};
	}, []);

	// Save todos to localStorage after render
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		if (!todoName.trim()) return;
		setTodos([...todos, { text: todoName, done: false }]);
		setTodoName("");
	};

	const removeTodo = (index) => {
		const updated = todos.filter((_, i) => i != index);
		setTodos(updated);
	};

	const statusToggle = (index) => {
		const updated = [...todos];
		updated[index].done = !updated[index].done;
		setTodos(updated);
	};
	return (
		<>
			<h1>Todo</h1>
			<input
				value={todoName}
				onInput={(e) => setTodoName(e.target.value)}
				placeholder="New todo"
			/>
			<button onClick={addTodo}>Add Todo</button>
			<ul>
				{todos.map((todo, i) => (
					<li key={i}>
						<input
							type="checkbox"
							onChange={() => statusToggle(i)}
							checked={todo.done}
						/>
						<span>{todo.text}</span>
						<button onClick={() => removeTodo(i)}>Delete Todo</button>
					</li>
				))}
			</ul>
		</>
	);
}

export default App;
