import { NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/db/database";
import TodoItem from "../../../lib/todos/todo-item";

async function handler(req: any, res: NextApiResponse) {
	let db = (await clientPromise).db();
	const METHOD = req.method;
	const todoName = req.body.todoName.trim();
	const date = req.body.date;
	const session = await getSession({ req });

	if (!validinputs(METHOD, todoName, session)) {
		res.status(401).json({
			message: "Unauthorized request",
		});
		return;
	}

	let email = session.user.email;
	let todo = new TodoItem(todoName, date);
	try {
		let insertOpt = await db
			.collection("todos")
			.insertOne(todo.getTodoObject());
		let todoId = insertOpt.insertedId;
		await db
			.collection("users")
			.updateOne({ email }, { $addToSet: { todos: todoId } });
	} catch (err) {
		res.status(500).json({ message: "couldn't save in user " });
		return;
	}
	res.status(200).json({ message: "went well " });
}

function validinputs(METHOD, todoName, session) {
	if (
		METHOD !== "POST" ||
		typeof todoName !== "string" ||
		todoName === "" ||
		!session
	) {
		return false;
	}
	return true;
}

export default handler;
