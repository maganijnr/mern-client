import styled from "styled-components";
import { numberWithCommas } from "../../helpers/numberWithCommas";
import { useNavigate } from "react-router-dom";

import { Box, Button, Image } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
	const navigate = useNavigate();
	const { countInStock, image, name, price, _id } = product;
	return (
		<Box maxW="350px" borderWidth="1px" borderRadius="lg" overflow="hidden">
			<Box h="200px" overflow="hidden">
				<Image
					src={image}
					alt="product image"
					objectFit="cover"
					objectPosition="center"
					boxSize="350px"
				/>
			</Box>
			<Box p="5">
				<Box
					mt="1"
					fontWeight="semibold"
					as="h2"
					fontSize="20px"
					lineHeight="tight"
					noOfLines={1}
				>
					{name}
				</Box>
				<Box
					as="h4"
					fontSize="18px"
					lineHeight="normal"
					fontWeight="medium"
					mt="1.5"
				>
					${numberWithCommas(price)}
				</Box>
				<Button
					onClick={() => navigate(`/products/${_id}`)}
					w="100%"
					mt="4"
					bg="default.600"
					textColor="#FFF"
					_hover={{ bg: "default.500" }}
					transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
					border="1px"
					borderColor="default.600"
				>
					Buy Now
				</Button>
			</Box>
		</Box>
	);
};

export default ProductCard;

const CardBody = styled.div`
	height: 300px;
`;

const Overlay = styled.div`
	background: rgba(25, 26, 24, 0.6);
`;
