import { Box, Button, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { numberWithCommas } from '../../helpers/numberWithCommas'
import { CREATE_ORDER } from '../../redux/features/cart/cartSlice'
import { placeOrder } from '../../redux/services/cartService'

const PlaceOrderSection = ({
  totalPrice,
  setTotalPrice,
  taxPrice,
  shippingFee,
  paymentMethod,
}) => {
  const [itemsTotal, setItemsTotal] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart)
  const { cartItems, shippingInfo, order } = cartState

  const handlePlaceOrder = async () => {
    try {
      const data = await placeOrder(
        cartItems,
        shippingInfo,
        paymentMethod,
        itemsTotal,
        taxPrice,
        totalPrice,
        shippingFee,
      )

      dispatch(CREATE_ORDER(data.order))
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (order && order.status === 'Processing') {
      navigate('/orders')
    }
  }, [order])

  useEffect(() => {
    const calcSubTotal = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
      )

      setItemsTotal(total)
    }
    calcSubTotal()
  }, [cartItems])

  useEffect(() => {
    const calcTotal = () => {
      const priceArr = [itemsTotal, taxPrice, shippingFee]
      const total = priceArr.reduce((a, b) => a + b, 0)
      setTotalPrice(total)
    }

    calcTotal()
  }, [itemsTotal, taxPrice, shippingFee])

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-5">
      <Box w="100%">
        <div>
          <h2 className="font-semibold text-2xl text-secondary-600 mb-2 uppercase">
            Shipping
          </h2>
          <p className="font-normal text-base">
            Address: {shippingInfo.address}, {shippingInfo.city},{' '}
            {shippingInfo.country}
          </p>
        </div>
        <Divider bg="default.600" my="5px" />
        <div>
          <h2 className="font-semibold text-2xl text-secondary-600 mb-2 uppercase">
            Payment Method
          </h2>
          <p className="font-normal text-base capitalize">
            Method: {paymentMethod}
          </p>
        </div>
        <Divider bg="default.600" my="5px" />
        <div>
          <h2 className="font-semibold text-2xl text-secondary-600 mb-2 uppercase">
            Order Items
          </h2>
          <div>
            {cartItems.map((item) => (
              <div key={item._id}>
                <div className="flex my-2 items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover max-w-[40px] max-h-[40px]"
                    />
                    <h2>{item.name}</h2>
                  </div>
                  <div>
                    <p>
                      {item.qty} * ${numberWithCommas(item.price)} = $
                      {numberWithCommas(item.qty * item.price)}
                    </p>
                  </div>
                </div>
                <Divider bg="default.600" my="5px" />
              </div>
            ))}
          </div>
        </div>
      </Box>
      <Box w="450px">
        <div className="p-2 border border-secondary-600 w-full">
          <h2 className="font-semibold text-2xl text-secondary-600">
            Order summary
          </h2>
          <Divider className="my-1" />
          <div className="flex items-center justify-between">
            <h2>Items</h2>
            <h3>${numberWithCommas(itemsTotal)}</h3>
          </div>
          <Divider className="my-1" />
          <div className="flex items-center justify-between">
            <h2>Shipping fee</h2>
            <h3>${numberWithCommas(shippingFee)}</h3>
          </div>
          <Divider className="my-1" />
          <div className="flex items-center justify-between">
            <h2>Tax Price</h2>
            <h3>${numberWithCommas(taxPrice)}</h3>
          </div>
          <Divider className="my-1" />
          <div className="flex items-center justify-between">
            <h2>Total Price</h2>
            <h3>${numberWithCommas(totalPrice)}</h3>
          </div>
          <Divider className="my-1" />
          <Button
            w="100%"
            borderRadius="0px"
            bg="default.600"
            _hover={{ bg: 'default.500' }}
            color="#fff"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default PlaceOrderSection
