import React from "react";
import ProductCard from "../atoms/ProductCard";
import PropTypes from "prop-types";
import ProductCardSkeleton from "../atoms/Loaders/ProductCardSkeleton";

const ProductsSection = ({ products, loading }) => {
	return (
		<div className="w-full relative min-h-[800px] py-5">
			<h2 className="font-bold text-2xl md:text-3xl text-secondary-600">
				Latest Products
			</h2>

			<div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{Boolean(products.length) && !loading ? (
					<>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</>
				) : (
					<>
						<ProductCardSkeleton />
					</>
				)}
			</div>
		</div>
	);
};

export default ProductsSection;

ProductsSection.propTypes = {
	loading: PropTypes.bool,
	products: PropTypes.array,
};
