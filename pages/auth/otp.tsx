import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import { UserContextType } from "../../@type/user";
import { UserContext } from "../../context/userContext";

const OTP: NextPage = () => {
	const router = useRouter();

	const { userSignUp, saveJwtToken } = useContext(UserContext) as UserContextType;

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
			console.log("userSingUp: ", userSignUp);

			fetch(`${process.env.NEXT_PUBLIC_URL_VERIFY_OTP_LOGIN}`, {
				method: "POST",
				body: JSON.stringify({
					email: userSignUp.email,
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
						alert(res.message);
					}
				});
		},
	});

	return (
		<section className="flex justify-center px-20">
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
		</section>
	);
};

export default OTP;
