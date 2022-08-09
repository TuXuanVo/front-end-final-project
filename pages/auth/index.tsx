import { NextPage } from "next";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	linkWithPopup,
} from "firebase/auth";
import { firebaseApp } from "../../config/firebase.config";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserContextType } from "../../@type/user";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signin: NextPage = () => {
	const router = useRouter();
	const { savePhone } = useContext(UserContext) as UserContextType;

	// const firebaseAuth = getAuth(firebaseApp);
	// const googleProvider = new GoogleAuthProvider();
	// const facebookProvider = new FacebookAuthProvider();

	// const signIn = (social: string) => {
	// 	if (social === "google") {
	// 		signInWithPopup(firebaseAuth, googleProvider)
	// 			.then((result) => {
	// 				// This gives you a Google Access Token. You can use it to access the Google API.
	// 				const credential = GoogleAuthProvider.credentialFromResult(result);
	// 				const token = credential?.idToken;

	// 				if (token) {
	// 					fetch(`${process.env.NEXT_PUBLIC_URL_SIGNIN_WITH_SOCIAL_CREDENTIAL}`, {
	// 						method: "POST",
	// 						body: JSON.stringify({
	// 							token,
	// 							type: "google",
	// 						}),
	// 						headers: {
	// 							"Content-Type": "application/json",
	// 						},
	// 					})
	// 						.then((response) => response.json())
	// 						.then((res) => {
	// 							console.log("data after verify: ", res);
	// 							if (res.status && typeof res.data !== "string") {
	// 								saveUserSignUp({
	// 									name: res.data.name,
	// 									email: res.data.email,
	// 									avatar: res.data.avatar,
	// 								});
	// 								router.push("/auth/signup");
	// 							} else if (res.status && typeof res.data === "string") {
	// 								saveUserSignUp({
	// 									name: "",
	// 									email: res.data,
	// 									avatar: "",
	// 								});
	// 								router.push("/auth/otp");
	// 							}
	// 						});
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				// Handle Errors here.
	// 				const errorCode = error.code;
	// 				const errorMessage = error.message;
	// 				// The email of the user's account used.
	// 				const email = error.customData.email;
	// 				// The AuthCredential type that was used.
	// 				const credential = GoogleAuthProvider.credentialFromError(error);
	// 			});
	// 	} else if (social === "facebook") {
	// 		signInWithPopup(firebaseAuth, facebookProvider)
	// 			.then((result) => {
	// 				const user = result.user;
	// 				console.log("user: ", user);

	// 				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	// 				const credential = FacebookAuthProvider.credentialFromResult(result);
	// 				const accessToken = credential?.accessToken;

	// 				if (accessToken) {
	// 					fetch(`${process.env.NEXT_PUBLIC_URL_SIGNIN_WITH_SOCIAL_CREDENTIAL}`, {
	// 						method: "POST",
	// 						body: JSON.stringify({
	// 							token: accessToken,
	// 							type: "facebook",
	// 						}),
	// 						headers: {
	// 							"Content-Type": "application/json",
	// 						},
	// 					})
	// 						.then((response) => response.json())
	// 						.then((res) => {
	// 							console.log("data after verify: ", res);
	// 							if (res.status && typeof res.data !== "string") {
	// 								saveUserSignUp({
	// 									name: res.data.name,
	// 									email: res.data.email,
	// 									avatar: res.data.avatar,
	// 								});
	// 								router.push("/auth/signup");
	// 							} else if (res.status && typeof res.data === "string") {
	// 								saveUserSignUp({
	// 									name: "",
	// 									email: res.data,
	// 									avatar: "",
	// 								});
	// 								router.push("/auth/otp");
	// 							}
	// 						});
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.log({ error });
	// 				if (error.code === "auth/account-exists-with-different-credential") {
	// 					alert(
	// 						"Your's last login with Google has the same email with this login facebook. So we need you to login with Goole agin to make convenient for the later login that you can login with either Google or Facebook has the same account. Thank you!"
	// 					);
	// 					signInWithPopup(firebaseAuth, googleProvider)
	// 						.then((result) => {
	// 							linkWithPopup(result.user, facebookProvider)
	// 								.then((result) => {
	// 									alert(
	// 										"Now, you can login with either Google or Facebook has same email."
	// 									);
	// 								})
	// 								.catch((error) => {
	// 									console.log("error after link credential: ", error);
	// 								});
	// 						})
	// 						.catch((error) => {
	// 							console.log("error: ", error);
	// 						});
	// 				}
	// 			});
	// 	}
	// };

	const loginWithGoogle = async () => {
		window.open(`${process.env.NEXT_PUBLIC_URL_LOGIN_WITH_GOOGLE}`, "_self");
	};

	const loginWithFacebook = () => {
		window.open(`${process.env.NEXT_PUBLIC_URL_LOGIN_WITH_FACEBOOK}`, "_self");
	};

	const formikPhone = useFormik({
		initialValues: {
			phone: "",
		},
		validationSchema: Yup.object().shape({
			phone: Yup.string()
				.length(10, "Phone must be contain 10 numbers!")
				.matches(/^[0-9]*$/, "Phone only contains number")
				.required("Required"),
		}),
		onSubmit: async (values) => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_LOGIN_WITH_PHONE}`, {
				method: "POST",
				body: JSON.stringify({
					phone: values.phone,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorResult = await response.json();
				alert(errorResult.error);
			} else {
				savePhone(values.phone);
				router.push("/auth/otp");
			}
		},
	});

	return (
		<div className="flex flex-col justify-center px-64">
			<section className="flex flex-col border-b-2 pb-2">
				<form onSubmit={formikPhone.handleSubmit} className="flex flex-col">
					<label htmlFor="phone">Phone</label>
					<input
						type="text"
						name="phone"
						id="phone"
						className="border rounded mb-3"
						onChange={formikPhone.handleChange}
					/>
					{formikPhone.touched.phone && formikPhone.errors.phone ? (
						<div className="text-red-500">* {formikPhone.errors.phone}</div>
					) : null}
					<button className="py-1 rounded bg-blue-400 text-white" type="submit">
						Submit
					</button>
				</form>
			</section>
			<section className="flex flex-col mt-2">
				<button className="border rounded-md bg-red-500 text-white mb-2" onClick={loginWithGoogle}>
					Sigin with Google
				</button>
				<button className="border rounded-md bg-blue-400 text-white" onClick={loginWithFacebook}>
					Sigin with Facebook
				</button>
			</section>
		</div>
	);
};

export default Signin;
