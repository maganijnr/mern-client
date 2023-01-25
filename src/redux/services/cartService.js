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
}

// export const saveShippingInfo = async (data) => {
// 	try {
		
// 	} catch (error) {
// 		const msg =
// 			(error.response &&
// 				error.response.data &&
// 				error.response.data.message) ||
// 			error.message ||
// 			error.toString();

// 		toast.error(msg);
// 	}
// }