import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import styles from './styles/AddTodo.module.scss';

function AddTodo() {
	const todoInputRef = useRef<HTMLInputElement>();
	const [dueDate, setDueDate] = useState(new Date());
    const router = useRouter();

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
        router.reload();
    };

	return (
		<div className={styles.container}>
			<div>{message && <h5>{message}</h5>}</div>
			<form onSubmit={todoSubmit}>
				<div className={styles.todoName}>
					<label htmlFor="todo">Todo</label>
					<input id="todo" type="text" ref={todoInputRef} />
				</div>
				<div className={styles.datePicker}>
                    <label>DATE</label>
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
