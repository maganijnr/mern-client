import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardSkeleton from "../components/atoms/Loaders/ProductCardSkeleton";
import ProductCard from "../components/atoms/ProductCard";
import WebLayout from "../components/layouts/WebLayout";
import { GET_ALL_PRODUCTS } from "../redux/features/products/productSlice";
import { getAllProducts } from "../redux/services/productService";
import { ClipLoader } from "react-spinners";

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const productItems = useSelector((state) => state.products);

	const [fetchedProducts, setFetchedProducts] = useState([]);
	const [sliceOffSet, setSliceOffSet] = useState(8);

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

	useEffect(() => {
		const fetchItems = async () => {
			const currentItems = products.slice(0, sliceOffSet);

			setFetchedProducts(currentItems);
		};
		fetchItems();
	}, [products, sliceOffSet]);

	return (
		<WebLayout>
			<section className="mt-10">
				{Boolean(fetchedProducts.length) && !loading ? (
					<div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
						{fetchedProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				) : (
					<div className="w-[80px] h-[80px] flex items-center justify-center bg-secondary-600 rounded-lg mx-auto my-[100px]">
						<ClipLoader color="#fff" />
					</div>
				)}
			</section>
			<div className="w-full h-full flex items-center justify-center mt-10">
				{fetchedProducts.length > 0 && (
					<button
						className="bg-secondary-600 text-white font-semibold px-5 py-2 cursor-pointer rounded-lg"
						onClick={() => {
							setSliceOffSet(sliceOffSet + 10);
						}}
					>
						Load More
					</button>
				)}
			</div>
		</WebLayout>
	);
};

export default ProductsScreen;
