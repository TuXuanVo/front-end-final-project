import * as React from "react";
import { UserContextType, IUserSignUp } from "../@type/user";

export const UserContext = React.createContext<UserContextType | null>(null);

type ReactProps = {
	children: React.ReactNode;
};

const UserProvider: React.FC<ReactProps> = ({ children }) => {
	const [userSignUp, setUserSingUp] = React.useState<IUserSignUp>({
		name: "",
		email: "",
		avatar: "",
	});

	const saveUserSignUp = (user: IUserSignUp) => {
		setUserSingUp(user);
	};

	const [phone, setPhone] = React.useState<string>("");

	const savePhone = (phone: string) => {
		setPhone(phone);
	};

	const [jwtToken, setJwtToken] = React.useState<string>("");
	const saveJwtToken = (jwtToken: string) => {
		setJwtToken(jwtToken);
	};

	return (
		<UserContext.Provider
			value={{ userSignUp, phone, jwtToken, saveUserSignUp, savePhone, saveJwtToken }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
