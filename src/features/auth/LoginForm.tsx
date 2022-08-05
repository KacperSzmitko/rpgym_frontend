import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authActions";
import { useAppDispatch } from "../../common/hooks";

export default function LoginForm() {
  const [email, setEmail] = useState("kacper@wp.pl");
  const [password, setPassword] = useState("Test1234!");
  const dispach = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let response = await dispach(login(email, password));
    if (response.status === 200) navigate("/");
    else {
      console.log("Niezalogowano");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Nazwa Użytkownika
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          Hasło
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input type="submit" value="Zaloguj" />
      </form>
    </div>
  );
}
