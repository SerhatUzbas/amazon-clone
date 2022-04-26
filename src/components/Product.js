import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/userSlice";
import { cartItems } from "../store/cartSlice";

function Product({ item }) {
  const userId = useSelector(selectUserId);
  const items = useSelector(cartItems);
  const addItemToCart = async () => {
    const existedItem = items.find((listitem) => listitem.data.id === item.id);
    console.log(existedItem);
    if (existedItem) {
      const existedItemRef = doc(db, `${userId}`, `${existedItem.id}`);
      await updateDoc(existedItemRef, {
        quantity: existedItem.data.quantity + 1,
        totalItemPrice: existedItem.data.totalItemPrice + item.price,
      });
    } else {
      await addDoc(collection(db, `${userId}`), {
        price: item.price,
        title: item.title,
        image: item.image,
        id: item.id,
        quantity: 1,
        totalItemPrice: item.price,
      });
    }
  };
  return (
    <div className='flex flex-col h-[500px] w-[273px]  lg:w-[297px] bg-[#dfa019] items-center justify-around '>
      <h1 className='text-white w-10/12  font-semibold truncate'>
        {item.title}
      </h1>
      <img
        src={item.image}
        alt={item.title}
        className='w-10/12 h-[300px] rounded-[20px]'
      />
      <div className='flex w-10/12 justify-between items-center'>
        <h2 className='text-white font-bold tracking-wide'>
          ${item.price.toFixed(2)}
        </h2>
        <AiOutlinePlusCircle
          onClick={addItemToCart}
          className=' fill-white w-10 h-10 hover:scale-125 transition-all duration-200 ease-out cursor-pointer'
        />
      </div>
    </div>
  );
}

export default Product;
