import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { UserContextType } from "../@type/user";
import { UserContext } from "../context/userContext";

const Home: NextPage = () => {
	const { jwtToken } = useContext(UserContext) as UserContextType;

	return (
		<div>
			<div className="flex justify-between px-4">
				<h1>This is Home page</h1>
				<Link href="auth">Signin</Link>
			</div>
			<div>
				<h4>JwtToken: {jwtToken}</h4>
			</div>
		</div>
	);
};

export default Home;
