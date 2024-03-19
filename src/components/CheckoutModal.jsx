import { forwardRef, useImperativeHandle, useRef } from "react";
import { addOrder } from "../fetching";
const CheckoutModal = forwardRef(function CheckoutModal({ money, items }, ref) {
  const checkout = useRef();

  function handleSubmit(event){
    event.preventDefault();
    const fd = new FormData(event.target)
    const data = Object.fromEntries(fd.entries());
    console.log(items)
    addOrder({
      items,
      customer: data, 
    })
    checkout.current.close()
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        checkout.current.showModal();
      },
    };
  });

  return (
    <dialog ref={checkout} className="modal">
      <h2>Checkout</h2>
      <p>Total amount: ${money}</p>
      <form onSubmit={handleSubmit} method="dialog" className="control">
        <p className="control-row">
          <label>Full Name</label>
          <input name="name" required />
        </p>
        <p className="control-row">
          <label>E-Mail address</label>
          <input name="email" type="email" required />
        </p>
        <p className="control-row">
          <label>Street</label>
          <input name="street" required />
        </p>
        <p className="control-row">
          <label>Postal Code</label>
          <input name="postal-code" type="number" required />
          <label>City</label>
          <input name="city" required />
        </p>
        <div className="modal-actions">
          <button className="text-button">Close</button>
          <button type="submit" className="button">
            Place Order
          </button>
        </div>
      </form>
    </dialog>
  );
});
export default CheckoutModal;
