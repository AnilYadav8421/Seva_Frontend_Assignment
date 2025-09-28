import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormInput from "../../components/formInput/FormInput.jsx";

import styles from "./Checkout.module.css";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const [userDetails, setUserDetails] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [address, setAddress] = useState({
    type: "Home",
    addrLine1: "",
    addrLine2: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleUserChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isFormValid =
    userDetails.name &&
    /^[6-9]\d{9}$/.test(userDetails.number) &&
    userDetails.email &&
    address.addrLine1 &&
    address.pincode &&
    address.city &&
    address.state;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Selected Items</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ₹{item.Price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.right}>
        <h2>User Details</h2>
        <FormInput
          label="Name"
          name="name"
          value={userDetails.name}
          onChange={handleUserChange}
        />
        <FormInput
          label="Mobile Number"
          name="number"
          value={userDetails.number}
          onChange={handleUserChange}
          placeholder="10-digit number"
        />
        <FormInput
          label="Email"
          name="email"
          value={userDetails.email}
          onChange={handleUserChange}
        />

        <h2>Address Details</h2>
        <FormInput
          label="Address Line 1"
          name="addrLine1"
          value={address.addrLine1}
          onChange={handleAddressChange}
        />
        <FormInput
          label="Address Line 2"
          name="addrLine2"
          value={address.addrLine2}
          onChange={handleAddressChange}
        />
        <FormInput
          label="Pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleAddressChange}
        />
        <FormInput
          label="City"
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          readOnly
        />
        <FormInput
          label="State"
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          readOnly
        />

        <button
          className={styles.payButton}
          disabled={!isFormValid || cartItems.length === 0}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
