import { useEffect, useState } from "react";
import { refresh_cookie_token, logout } from "../state/actions/authActions";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

interface CustomizedState {
  tokenStatus: number;
}

export default function HomePage() {
  const location = useLocation();
  const [tokenStatus, setTokenStatus] = useState(0);
  const navigate = useNavigate();

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
    if (tokenStatus === 401) {
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
        <Outlet/>
      </div>
    );
  }

  return <div></div>;
}
