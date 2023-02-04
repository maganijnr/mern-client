import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import WebLayout from '../components/layouts/WebLayout'
import { GET_ALL_USER_ORDERS } from '../redux/features/cart/cartSlice'
import { getUserOrders } from '../redux/services/cartService'

const OrderScreen = () => {
  const dispatch = useDispatch()
  async function getAllOrders() {
    const data = await getUserOrders()
    console.log(data)
    dispatch(GET_ALL_USER_ORDERS(data))
  }
  useEffect(() => {
    getAllOrders()
  }, [])
  return <WebLayout>OrderScreen</WebLayout>
}

export default OrderScreen
