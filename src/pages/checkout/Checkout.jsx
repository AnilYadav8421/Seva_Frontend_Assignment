import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../components/formInput/FormInput.jsx";
import { login } from "../../store/userSlice";
import styles from "./Checkout.module.css";

const Pincodes = {
  "560001": { city: "Bangalore", state: "Karnataka" },
  "110001": { city: "New Delhi", state: "Delhi" },
  "400001": { city: "Mumbai", state: "Maharashtra" },
};

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({ name: "", number: "", email: "" });
  const [isExistingUser, setIsExistingUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({ type: "Home", addrLine1: "", addrLine2: "", pincode: "", city: "", state: "" });
  const [pincodeError, setPincodeError] = useState("");

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  const handleUserChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    if (name === "pincode" && value.length === 6) {
      if (Pincodes[value]) {
        setAddress((prev) => ({ ...prev, city: Pincodes[value].city, state: Pincodes[value].state }));
        setPincodeError("");
      } else {
        setAddress((prev) => ({ ...prev, city: "", state: "" }));
        setPincodeError("Invalid Pincode");
      }
    }
  };

  const checkUserExistence = () => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(userDetails.number)) { setError("Mobile number must be 10 digits starting with 6-9"); return; }
    setError("");
    const existingNumbers = ["9876543210", "9123456780"];
    if (existingNumbers.includes(userDetails.number)) { setIsExistingUser(true); sendOtp(); }
    else { setIsExistingUser(false); }
  };

  const sendOtp = () => { console.log("Sending OTP to:", userDetails.number); setOtpSent(true); };

  const verifyOtp = () => {
    if (otp === "1234") {
      setIsVerified(true); setError("");
      dispatch(login({
        user: { name: userDetails.name || "Existing User", email: userDetails.email || "user@example.com", number: userDetails.number },
        orders: ["Order-XXXXX1", "Order-XXXXX2", "Order-XXXXX3"],
      }));
    } else { setError("Invalid OTP"); }
  };

  const isFormValid = isVerified && address.addrLine1 && address.pincode && address.city && address.state && !pincodeError;

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) { alert("Complete Card details"); return; }
    if (paymentMethod === "upi" && !upiId) { alert("Enter UPI ID"); return; }
    alert("Payment Successful!");
    setShowPayment(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Selected Items</h2>
        {cartItems.length === 0 ? <p>Your cart is empty.</p> :
          <ul className={styles.cartList}>
            {cartItems.map((item) => <li key={item.id}>{item.title} - ₹{item.Price}</li>)}
          </ul>}
      </div>

      <div className={styles.right}>
        <h2>User Details</h2>
        <FormInput label="Mobile Number" name="number" value={userDetails.number} onChange={handleUserChange} placeholder="10-digit number" />
        <button onClick={checkUserExistence}>Continue</button>

        {isExistingUser && otpSent && !isVerified && <>
          <FormInput label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>}
        {isExistingUser === false && !isVerified && <>
          <FormInput label="Name" name="name" value={userDetails.name} onChange={handleUserChange} />
          <FormInput label="Email" name="email" value={userDetails.email} onChange={handleUserChange} />
          {!otpSent ? <button onClick={sendOtp}>Send OTP</button> :
            <>
              <FormInput label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder={"type = 1234"}/>
              <button onClick={verifyOtp}>Verify OTP</button>
            </>}
        </>}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {pincodeError && <p style={{ color: "red" }}>{pincodeError}</p>}

        <h2>Address Details</h2>
        <FormInput label="Address Line 1" name="addrLine1" value={address.addrLine1} onChange={handleAddressChange} />
        <FormInput label="Address Line 2" name="addrLine2" value={address.addrLine2} onChange={handleAddressChange} />
        <FormInput label="Pincode" name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder={"type = 560001, 110001, 400001"} />
        <FormInput label="City" name="city" value={address.city} readOnly />
        <FormInput label="State" name="state" value={address.state} readOnly />

        <button className={styles.payButton} disabled={!isFormValid || cartItems.length === 0} onClick={() => setShowPayment(true)}>Pay Now</button>
      </div>

      {showPayment && (
        <div className={styles.paymentModal}>
          <div className={styles.paymentContent}>
            <h2>Payment</h2>
            <div className={styles.tabs}>
              <button onClick={() => setPaymentMethod("card")} className={paymentMethod === "card" ? styles.activeTab : ""}>Card</button>
              <button onClick={() => setPaymentMethod("upi")} className={paymentMethod === "upi" ? styles.activeTab : ""}>UPI</button>
            </div>

            {paymentMethod === "card" ? (
              <>
                <FormInput label="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
                <FormInput label="Expiry (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                <FormInput label="CVV" type="password" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
              </>
            ) : (
              <FormInput label="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            )}

            <div className={styles.modalButtons}>
              <button onClick={handlePayment}>Pay</button>
              <button onClick={() => setShowPayment(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
