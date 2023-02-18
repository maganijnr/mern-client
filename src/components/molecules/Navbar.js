import React, { useState } from 'react'
import ConatinerWrapper from './ContainerWrapper'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { LOGOUT_USER } from '../../redux/features/auth/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(LOGOUT_USER())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-[75px] bg-secondary-600 flex items-center fixed top-0 left-0 z-50">
      <ConatinerWrapper>
        {/*Mobile*/}
        <div className="w-full h-full flex items-center justify-between md:hidden relative">
          <Link to="/" className=" font-bold text-3xl text-white">
            Eubond Shop
          </Link>

          <button onClick={handleLogout}>Logout</button>

          <button
            className="outline-none bg-transparent cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <FaBars fontSize={25} color="white" />
          </button>
        </div>

        {/*Large screens*/}
        <div className="w-full h-full md:flex md:items-center md:justify-between hidden relative">
          <Link to="/" className=" font-bold text-3xl text-white">
            Eubond Shop
          </Link>

          <div className="h-full flex space-x-5 items-center">
            <Link to="/" className=" font-medium text-xl text-white">
              Home
            </Link>
            <Link to="/products" className=" font-medium text-xl text-white">
              Products
            </Link>
            <Link to="/cart" className=" font-medium text-xl text-white">
              Cart
            </Link>
          </div>
        </div>
      </ConatinerWrapper>
      <div
        className={
          isOpen
            ? 'w-screen h-screen max-h-screen bg-secondary-600 absolute top-0 left-0 block md:hidden transition-all ease-in-out duration-300 visible'
            : '-top-[1000px] absolute left-0 hidden duration-300 transition-all ease-in-out'
        }
      >
        <ConatinerWrapper className="relative flex flex-col items-center justify-center space-y-5">
          <Link to="/" className="font-semibold text-white text-2xl">
            Home
          </Link>
          <Link to="/products" className="font-semibold text-white text-2xl">
            Products
          </Link>
          <Link to="/cart" className="font-semibold text-white text-2xl">
            Cart
          </Link>
          <button
            className="outline-none bg-transparent cursor-pointer absolute top-4 right-10"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes fontSize={25} color="white" />
          </button>
        </ConatinerWrapper>
      </div>
    </div>
  )
}

export default Navbar
