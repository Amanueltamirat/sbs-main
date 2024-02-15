import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignOutScren() {
    const navigate = useNavigate()
  return (
    <div>
    {
        navigate('/')
    }</div>
  )
}

export default SignOutScren