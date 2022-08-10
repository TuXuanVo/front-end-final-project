import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContextType } from "../../@type/user";
import { UserContext } from "../../context/userContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const SignUp: NextPage = () => {
	const router = useRouter();
	const [cookies, setCookie] = useCookies(["userEmail"]);
	console.log("email cookie: ", cookies.userEmail);

	const { saveJwtToken, savePhone } = useContext(UserContext) as UserContextType;

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
			if (cookies.userEmail) {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SEND_OTP_REGISTER}`, {
					method: "POST",
					body: JSON.stringify({
						phone: values.phone,
						email: cookies.userEmail,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					const errorResult = await response.json();
					alert(errorResult.error);
				} else {
					alert("Verify phone successfully. Next enter OTP.");
					router.push("/auth/otp");
				}
			} else {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL_LOGIN_WITH_PHONE_REGISTER}`, {
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
					alert("Register phone successfully. Next enter OTP.");
					router.push("/auth/otp");
				}
			}
		},
	});

	return (
		<>
			<h1>Register phone page</h1>
			<section className="flex justify-center px-20">
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
		</>
	);
};

export default SignUp;
