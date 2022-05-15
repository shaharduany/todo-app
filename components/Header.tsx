import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Header() {
	const { data: session, status } = useSession();

	useEffect(() => {}, [session]);
  
    const logoutClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		signOut();
	};

	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link href={"/"}>HOME</Link>
					</li>
					{session && <button onClick={logoutClickHandler}>LOGOUT</button>}
				</ul>
			</nav>
		</div>
	);
}