import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConatinerWrapper from '../molecules/ContainerWrapper'
import Navbar from '../molecules/Navbar'

const WebLayout = ({ children }) => {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const { user } = auth

  useEffect(() => {
    if (!user) {
      return navigate('/login')
    }
  }, [user])

  return (
    <div>
      <Navbar />
      <ConatinerWrapper className="!pt-[75px] !pb-[50px]">
        {children}
      </ConatinerWrapper>
    </div>
  )
}

export default WebLayout
