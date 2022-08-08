import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContextType } from "../../@type/user";
import { UserContext } from "../../context/userContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
	const router = useRouter();

	const [step, setStep] = useState(0);
	const { userSignUp, phone, saveJwtToken, savePhone } = useContext(UserContext) as UserContextType;
	console.log(userSignUp);
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
		onSubmit: (values) => {
			fetch(`${process.env.NEXT_PUBLIC_URL_SEND_OTP_REGISTER}`, {
				method: "POST",
				body: JSON.stringify({
					phone: values.phone,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((res) => {
					if (res.status) {
						savePhone(values.phone);
						console.log("begin set step");
						setStep(1);
					} else {
						alert("This phone has been used");
					}
				});
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
		onSubmit: (values) => {
			console.log("OTP: ", values.otp);
			console.log("Phone: ", phone);
			console.log("userSingUp: ", userSignUp);

			fetch(`${process.env.NEXT_PUBLIC_URL_SIGNUP_WITH_SOCIAL_CREDENTIAL}`, {
				method: "POST",
				body: JSON.stringify({
					fullName: userSignUp.name,
					email: userSignUp.email,
					avatar: userSignUp.avatar,
					phone,
					otp: values.otp,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((res) => {
					if (res.status) {
						console.log(res);
						saveJwtToken(res.data.token);
						router.push("/");
					} else {
						alert(res.error);
					}
				});
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
