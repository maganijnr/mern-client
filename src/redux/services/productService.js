import axios from "axios";
import { toast } from "react-toastify";

const getAllProducts = async (search, catg) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/products/?q=${
				search ? search : ""
			}&category=${catg ? catg : ""}`
		);

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

const getProductDetails = async (productId) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
		);

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
export { getAllProducts, getProductDetails };
