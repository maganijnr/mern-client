import { Box, ButtonGroup, Stack } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WebLayout from '../components/layouts/WebLayout'
import CheckoutNav from '../components/molecules/CheckoutNav'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { SAVE_SHIPPING_INFO } from '../redux/features/cart/cartSlice'
import { toast } from 'react-toastify'
import { Radio, RadioGroup } from '@chakra-ui/react'
import PlaceOrderSection from '../components/organisms/PlaceOrderSection'

const CheckoutScreen = () => {
  const cartInfo = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [step, setStep] = useState(2)
  const { shippingInfo } = cartInfo
  const [address, setAddress] = useState(shippingInfo?.address || '')
  const [city, setCity] = useState(shippingInfo?.city || '')
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || '')
  const [country, setCountry] = useState(shippingInfo?.country || '')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [taxPrice, setTaxPrice] = useState(100)
  const [shippingFee, setShippingFee] = useState(200)
  const [totalPrice, setTotalPrice] = useState(0)

  const handleShippingSubmit = async (e) => {
    e.preventDefault()
    if (!address || !city || !postalCode || !country) {
      return toast.error('All feilds are required')
    }
    const data = { address, city, postalCode, country }
    dispatch(SAVE_SHIPPING_INFO(data))
    setStep(step + 1)
  }

  return (
    <WebLayout>
      <Box my="10px">
        <CheckoutNav currentStep={step} />

        <Box my="20px">
          {step === 1 && (
            <div className="mt-10 w-full max-w-lg mx-auto">
              <form onSubmit={handleShippingSubmit}>
                <FormControl marginY="20px">
                  <FormLabel>Address</FormLabel>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    focusBorderColor="default.600"
                    className="outline-none lg:max-w-md"
                    placeholder="Enter your street address"
                    size="lg"
                    border="2px"
                    borderColor="default.600"
                  />
                </FormControl>
                <FormControl marginY="20px">
                  <FormLabel>City</FormLabel>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    focusBorderColor="default.600"
                    className="outline-none lg:max-w-md"
                    placeholder="Enter your city"
                    size="lg"
                    border="2px"
                    borderColor="default.600"
                  />
                </FormControl>
                <FormControl marginY="20px">
                  <FormLabel>Postal code</FormLabel>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    focusBorderColor="default.600"
                    className="outline-none lg:max-w-md"
                    placeholder="Enter your postal code"
                    size="lg"
                    border="2px"
                    borderColor="default.600"
                  />
                </FormControl>
                <FormControl marginY="20px">
                  <FormLabel>Country</FormLabel>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    focusBorderColor="default.600"
                    className="outline-none lg:max-w-md"
                    placeholder="Enter your country"
                    size="lg"
                    border="2px"
                    borderColor="default.600"
                  />
                </FormControl>
                <Button
                  type="submit"
                  bg="default.600"
                  color="#fff"
                  px="100px"
                  _hover={{ bg: 'default.500' }}
                  borderRadius="0px"
                >
                  Continue
                </Button>
              </form>
            </div>
          )}
          {step === 2 && (
            <div className="mt-10 w-full max-w-lg mx-auto">
              <h2 className="font-semibold text-2xl">Select payment method</h2>

              <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                <Stack direction="column">
                  <Radio value="payPal" size="lg">
                    Pay pal
                  </Radio>
                  <Radio value="stripe" disabled size="lg">
                    Stripe (coming soon...)
                  </Radio>
                  <Radio value="paystack" disabled size="lg">
                    Paystack (coming soon...)
                  </Radio>
                </Stack>
              </RadioGroup>

              <ButtonGroup
                flex
                w="100%"
                mt="20px"
                justifyContent="space-between"
              >
                <Button
                  color="default.600"
                  bg="gray.100"
                  onClick={() => setStep(step - 1)}
                >
                  Return to shipping
                </Button>
                <Button
                  bg="default.600"
                  color="#fff"
                  onClick={() => setStep(step + 1)}
                  _hover={{ bg: 'default.500' }}
                >
                  Continue
                </Button>
              </ButtonGroup>
            </div>
          )}
          {step === 3 && (
            <PlaceOrderSection
              totalPrice={totalPrice}
              taxPrice={taxPrice}
              shippingFee={shippingFee}
              paymentMethod={paymentMethod}
              shippingInfo={shippingInfo}
              setTotalPrice={setTotalPrice}
            />
          )}
        </Box>
      </Box>
    </WebLayout>
  )
}

export default CheckoutScreen
