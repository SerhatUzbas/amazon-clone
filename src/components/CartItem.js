import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { cartItems } from "../store/cartSlice";
import { selectUserId } from "../store/userSlice";

function CartItem({ item }) {
  const items = useSelector(cartItems);
  const userId = useSelector(selectUserId);

  const addItemToCart = async () => {
    const existedItem = items.find(
      (listitem) => listitem.data.id === item.data.id
    );
    if (existedItem) {
      const existedItemRef = doc(db, `${userId}`, `${existedItem.id}`);

      await updateDoc(existedItemRef, {
        quantity: existedItem.data.quantity + 1,
        totalItemPrice:
          Number(existedItem.data.totalItemPrice) + Number(item.data.price),
      });
    }
  };

  const removeItemFromCart = async () => {
    const existedItem = items.find(
      (listitem) => listitem.data.id === item.data.id
    );
    const existedItemRef = doc(db, `${userId}`, `${existedItem.id}`);
    if (existedItem.data.quantity === 1) {
      await deleteDoc(existedItemRef);
    } else {
      await updateDoc(existedItemRef, {
        quantity: existedItem.data.quantity - 1,
        totalItemPrice:
          Number(existedItem.data.totalItemPrice) - Number(item.data.price),
      });
    }
  };

  const deleteItemfromCart = async () => {
    const existedItem = items.find(
      (listitem) => listitem.data.id === item.data.id
    );
    const existedItemRef = doc(db, `${userId}`, `${existedItem.id}`);
    await deleteDoc(existedItemRef);
  };
  return (
    <div className='flex w-[850px] lg:w-11/12 border-b-[1px] border-[#c5c4c4] ml-10 px-3'>
      <div className='w-[200px] h-[200px] '>
        <img
          src={item.data.image}
          alt={item.data.title}
          className='max-w-[140px] min-w-[80px] max-h-[160px] w-full'
        />
      </div>
      <div className='flex flex-col h-[160px] justify-around flex-1'>
        <h1 className=' text-xl font-semibold'>{item.data.title}</h1>
        <h3 className=' text-[#228622]'>In stock</h3>
        <div className='flex w-[550px] '>
          <div className='border-r-[1px]   border-[#c5c4c4] flex w-[90px] items-center justify-between pr-5'>
            <AiOutlinePlusCircle
              onClick={addItemToCart}
              className=' w-5 cursor-pointer'
            />
            <h2 className='w-2'>{item.data.quantity} </h2>
            <AiOutlineMinusCircle
              onClick={removeItemFromCart}
              className='w-5 cursor-pointer'
            />
          </div>
          <h3
            onClick={deleteItemfromCart}
            className='text-[#26681d] border-r-[1px] px-5 cursor-pointer border-[#c5c4c4] hover:underline'
          >
            Delete
          </h3>
          <h3 className='text-[#26681d] cursor-pointer border-r-[1px] px-5 border-[#c5c4c4] hover:underline'>
            Save for later
          </h3>
          <h3 className='text-[#26681d] cursor-pointer px-5 hover:underline '>
            Compare with similar items
          </h3>
        </div>
      </div>
      <h1 className=' text-lg mt-2 font-bold'>
        ${item.data.totalItemPrice.toFixed(2)}
      </h1>
    </div>
  );
}

export default CartItem;
