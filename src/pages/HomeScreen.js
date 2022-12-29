import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebLayout from "../components/layouts/WebLayout";
import HeroSection from "../components/organisms/HeroSection";
import { GET_ALL_PRODUCTS } from "../redux/features/products/productSlice";
import { getAllProducts } from "../redux/services/productService";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productItems = useSelector((state) => state.products);

	const { products } = productItems;
	useEffect(() => {
		const getProducts = async () => {
			try {
				const data = await getAllProducts();

				if (data.length > 0) {
					await dispatch(GET_ALL_PRODUCTS(data));
				}
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	return (
		<WebLayout>
			<HeroSection />
			<h2>products section</h2>
			<h2>footer section</h2>
		</WebLayout>
	);
};

export default HomeScreen;
