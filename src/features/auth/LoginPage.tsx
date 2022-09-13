import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterFrom from './RegisterFrom'
import { useLocation, useNavigate } from 'react-router-dom'
import { refresh_cookie_token } from './authActions'

interface CustomizedState {
  tokenStatus: number
}

export default function LoginPage () {
  const location = useLocation()
  const [tokenStatus, setTokenStatus] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    const state = location.state as CustomizedState
    if (!state) {
      refresh_cookie_token().then((response) =>
        setTokenStatus(response.status)
      )
    } else {
      setTokenStatus(state.tokenStatus)
    }
  }, [])

  useEffect(() => {
    if (tokenStatus === 200) {
      navigate('/', { state: { tokenStatus } })
    }
  }, [tokenStatus])

  if (tokenStatus === 401) {
    return (
      <div>
        <LoginForm />
        <RegisterFrom />
      </div>
    )
  }
  return <div></div>
}
