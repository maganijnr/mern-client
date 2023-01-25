import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CartScreen from "./pages/CartScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import OrderScreen from "./pages/OrderScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import ProductsScreen from "./pages/ProductsScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeScreen />,
	},
	{
		path: "/login",
		element: <LoginScreen />,
	},
	{
		path: "/register",
		element: <RegisterScreen />,
	},
	{
		path: "/products",
		element: <ProductsScreen />,
	},
	{
		path: "/products/:id",
		element: <ProductDetailScreen />,
	},
	{
		path: "/cart/:id?",
		element: <CartScreen />,
	},
	{
		path: "/orders",
		element: <OrderScreen />,
	},
	{
		path: "/shipping",
		element: <ShippingScreen />,
	},
	{
		path: "/checkout",
		element: <CheckoutScreen />,
	},
]);

const App = () => {
	return (
		<div>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
};

export default App;
