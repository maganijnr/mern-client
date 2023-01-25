import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import {useState} from 'react'
import WebLayout from '../components/layouts/WebLayout'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SAVE_SHIPPING_INFO } from '../redux/features/cart/cartSlice'

const ShippingScreen = () => {
   const dispatch = useDispatch()
   const state = useSelector((state) => state.cart)
   const navigate = useNavigate()

   const {shippingInfo} = state

   const [address, setAddress] = useState(shippingInfo?.address || "")
   const [city, setCity] = useState(shippingInfo?.city || "")
   const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "")
   const [country, setCountry] = useState(shippingInfo?.country || "")
   

   const handleSubmit = async (e) => {
      e.preventDefault()

      if(!address || !city || !postalCode || !country){
         return toast.error("All feilds are required")
      }

      if(shippingInfo){
         navigate('/checkout')
      } else{
         const data = {address, city, postalCode, country}

         dispatch(SAVE_SHIPPING_INFO(data))
          navigate('/checkout')
      }

   }

  return (
    <WebLayout>
      <div className='mt-10 w-full max-w-lg mx-auto'>
         <form onSubmit={handleSubmit}>
            <h1 className='font-semibold text-3xl text-secondary-600'>SHIPPING</h1>
            <FormControl marginY="20px">
               <FormLabel>Address</FormLabel>
               <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  focusBorderColor="default.600"
                  className="outline-none lg:max-w-md"
                  placeholder='Enter your street address' size='lg' 
                  border="2px" borderColor="default.600"
               />
            </FormControl>
            <FormControl marginY="20px">
               <FormLabel>City</FormLabel>
               <Input 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  focusBorderColor="default.600"
                  className="outline-none lg:max-w-md"
                  placeholder='Enter your city' size='lg'
                  border="2px" borderColor="default.600"
               />
            </FormControl>
            <FormControl marginY="20px">
               <FormLabel>Postal code</FormLabel>
               <Input 
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)}
                  focusBorderColor="default.600"
                  className="outline-none lg:max-w-md"
                  placeholder='Enter your postal code' size='lg'
                  border="2px" borderColor="default.600"
               />
            </FormControl>
            <FormControl marginY="20px">
               <FormLabel>Country</FormLabel>
               <Input 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  focusBorderColor="default.600"
                  className="outline-none lg:max-w-md"
                  placeholder='Enter your country' size='lg'
                  border="2px" borderColor="default.600"
               />
            </FormControl>
            <Button type="submit" bg="default.600" color="#fff" px="100px" _hover={{bg:"default.500"}} borderRadius="0px">Continue</Button>
         </form>
      </div>
    </WebLayout>
  )
}

export default ShippingScreen
