import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AccountPage from "../components/AccountPage";
import AddTodo from "../components/AddTodo";
import { getTodosFromEmail } from "../helpers/db-helpers";
import TodoItem from "../lib/todos/todo-item";

type HomeProps = {
	session: string,
	todos: string,
	history: string,
}

const Home = (props: HomeProps): JSX.Element => {
	let session = JSON.parse(props.session);
	let todos = JSON.parse(props.todos);

	let router = useRouter();
	useEffect(() => {
		if(!session){
			router.push("/join-us");
		}
	}, [session]);
	console.log(todos);

	return (<div>
		<AccountPage />
		<AddTodo />
	</div>)
};

export async function getServerSideProps(context: NextPageContext) {

	const session = await getSession(context);
	let todos: TodoItem[] = [];
	let history: TodoItem[] = [];
	
	if(session){
		todos = await getTodosFromEmail(session.user.email);
	}

	return {
		props: {
			session: JSON.stringify(session),
			todos: JSON.stringify(todos),
			history: JSON.stringify(history),
		},
	};
}

export default Home;
