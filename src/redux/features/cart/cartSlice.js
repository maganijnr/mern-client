import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  cartItems: localStorage.getItem('cartItems')
    ? [...JSON.parse(localStorage.getItem('cartItems'))]
    : [],

  shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : null,
  payment: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : null,

  order: null,
  orders: [],
  success: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    CART_ADD_ITEM(state, action) {
      const item = action.payload

      const itemExist = state.cartItems.find((x) => x._id === item._id)

      if (!itemExist) {
        localStorage.setItem(
          'cartItems',
          JSON.stringify([...state.cartItems, item]),
        )
        state.cartItems = [...state.cartItems, item]
      }
    },
    REMOVE_CART_ITEM(state, action) {
      const itemId = action.payload

      const findItem = state.cartItems.find((x) => x._id === itemId)

      if (findItem) {
        const newCartItems = state.cartItems.filter((x) => x._id !== itemId)
        state.cartItems = newCartItems
      }
    },
    SAVE_SHIPPING_INFO(state, action) {
      if (!state.shippingInfo) {
        localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
      }
    },
    SAVE_PAYMENT_METHOD(state, action) {
      if (!state.payment) {
        localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
      }
    },
    CREATE_ORDER(state, action) {
      state.loading = true
      state.order = action.payload
      state.loading = false
    },
    GET_ALL_USER_ORDERS(state, action) {
      state.loading = true
      state.orders = action.payload
      state.loading = false
    },
    ORDER_PAY(state, action) {
      state.loading = true
      state.success = true
      state.loading = false
    },
  },
})

export const {
  CART_ADD_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CREATE_ORDER,
  GET_ALL_USER_ORDERS,
} = cartSlice.actions

export default cartSlice.reducer

export const getCartState = (state) => state.cart
