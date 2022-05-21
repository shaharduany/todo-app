import { Types } from "mongoose";
import clientPromise from "../lib/db/database";
import TodoItem from "../lib/todos/todo-item";

export async function getTodosFromEmail(
	email: string,
	history: boolean = false
): TodoItem[] {
	let todoList: TodoItem[] = [];
	let todoIds: Types.ObjectId[] = [];

	try {
		let user = await getUserByEmail(email);
		if (history) {
			todoIds = user.history;
		} else {
			todoIds = user.todos;
		}
	} catch (error) {
		console.log(error);
		return todoList;
	}

	try {
		todoList = await convertTodoIds(todoIds);
	} catch (error) {
		console.log(error);
	}

	return todoList;
}

async function getUserByEmail(email: string) {
	let db = (await clientPromise).db();

	let user = await db.collection("users").findOne({ email });
	return user;
}

async function convertTodoIds(TodoIds: Types.ObjectId[]) {
	let db = (await clientPromise).db();
	let todoList: TodoItem[] = [];

	for (let todoId of TodoIds) {
		let obj = await db.collection("todos").findOne({ _id: todoId });
		if (obj instanceof Object) {
			let todoItem = new TodoItem(obj.name, obj.date, obj.status, todoId);
			todoList.push(todoItem);
		}
	}

	return todoList;
}
