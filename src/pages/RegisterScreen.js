import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../components/atoms/FormInput";
import AuthLayout from "../components/layouts/AuthLayout";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../redux/services/authServices";
import validateEmail from "../helpers/validateEmail";
import ClipLoader from "react-spinners/ClipLoader";
import { SET_USER } from "../redux/features/auth/authSlice";

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [formInfo, setFormInfo] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onHandleChange = (e) => {
		const { value, name } = e.target;

		setFormInfo({ ...formInfo, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, email, password } = formInfo;

		if (!name || !email || !password) {
			return toast.error("All fields are required");
		}

		if (password.length < 6) {
			return toast.error("Password is too short");
		}

		const validateUserEmail = validateEmail(email);

		if (!validateUserEmail) {
			return toast.error("Email not valid");
		}

		const userData = {
			name,
			email,
			password,
		};
		setIsLoading(true);

		try {
			const data = await registerUser(userData);

			await dispatch(SET_USER(data));

			setFormInfo({
				email: "",
				name: "",
				password: "",
			});

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};
	return (
		<AuthLayout>
			<div className="w-full md:w-[60%] bg-white py-10 lg:py-0 lg:min-h-[450px] overflow-hidden rounded-lg flex">
				<LeftBody className="w-full lg:w-1/2 bg-white p-5 lg:p-[30px]">
					<h2 className="font-medium text-3xl text-secondary-600 capitalize">
						Register
					</h2>
					<form
						className="w-full mt-3 py-1 space-y-5"
						onSubmit={handleSubmit}
					>
						<FormInput
							onHandleChange={onHandleChange}
							name="name"
							placeholder="Enter your full name"
							value={formInfo.name}
							type="text"
						/>
						<FormInput
							onHandleChange={onHandleChange}
							name="email"
							placeholder="Enter a valid email address"
							value={formInfo.email}
							type="email"
						/>

						<FormInput
							onHandleChange={onHandleChange}
							name="password"
							placeholder="Enter a password"
							value={formInfo.password}
							type="password"
						/>

						<LoginButton className="bg-secondary-600 w-full rounded-lg font-medium text-white py-3 px-20 mt-10">
							{isLoading ? (
								<ClipLoader size={20} color="#fff" />
							) : (
								"Register"
							)}
						</LoginButton>
					</form>
				</LeftBody>
				<RightBody className="hidden lg:block lg:w-1/2 h-[450px] px-[20px] py-[30px]">
					<h2 className="text-white font-bold text-7xl leading-40 cursor-pointer">
						Eubond Shop
					</h2>

					<p className="text-white font-medium text-sm my-10">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the industry's
						standard dummy text ever since the 1500s.
					</p>

					<RegisterButton
						to="/login"
						className="bg-white py-3 px-20 font-medium text-secondary-600 rounded-xl"
					>
						Login
					</RegisterButton>
				</RightBody>
			</div>
		</AuthLayout>
	);
};

export default RegisterScreen;
const RightBody = styled.div`
	background: linear-gradient(rgba(52, 94, 36, 0.7), rgba(52, 94, 36, 0.8)),
		url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const LeftBody = styled.div``;

const RegisterButton = styled(Link)``;

const LoginButton = styled.button``;
