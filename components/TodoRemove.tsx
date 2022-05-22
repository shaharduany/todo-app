import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TodoComp, { TodoProps } from "./TodoComp";
import styles from "./styles/TodoRemove.module.scss";

export default function TodoRemove(props: TodoProps) {
	let name = props.name;
	let date = props.date;

	console.log(date);

	let status = props.status;
	const router = useRouter();

	const removeHandler = async () => {
		let req = await fetch("/api/todos/archive-todo", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ todoName: name }),
		});
		let json = await req.json();
		router.reload();
	};

	return (
		<div className={styles.container}>
			<button onClick={removeHandler}>ARCHIVE</button>
			<TodoComp name={name} status={status} date={date} />
		</div>
	);
}
