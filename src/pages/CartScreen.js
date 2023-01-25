import React, { useEffect, useState } from "react";
import WebLayout from "../components/layouts/WebLayout";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { addCartItem } from "../redux/services/cartService";
import { CART_ADD_ITEM, REMOVE_CART_ITEM } from "../redux/features/cart/cartSlice";
import { Box, Button, Text } from "@chakra-ui/react";
import { numberWithCommas } from "../helpers/numberWithCommas";
import CartItem from "../components/molecules/CartItem";

const CartScreen = () => {
	const [loading, setLoading] = useState(false);
	const location = useLocation()
	const {id} = useParams()
	const dispatch= useDispatch()
	const navigate = useNavigate()
	const {cartItems} = useSelector((state) => state.cart)
	const [quantity, setQuantity] = useState(1);
	const [subTotal, setSubTotal] = useState(0)

	const productQty = location.search ? location.search.split('=')[1] : 1

	const removeCartItem = async (id) => {

		try {
			dispatch(REMOVE_CART_ITEM(id))
		} catch (error) {
			console.log(error)
		}
	}

	const proceedToShipping = () => {
		navigate('/shipping')
	}

	useEffect(() => {
		const calcSubTotal = () => {
			const total = cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)

			setSubTotal(total)
		}
		calcSubTotal()
	},[cartItems])


	useEffect(() => {
		const handleAddCartItem = async () => {
			if(typeof id !== "undefined" && productQty){
				const data = await addCartItem(id, productQty)
				dispatch(CART_ADD_ITEM(data))
			}
		}
		handleAddCartItem()
	},[id, productQty])

	return <WebLayout>
		{
			Boolean(cartItems.length === 0) && (
				<Box bg="default.600" maxWidth={{md:"300px",lg:"500px"}} mt="10px" p="10px">
					<Text fontSize="2xl" color="#fff" mb="10px">Your cart is empty</Text>
					<Link to='/products' className="bg-white text-secondary-600 font-medium text-lg px-5 py-2 rounded-lg">
						Go to market
					</Link>
				</Box>
			)
		}

		{
			Boolean(cartItems.length > 0) && (
				<div className="flex flex-col lg:flex-row my-10 space-y-5 lg:space-y-0 lg:space-x-5">
					<div className="cart_items_wrapper overflow-x-scroll space-y-4 w-full max-w-2xl">
						{
							cartItems?.map((item) => (
								<CartItem 
									key={item?._id} 
									product={item} 
									handleDelete={removeCartItem}
								/>
							))
						}
					</div>
					<div className="bg-slate-100 w-full max-h-[140px] sm:max-w-sm lg:max-w-md">
						<Box w="100%" h="100%" p="5px" border="2px" borderColor="default.600">
							<h1 className="font-semibold text-2xl">
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
							</h1>
							<h3 className="font-medium text-base my-2">
								Total price: ${numberWithCommas(subTotal)}
							</h3>
							<Button bg="default.600" color="#fff" _hover={{ bg:"default.500"}} onClick={proceedToShipping}>
								Proceed to checkout
							</Button>
						</Box>
					</div>
				</div>
			)
		}
	</WebLayout>;
};

export default CartScreen;
