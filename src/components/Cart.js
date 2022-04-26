import React from "react";
import { useSelector } from "react-redux";
import { cartItems, tPrice } from "../store/cartSlice";
import CartItem from "./CartItem";

function Cart() {
  const cartList = useSelector(cartItems);
  const subTotal = useSelector(tPrice);

  return (
    <div className='w-[1200px] lg:w-full bg-silver flex overflow-auto'>
      <section className='flex flex-col w-[900px] lg:w-9/12 bg-white space-y-7 ml-6 mt-10 box-content'>
        <h1 className=' text-[35px] w-[850px] lg:w-11/12 ml-10 font-semibold border-b-[1px]  border-[#c5c4c4] py-4'>
          Shopping Cart
        </h1>
        {cartList &&
          cartList.map((item) => (
            <CartItem key={Math.random().toString()} item={item} />
          ))}
      </section>
      <aside className='w-[320px] ml-5 mt-10 bg-white h-[150px] flex flex-col justify-around items-center  '>
        <h1 className='text-xl font-semibold'>
          SubTotal(5 items):
          <span className='font-bold tracking-wide text-2xl '>
            {" "}
            ${subTotal.toFixed(2)}
          </span>
        </h1>
        <button className=' font-semibold w-10/12 h-[40px] bg-[#fad220] rounded-lg hover:bg-[#e9c111]'>
          Proceed to checkout
        </button>
      </aside>
    </div>
  );
}

export default Cart;
