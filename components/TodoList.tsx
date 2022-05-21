import TodoItem from "../lib/todos/todo-item";
import TodoComp from "./TodoComp";

type TodosListType = TodoItem[];

export interface TodolistProps {
	todos: TodosListType;
	history: boolean;
}

export default function TodoList(props: TodolistProps) {
	let todos = props.todos;
	
	return (
		<div>
			{todos &&
				todos.map((value, index) => (
					<TodoComp
						key={index}
						name={value.name}
						date={value.date}
						status={value.status}
						id={value.id}
					/>
				))}
		</div>
	);
}
