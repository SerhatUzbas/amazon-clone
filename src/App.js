import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { setLogout, setUser } from "./store/userSlice";
import { auth } from "./firebase";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    let url = window.location.pathname;
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          setUser({
            userName: authuser.displayName,
            userEmail: authuser.email,
            userUid: authuser.uid,
          })
        );
        navigate(url);
        console.log(authuser);
      } else {
        dispatch(setLogout());
        navigate("/Login");
        console.log(authuser);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/Home' element={<Home />} />
        <Route path='/Cart' element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
