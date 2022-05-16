import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import JoinPage from "../../components/JoinComp";

const Join: NextPage = () => {
	let { data: session, status } = useSession();
	let router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/");
		}
	}, [session]);

	return (
		<div>
			<JoinPage />
		</div>
	);
};

export default Join;
