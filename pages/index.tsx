import type { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import AccountPage from "../components/AccountPage";
import JoinPage from "../components/JoinComp";

interface HomeProps {
	session: string;
}

const Home: NextPage = (props: HomeProps) => {
	let session = JSON.parse(props.session);

	console.log(session);

	function logoutClickHandler(event: EventListener) {
		signOut();
	}
	
	if (session) {
		return (
			<div>
				<AccountPage />
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

export async function getServerSideProps(context: any) {
	const session = JSON.stringify(await getSession(context));
	return {
		props: {
			session,
		},
	};
}

export default Home;
