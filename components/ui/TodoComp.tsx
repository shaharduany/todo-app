import TodoItem from "../../lib/todos/todo-item";

interface TodoInterface {
	todo: TodoItem;
}

function TodoComp(props: TodoInterface) {
	const name = props.todo.name;
	const date = props.todo.date;
	const status = props.todo.status;

	return (
		<div>
			<p>
				{name} date: {date} status: {status}
			</p>
		</div>
	);
}

export default TodoComp;