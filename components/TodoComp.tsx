import { Types } from "mongoose";
import { TodoStatus } from "../lib/todos/todo-item";

type TodoId = Types.ObjectId | string;

export interface TodoProps {
	name: string;
	email: string;
	date: Date;
	status: TodoStatus;
	id: TodoId;
	time?: string;
}

function timeSince(date: Date) {
	var seconds = Math.floor((Date.now() - new Date(date)) / 1000);

	var interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + " years";
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + " months";
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + " days";
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " hours";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes";
	}
	return Math.floor(seconds) + " seconds";
}

function TodoComp(props: TodoProps) {
	let name = props.name;
	let date = new Date(props.date).toLocaleDateString();
	let time = timeSince(props.date);

	return (
		<div>
			<p>
				{name} @ {date} - {time}
			</p>
		</div>
	);
}

export default TodoComp;
