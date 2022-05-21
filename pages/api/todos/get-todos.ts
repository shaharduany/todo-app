import { getSession } from "next-auth/react";
import { getTodosFromEmail } from "../../../helpers/db-helpers";

export default async function handler(req, res){
    let session = await getSession({ req });
    if(!session || req.method !== "POST"){
        res.status(422).json({ todos: [] });
        return;
    }
    const { history } = req.body;

    let todos = await getTodosFromEmail(session.user.email, history);
    res.status(200).json({ todos, message: "went well" });
    return;
}