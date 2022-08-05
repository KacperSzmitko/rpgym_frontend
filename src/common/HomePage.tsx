import { useEffect, useState } from "react";
import { refresh_cookie_token, logout } from "../features/auth/authActions";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { getExercises } from "../features/exercises/actions";
import { getMuscleParts } from "../features/muscleParts/actions";
import { Link } from "react-router-dom";

interface CustomizedState {
  tokenStatus: number;
}

export default function HomePage() {
  const location = useLocation();
  const [tokenStatus, setTokenStatus] = useState(0);
  const navigate = useNavigate();
  const dispach = useAppDispatch();

  useEffect(() => {
    // State is set if there was a redirection
    let state = location.state as CustomizedState;
    if (state) {
      setTokenStatus(state.tokenStatus);
    } else {
      refresh_cookie_token().then((response) =>
        setTokenStatus(response.status)
      );
    }
  }, []);

  useEffect(() => {
    if (tokenStatus === 200) {
      dispach(getMuscleParts());
      dispach(getExercises());
    } else if (tokenStatus === 401) {
      navigate("/login", { state: { tokenStatus: tokenStatus } });
    }
  }, [tokenStatus]);

  async function logOut() {
    let response = await logout();
    if (response.status === 200) {
      navigate("/login");
    }
  }

  if (tokenStatus === 200) {
    return (
      <div>
        Zalogowano
        <button onClick={logOut}>Wyloguj</button>
        <br />
        <Link to="">Strona główna</Link> <br />
        <Link to="/modules">Moduły</Link> <br />
        <Link to="/plans">Plany</Link> <br />
        <Outlet />
      </div>
    );
  }

  return <div></div>;
}
