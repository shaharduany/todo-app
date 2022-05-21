import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/db/database";

export default async function handler(req: Request, res: Response) {
	let db = await (await clientPromise).db();
	const METHOD = req.method;
	let session = await getSession({ req });
	let { todoName } = req.body;
	if (
		!todoName ||
		(typeof todoName === "string" && todoName.trim() === "") ||
		METHOD !== "POST" ||
		!session
	) {
		res.status(422).json({ message: "Something went wrong" });
		return;
	}

	let email = session.user.email;
	try {
		let todo = await db.collection("todos").findOne({ name: todoName });
		await db
			.collection("users")
			.updateOne({ email }, { $pull: { todos: todo?._id } });
		await db
			.collection("users")
			.updateOne({ email }, { $push: { history: todo?._id } });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
		return;
	}

	res.status(201).json({ message: "yay" });
}
