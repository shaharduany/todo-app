import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountPage from "../components/AccountPage";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { getTodosFromEmail } from "../helpers/db-helpers";
import TodoItem from "../lib/todos/todo-item";

type HomeProps = {
	session: string;
	todos: string;
	history: string;
};

const Home = (props: HomeProps): JSX.Element => {
	let session = JSON.parse(props.session);
	let todos = JSON.parse(props.todos);
	let history = JSON.parse(props.history);

	let router = useRouter();
	useEffect(() => {
		if (!session) {
			router.push("/join-us");
		}
	}, [session]);

	return (
		<div>
			<AccountPage />
			<div>
				<h1>TODO</h1>
				<AddTodo />
				<TodoList todos={todos} history={false} />
			</div>
			<div>
				<h1>ARCHIVE</h1>
				<TodoList todos={history} history={true} />
			</div>
		</div>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
	let todos: TodoItem[] = [];
	let history: TodoItem[] = [];

	if (session) {
		let email = session.user.email;
		todos = await getTodosFromEmail(email);
		history = await getTodosFromEmail(email, true);
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
