import { useRouter } from "next/router";
import React from "react";
import TodoComp, { TodoProps } from "./TodoComp";

export default function TodoRemove(props: TodoProps) {
	let name = props.name;
	let date = props.date;
	let status = props.status;
	let id = props.id;
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
		<div>
			<div>
				<button onClick={removeHandler}>ARCHIVE</button>
			</div>
			<div>
				<TodoComp name={name} status={status} date={date} />
			</div>
		</div>
	);
}
