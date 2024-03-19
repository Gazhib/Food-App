import image from "./assets/logo.jpg";
import Meals from "./components/Meals";
import { useState, useRef } from "react";
import CartModal from "./components/CartModal";
import { fetching } from "./fetching";

function App() {
  const meals = fetching();

  const modalRef = useRef();
  function openModal() {
    modalRef.current.open();
  }
  const [order, setOrder] = useState({});
  function handleAdding(meal, price) {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [meal]: {
        price,
        count: prevOrder[meal] ? prevOrder[meal].count + 1 : 1,
      },
    }));
  }

  function handleClicking(type, meal, price) {
    setOrder((prevOrder) => {
      const newCount = type === "+" ? (prevOrder[meal]?.count || 0) + 1 : (prevOrder[meal]?.count || 0) - 1;
      const updatedOrder = { ...prevOrder };
  
      if (newCount <= 0) {
        delete updatedOrder[meal];
      } else {
        updatedOrder[meal] = { price, count: newCount };
      }
  
      return updatedOrder;
    });
  }
  

  const cartNumber = Object.keys(order).length;
  return (
    <>
      <main id="main-header">
        <div id="title">
          <img src={image} />
          <h1>REACTFOOD</h1>
        </div>
        <button onClick={openModal}>Cart {`(${cartNumber})`}</button>
      </main>
      <Meals onAdding={handleAdding} meals={meals}  />
      <CartModal ref={modalRef} order={order} meals={meals} onClicking = {handleClicking}/>
    </>
  );
}

export default App;
