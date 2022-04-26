import React, { useState, useEffect } from "react";
import MainImage from "../img/imaje.jpg";
import Product from "./Product";
function MainContent() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div
        className='w-[1200px] bg-cover  lg:w-full h-[500px] relative flex justify-center'
        style={{ backgroundImage: `url(${MainImage})` }}
      >
        <div className='w-[1140px] lg:w-11/12 mx-auto bg-white  h-12 absolute top-[300px] flex items-center justify-center'>
          <h1 className=' font-medium'>
            You are on amazon.com. You can also shop on Amazon Turkey for
            millions of products with fast local delivery. Click here to go to
            amazon.com.tr
          </h1>
        </div>
      </div>
      <section className='w-[1200px] h-[2800px] lg:w-full flex justify-center bg-background -mt-[120px]'>
        <div className='w-[1140px]  lg:w-11/12 inline-flex gap-4 flex-wrap z-40'>
          {products &&
            products.map((product) => (
              <Product item={product} key={product.id} />
            ))}
        </div>
      </section>
    </>
  );
}

export default MainContent;
