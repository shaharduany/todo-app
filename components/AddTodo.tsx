import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";

function AddTodo() {
	const todoInputRef = useRef<HTMLInputElement>();
	const [dueDate, setDueDate] = useState(new Date());

	const [message, setMsg] = useState("");

	const todoSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let todoName = "";

		if (todoInputRef.current && todoInputRef.current.value) {
			todoName = todoInputRef.current.value;
		}

		const req = await fetch("/api/todos/add-todo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				todoName,
				dueDate
			}),
		});

		let json = await req.json();

		setMsg(json.message);
	};

	return (
		<div>
			<div>{message && <h5>{message}</h5>}</div>
			<form onSubmit={todoSubmit}>
				<div>
					<label htmlFor="todo">Todo</label>
					<input id="todo" type="text" ref={todoInputRef} />
				</div>
				<div>
					<DatePicker
						selected={dueDate}
						onChange={(date: Date) => setDueDate(date)}
					/>
				</div>
				<div>
					<button type="submit">ADD</button>
				</div>
			</form>
		</div>
	);
}

export default AddTodo;
