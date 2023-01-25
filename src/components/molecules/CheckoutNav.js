import React from 'react'

const CheckoutNav = ({currentStep}) => {
   const isActive = 'text-secondary-600'
   const notActive = 'text-gray-500'
  return (
    <nav className='h-[60px] bg-slate-100 px-2 flex items-center justify-between max-w-lg mx-auto font-semibold'>
      <h2 className={currentStep >= 1 ? isActive : notActive}>Shipping</h2>
      <h2 className={currentStep >= 2 ? isActive : notActive}>Payment</h2>
      <h2 className={currentStep >= 3 ? isActive : notActive}>Place Order</h2>
    </nav>
  )
}

export default CheckoutNav
