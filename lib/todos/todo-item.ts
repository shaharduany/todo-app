import mongoose from "mongoose";

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

	getTodoObject() {
		return {
			name: this.name,
			status: this.status,
			date: this.date,
		};
	}
}