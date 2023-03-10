import axios from 'axios'
import { toast } from 'react-toastify'

export const addCartItem = async (id, qty) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`,
    )

    const data = {
      ...response.data,
      qty: Number(qty),
    }

    return data
  } catch (error) {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(msg)
  }
}

export const placeOrder = async (
  cartItems,
  shippingInfo,
  paymentMethod,
  itemsTotal,
  taxPrice,
  totalPrice,
  shippingFee,
) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }

  const orderInfo = {
    orderItems: cartItems,
    shippingAddress: shippingInfo,
    paymentMethod,
    itemsPrice: itemsTotal,
    taxPrice,
    totalPrice,
    shippingFee,
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders/`,
      orderInfo,
      config,
    )

    return response.data
  } catch (error) {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(msg)
  }
}

export const getUserOrders = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders/`,
    )

    return response.data
  } catch (error) {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(msg)
  }
}

export const payForOrder = async (orderId, paymentResult) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    )

    return response.data
  } catch (error) {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    toast.error(msg)
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
