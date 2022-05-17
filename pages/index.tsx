import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccountPage from "../components/AccountPage";
import AddTodo from "../components/AddTodo";

interface HomeProps {
	session: string,
}

const Home: NextPage = (props: HomeProps) => {
	let session = JSON.parse(props.session);

	let router = useRouter();
	useEffect(() => {
		if(!session){
			router.push("/join-us");
		}
	}, [session]);
	
	return (<div>
		<AccountPage />
		<AddTodo />
	</div>)
};

export async function getServerSideProps(context: NextPageContext) {
	const session = JSON.stringify(await getSession(context));

	return {
		props: {
			session,
		},
	};
}

export default Home;
