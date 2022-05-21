import { Types } from "mongoose";
import { TodoStatus } from "../lib/todos/todo-item";

type TodoId = Types.ObjectId | string;

export interface TodoProps {
	name: string;
	email: string;
	date: Date;
	status: TodoStatus;
	id: TodoId;
}

function TodoComp(props: TodoProps) {
	let name = props.name;
	let date = new Date(props.date).toLocaleDateString();
	let status = props.status;
	let id = props.id;

	return (
		<div>
			<p>
                {name} @ {date}
            </p>
		</div>
	);
}

export default TodoComp;