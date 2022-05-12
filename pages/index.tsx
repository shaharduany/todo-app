import type { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import JoinPage from "../components/JoinComp";

interface HomeProps {
	session: string;
}

const Home: NextPage = (props: HomeProps) => {
	let session = JSON.parse(props.session);

	function logoutClickHandler(event: EventListener) {
		signOut();
	}
	
	if (session) {
		return (
			<div>
				<h1>Session</h1>
				<button onClick={logoutClickHandler}>LOGOUT</button>
			</div>
		);

	} else {
		return (
			<>
				<JoinPage />
			</>
		);
	}
};

export async function getServerSideProps(context) {
	const session = JSON.stringify(await getSession(context));
	return {
		props: {
			session,
		},
	};
}

export default Home;
