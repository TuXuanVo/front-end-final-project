export interface IUserSignUp {
	name: string;
	email: string;
	avatar: string;
}

export type UserContextType = {
	userSignUp: IUserSignUp;
	phone: string;
	jwtToken: string;
	saveUserSignUp: (userSignUp: IUserSignUp) => void;
	savePhone: (phone: string) => void;
	saveJwtToken: (jwtToken: string) => void;
};