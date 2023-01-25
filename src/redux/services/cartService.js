import axios from "axios";
import { toast } from "react-toastify";

const cartStorageItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


export const addCartItem = async (id, qty) => {
	try {
		const response = await  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)

		const data = {
			...response.data,
			qty: Number(qty)
		}

		return data
	} catch (error) {
		const msg =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();

		toast.error(msg);
	}
	// const config = {
	// 	headers: { "Content-Type": "application/json" },
	// };
	// const cartData = {
	// 	userId,
	// 	products: product,
	// 	quantity,
	// 	totalPrice,
	// };
	// try {
	// 	const response = await axios.post(
	// 		`${process.env.REACT_APP_BACKEND_URL}/api/cart`,
	// 		cartData,
	// 		config
	// 	);

	// 	console.log(response.data);
	// 	return response.data;
	// } catch (error) {
		// const msg =
		// 	(error.response &&
		// 		error.response.data &&
		// 		error.response.data.message) ||
		// 	error.message ||
		// 	error.toString();

		// toast.error(msg);
	// }
};
