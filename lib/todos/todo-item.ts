import mongoose from "mongoose";
import Todo, { TodoSchemaInterface } from "../db/models/Todo";

export type TodoDate = Date | number;
type TodoId = string | mongoose.Types.ObjectId;

export enum TodoStatus {
    Pending = 0,
    Done = 1,
    Urgent = 2,
}

export default class TodoItem {
	name: string;
	date: TodoDate;
	status: TodoStatus;
	id: TodoId;

	constructor(
		name: string,
		date: TodoDate = Date.now(),
		status: TodoStatus = TodoStatus.Pending,
		id: TodoId = "empty"
	) {
		this.name = name;
		this.date = date;
		this.status = status;
		this.id = id;
	}

	getTodoObject(): TodoSchemaInterface {
		return {
			name: this.name,
			status: this.status,
			date: this.date,
		};
	}

	async changeStatus(status: TodoStatus) {
		if (this.status === status) {
			return true;
		}

		this.status = status;
		try {
			await Todo.findOneAndUpdate({ name: this.name }, { status: this.status });
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}