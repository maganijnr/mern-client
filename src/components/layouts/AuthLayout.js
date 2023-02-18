import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const AuthLayout = ({ children }) => {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const { user } = auth

  useEffect(() => {
    if (user) {
      return navigate('/')
    }
  }, [user])

  return (
    <PageBody className="w-full h-screen flex items-center justify-center px-[50px] md:px-0">
      {children}
    </PageBody>
  )
}

export default AuthLayout

const PageBody = styled.div`
  background: rgba(52, 94, 36, 0.4);
`
