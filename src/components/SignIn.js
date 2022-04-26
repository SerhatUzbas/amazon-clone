import React from "react";
import { useDispatch } from "react-redux";
import logo from "../img/amalogo.png";
import {
  selectUserEmail,
  selectUserName,
  setLogout,
  setUser,
} from "../store/userSlice";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      if (result) {
        console.log(result);

        dispatch(
          setUser({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userUid: result.user.uid,
          })
        );
        navigate("/Home");
      }
    });
  };
  return (
    <div className=' w-full h-full flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <img
          src={logo}
          alt='asd'
          className='w-full mt-1 text-white fill-white'
        />
        <button onClick={logIn} className='w-5/12  bg-button'>
          <h1 className='text-white text-lg font-semibold hover:bg-search transition-all duration-150 ease-out '>
            Login with Google Account
          </h1>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
