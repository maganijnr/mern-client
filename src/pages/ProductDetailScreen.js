import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WebLayout from "../components/layouts/WebLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../redux/services/productService";
import { GET_SINGLE_PRODUCT } from "../redux/features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "../components/molecules/PageLoading";
import { numberWithCommas } from "../helpers/numberWithCommas";
import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";

const ProductDetailScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState();
	const { id } = useParams();
	const productItems = useSelector((state) => state.products);
	const navigate = useNavigate()

	const { product } = productItems;
	const dispatch = useDispatch();

	const handleAddToCart = async () => {
		navigate(`/cart/${id}?qty=${quantity}`)
	};

	useEffect(() => {
		const getSingleProduct = async (productId) => {
			setIsLoading(true);
			try {
				const data = await getProductDetails(productId);

				dispatch(GET_SINGLE_PRODUCT(data));
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};

		getSingleProduct(id);
	}, [id]); // eslint-disable-line

	useEffect(() => {
		function calcTotalPrice(qty, price) {
			const total = qty * price;
			setTotalPrice(total);
		}

		calcTotalPrice(quantity, product?.price);
	}, [quantity, product]);

	return (
		<WebLayout>
			{isLoading && <PageLoading />}
			<div className="w-full  mt-8">
				<Button
					mt="4"
					bg="default.600"
					textColor="#FFF"
					_hover={{ bg: "default.500" }}
					transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
					border="1px"
					borderColor="default.600"
				>
					Go Back Home
				</Button>

				<Flex mt="20px" flexDirection={{base:"column", md:"row"}} gap="10px" >
					<Box flex="3" height="300px" maxH="300px" overflow="hidden" objectFit="cover" borderRadius="10px">
						<Image src={product?.image}/>
					</Box>
					<Box flex="2" >
						<Text fontSize={{base:"2xl", lg:"3xl"}} fontWeight="bold" >
							{product?.name}
						</Text>
						<hr className="h-[1px] bg-gray-200 w-full"/>
						<Text>Rating</Text>
						<hr className="h-[1px] bg-gray-200 w-full"/>
						<Text fontSize="lg" fontWeight="medium">
							Price: ${numberWithCommas(product?.price)}
						</Text>
						<hr className="h-[1px] bg-gray-200 w-full"/>
						<Text fontSize={{base:'sm', md:"lg"}}>
							Description: {product?.description}
						</Text>
					</Box>
					<Box flex="2" border="1px" maxH="150px" borderColor='default.600' p="5px">
						<Text>
							Price: ${numberWithCommas(totalPrice)}
						</Text>
						<Flex alignItems="center" gap="10px" mt="5px">
							<Text>Qty:</Text>
							<Select value={quantity} onChange={(e) => setQuantity(e.target.value)} maxW="100px" outline="none" border="2px" borderColor="default.600" variant="filled">
								{
									[...Array(product?.countInStock).keys()].map((x) => (
										<option key={x + 1} value={x + 1}>
											{x + 1}
										</option>
									))
								}
							</Select>
						</Flex>
						<hr className="h-[1px] bg-gray-200 w-full my-2"/>
						<Button bg="default.600" color="#fff" borderRadius="0px" w="100%" cursor="pointer" _hover={{bg:"default.500"}} onClick={handleAddToCart}>Add to cart</Button>
					</Box>
				</Flex>
			</div>
		</WebLayout>
	);
};

export default ProductDetailScreen;

const ImageDiv = styled.div`
	flex: 1.5;
`;

const InfoDiv = styled.div`
	flex: 1;
`;

const ButtonDiv = styled.div`
	flex: 1;
`;
