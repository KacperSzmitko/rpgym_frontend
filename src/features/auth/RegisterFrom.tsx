import React, { useState } from 'react'
import { register } from './authActions'
import { useAppDispatch } from '../../common/hooks'

export default function RegisterFrom () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const dispach = useAppDispatch()

  async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password !== rePassword) {
      console.log('Hasła nie są identyczne')
      return
    }
    const response = await dispach(register(email, password))
    if (response.status === 201) {
      console.log('Pomyślnie utworzono konto')
    } else {
      console.log('Nie udało się utowrzyć konta')
    }
  }

  return (
    <div>
      <form onSubmit={async (e) => await onSubmit(e)}>
        <div>
          Nazwa użytkownika
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          Hasło
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          Powtórz hasło
          <input
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Utwórz konto"></input>
      </form>
    </div>
  )
}
