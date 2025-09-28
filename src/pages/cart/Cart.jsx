import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom"; // import for navigation
import styles from "./Cart.module.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/checkout"); // navigate to Checkout page
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice,
    0
  );

  return (
    <div className={styles.container}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.info}>
                  <h2>{item.title}</h2>
                  <p>₹{item.Price}</p>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ₹{totalAmount}</h2>

          {/* ✅ Proceed to Checkout Button */}
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
