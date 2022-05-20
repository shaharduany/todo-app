import { NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/db/database";
import Todo from "../../../lib/db/models/Todo";
import User from "../../../lib/db/models/User";
import TodoItem from "../../../lib/todos/todo-item";

async function handler(req: any, res: NextApiResponse) {
	clientPromise;
	const METHOD = req.method;
	let { todoName, email, date} = req.body;
	todoName = todoName.trim();

	if (METHOD !== "POST" || typeof todoName !== "string" || todoName === "") {
		res.status(422).json({
			message: "Couldn't process request",
		});
		return;
	};
	let session = await getSession({ req });
	if(!session){
		res.status(401).json({
			message: "Unauthorized request"
		});
		return;
	}

	let todo = new TodoItem(todoName, date);
	let todoDb;
	try {
		todoDb = new Todo(todo.getTodoObject());
		todoDb.save();
	} catch (error){
		console.log(error);
		res.status(500).json({ message: "Something went wrong saving todo"});
		return;
	}

	try {
		let user = await User.findOne({ email: session.user.email });
		user.todos.push(todoDb._id);
		user.save();
	} catch (error){
		console.log(error);
		res.status(500).json({ message: "something went wrong saving in user "});
		return;
	}
	res.status(200).json({ message: "went well " });
}

export default handler;
