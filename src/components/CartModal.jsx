import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import CheckoutModal from "./CheckoutModal";
const CartModal = forwardRef(function CartModal({ order, onClicking }, ref) {
  const dialog = useRef();
  const [totalAmount, setTotalAmount] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });


  useEffect(() => {
    const initialAmount = Object.entries(order).reduce(
      (total, [, { price, count }]) => {
        return total + price * count;
      },
      0
    ); 
    setTotalAmount(initialAmount)
  }, [order])




  const checkout = useRef();

  function handleCheckout() {
    checkout.current.open();
  }
  return (
    <>
      <dialog ref={dialog} className="modal">
        <div className="cart">
          <h2>Your order:</h2>
          <ul>
            {Object.keys(order).map((meal, index) => {
              return (
                <>
                  <li key={index} className="cart-item">
                    {meal} - {order[meal].count} x ${order[meal].price}
                    <div className="cart-item-actions">
                      <button
                        onClick={() => onClicking("-", meal, order[meal].price)}
                      >
                        -
                      </button>
                      {order[meal].count}
                      <button
                        onClick={() => onClicking("+", meal, order[meal].price)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
          <p className="cart-total">${totalAmount}</p>
          <div className="modal-actions">
            <form method="dialog">
              <button className="text-button">Close</button>
              <button onClick={handleCheckout} type="submit" className="button">
                Go to Checkout
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <CheckoutModal items = {Object.keys(order)} money={totalAmount} ref={checkout} />
    </>
  );
});
export default CartModal;
