import axios from "axios";
import { toast } from "react-toastify";

const registerUser = async (userData) => {
	const config = {
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
			userData,
			config
		);

		if (response.status === 200) {
			toast.success("Successfully registered");
		}

		return response.data;
	} catch (error) {
		const msg =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();

		toast.error(msg);
	}
};

const loginUser = async (userData) => {
	const config = {
		headers: { "Content-Type": "application/json" },
	};

	try {
		const response = await axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
			userData,
			config
		);

		if (response.status === 200) {
			toast.success("Successfully logged in");
		}

		return response.data;
	} catch (error) {
		const msg =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();

		toast.error(msg);
	}
};

export { loginUser, registerUser };
