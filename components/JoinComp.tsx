import { signIn } from "next-auth/react";
import React from "react";

function JoinPage(){
	const joinGoogleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		signIn("google");
	};

	return (
		<div>
			<div>
				<h1>Welcome to TodoApp</h1>
				<h5>You need to register in order to join us</h5>
			</div>
			<div>
				<button onClick={joinGoogleHandler}>Join us using Google</button>
			</div>
		</div>
	);
}

export default JoinPage;
