import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebLayout from "../components/layouts/WebLayout";
import HeroSection from "../components/organisms/HeroSection";
import ProductsSection from "../components/organisms/ProductsSection";
import { GET_ALL_PRODUCTS } from "../redux/features/products/productSlice";
import { getAllProducts } from "../redux/services/productService";
import { Box } from "@chakra-ui/react";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const productItems = useSelector((state) => state.products);

	const { products } = productItems;

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			try {
				const data = await getAllProducts();

				if (data.length > 0) {
					dispatch(GET_ALL_PRODUCTS(data));
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		getProducts();
	}, []);

	return (
		<WebLayout>
			<HeroSection />
			<ProductsSection loading={loading} products={products} />
		</WebLayout>
	);
};

export default HomeScreen;
