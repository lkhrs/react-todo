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
		setTodos([
			...todos,
			{ text: todoName, done: false, id: crypto.randomUUID() },
		]);
		setTodoName("");
	};

	const removeTodo = (id) => {
		const updated = todos.filter((todoObj) => todoObj.id !== id);
		setTodos(updated);
	};

	const statusToggle = (id) => {
		const updated = [...todos];
		const todo = updated.find((todoObj) => todoObj.id === id);
		todo.done = !todo.done;
		setTodos(updated);
	};
	return (
		<>
			<h1>Todo</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					value={todoName}
					onInput={(e) => setTodoName(e.target.value)}
					placeholder="New todo"
					name="New todo"
				/>
				<button type="submit" onClick={addTodo}>
					Add Todo
				</button>
			</form>
			<ul>
				{todos.map(({ text, done, id }) => (
					<li key={id}>
						<input
							type="checkbox"
							onChange={() => statusToggle(id)}
							checked={done}
						/>
						<span>{text}</span>
						<button type="button" onClick={() => removeTodo(id)}>
							Delete Todo
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

export default App;
