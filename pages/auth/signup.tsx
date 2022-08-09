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

	const [step, setStep] = useState(0);
	const { email, phone, saveJwtToken, savePhone, saveEmail } = useContext(UserContext) as UserContextType;
	console.log(phone);

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
				savePhone(values.phone);
				console.log("begin set step");
				setStep(1);
			}
		},
	});

	const formikOTP = useFormik({
		initialValues: {
			otp: "",
		},
		validationSchema: Yup.object().shape({
			otp: Yup.string()
				.length(6, "OTP must be contain 6 numbers!")
				.matches(/^[0-9]*$/, "OTP only contains number")
				.required("Required"),
		}),
		onSubmit: async (values) => {
			console.log("OTP: ", values.otp);

			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_VERIFY_OTP_LOGIN}`, {
				method: "POST",
				body: JSON.stringify({
					email: cookies.userEmail,
					otp: values.otp,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();
			if (!response.ok) {
				alert(result.error);
			} else {
				console.log(result);
				saveJwtToken(result.data.token);
				router.push("/");
			}
		},
	});

	return (
		<section className="flex justify-center px-20">
			{step === 0 ? (
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
			) : (
				<form onSubmit={formikOTP.handleSubmit} className="flex flex-col">
					<label htmlFor="otp">OTP</label>
					<input
						type="text"
						name="otp"
						id="otp"
						className="border rounded mb-3"
						onChange={formikOTP.handleChange}
					/>
					{formikOTP.touched.otp && formikOTP.errors.otp ? (
						<div className="text-red-500">* {formikOTP.errors.otp}</div>
					) : null}
					<button className="py-1 rounded bg-blue-400 text-white" type="submit">
						Submit
					</button>
				</form>
			)}
		</section>
	);
};

export default SignUp;
