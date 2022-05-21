import TodoItem from "../lib/todos/todo-item";
import TodoComp from "./TodoComp";
import TodoRemove from "./TodoRemove";

type TodosListType = TodoItem[];

export interface TodolistProps {
	todos: TodosListType;
	history: boolean;
}

export default function TodoList(props: TodolistProps) {
	let todos = props.todos;
	let history = props.history || false;

	return (
		<div>
			{todos &&
				!history &&
				todos.map((value, index) => (
					<TodoRemove
						key={index}
						name={value.name}
						date={value.date}
						status={value.status}
						id={value.id}
					/>
				))}
			{todos &&
				history &&
				todos.map((value, index) => (
					<TodoComp
						key={index}
						name={value.name}
						date={value.date}
						status={value.status}
					/>
				))}
		</div>
	);
}
