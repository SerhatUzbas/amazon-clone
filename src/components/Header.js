import React, { useEffect, useState } from "react";
import logo from "../img/reallogo.png";
import { GoLocation } from "react-icons/go";
import { BiSearchAlt2 } from "react-icons/bi";
import { ImCart } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserName, setLogout } from "../store/userSlice";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { cartItems, tAmount, uploadCart } from "../store/cartSlice";
function Header() {
  const userName = useSelector(selectUserName);
  const totalAmount = useSelector(tAmount);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cartList = useSelector(cartItems);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setLogout());
        navigate("/Login");
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    db.collection(`${userId}`).onSnapshot((snapshot) =>
      dispatch(uploadCart(snapshot))
    );
    console.log(cartList);
  }, [userId]);

  const [higlighted, setHighligted] = useState(false);
  const cartClasses = `flex justify-between w-11 items-center cursor-pointer duration-700 transition-all ease-out group ${
    higlighted ? "scale-125" : ""
  }`;

  useEffect(() => {
    setHighligted(true);
    const timer = setTimeout(() => setHighligted(false), 700);
    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <>
      <header className='w-[1200px] lg:w-full bg-header h-[70px] flex items-center'>
        <nav className='flex items-center  min-w-[300px] h-[50px] justify-evenly'>
          <div className='w-[120px] -ml-4'>
            <img
              src={logo}
              alt='asd'
              className='w-full mt-1 text-white fill-white cursor-pointer'
              onClick={() => navigate("/Home")}
            />
          </div>
          <div className='flex items-center justify-between w-[65px]'>
            <GoLocation className=' fill-white' />
            <h2 className='text-white cursor-pointer hover:text-[#d4d4d4]'>
              Turkey
            </h2>
          </div>
        </nav>

        <form className='bg-pink min-w-[480px] md:w-[800px] h-[40px] flex items-center'>
          <select className='text-xs h-full rounded-l-[4px] bg-silver border-r-[1px] border- px-2'>
            <option className='text-xs cursor-pointer'>All</option>
          </select>
          <input type='text' className='w-full h-[40px]' />
          <button className='w-[40px] bg-search h-[40px] flex justify-center items-center px-2 rounded-r-[4px]'>
            <BiSearchAlt2 className='w-[30px] h-20' />
          </button>
        </form>
        <nav className='flex w-[250px] md:w-[450px] ml-1 justify-around items-center'>
          {userName ? (
            <h2
              className='text-white font-semibold cursor-pointer hover:text-[#d4d4d4]'
              onClick={logOut}
            >
              {userName}(Sign out)
            </h2>
          ) : (
            <h2
              className='text-white font-semibold'
              onClick={() => {
                navigate("/Login");
              }}
            >
              Sign In
            </h2>
          )}

          <h2 className='text-white font-semibold cursor-pointer hover:text-[#d4d4d4]'>
            Returns & Orders
          </h2>
          <div className={cartClasses} onClick={() => navigate("/Cart")}>
            <ImCart className='fill-[#f8bd4f] group-hover:animate-bounce' />
            <h1 className='text-[#f8bd4f] text-lg font-semibold group-hover:animate-bounce'>
              {totalAmount}
            </h1>
          </div>
        </nav>
      </header>
      <header className='w-[1200px] lg:w-full bg-headersecond h-[50px] flex items-center'>
        <nav className='flex w-[600px] justify-around items-center h-full'>
          <div className='flex items-center justify-between cursor-pointer group  p-2 '>
            <GiHamburgerMenu className='h-[40px] fill-white group-hover:fill-[#d4d4d4] ' />
            <h1 className='text-white ml-2 group-hover:text-[#d4d4d4] '>All</h1>
          </div>
          <h3 className='text-white text-sm font-semibold  cursor-pointer hover:text-[#d4d4d4] p-2'>
            Today's Deals
          </h3>
          <h3 className='text-white text-sm font-semibold cursor-pointer hover:text-[#d4d4d4] p-2'>
            Customer Service
          </h3>
          <h3 className='text-white text-sm font-semibold cursor-pointer hover:text-[#d4d4d4] p-2'>
            Registry
          </h3>
          <h3 className='text-white text-sm font-semibold cursor-pointer hover:text-[#d4d4d4] p-2'>
            Gift Cards
          </h3>
          <h3 className='text-white text-sm font-semibold cursor-pointer hover:text-[#d4d4d4] p-2'>
            Sell
          </h3>
        </nav>
      </header>
    </>
  );
}

export default Header;
