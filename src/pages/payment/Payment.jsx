import React, { useState } from "react";
import styles from "./Payment.module.css";

export default function Payment({ totalAmount }) {
    const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'upi'

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const [upiId, setUpiId] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Validation
    const isCardValid =
        /^\d{16}$/.test(cardNumber) &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
        /^\d{3}$/.test(cvv);

    const isUpiValid = /^[\w.-]+@[\w]+$/.test(upiId);

    const handlePay = () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (paymentMethod === "card") {
            if (isCardValid) {
                setSuccessMessage(`Paid ₹${totalAmount} via Card successfully!`);
            } else {
                setErrorMessage("Invalid card details");
            }
        } else if (paymentMethod === "upi") {
            if (isUpiValid) {
                setSuccessMessage(`Paid ₹${totalAmount} via UPI successfully!`);
            } else {
                setErrorMessage("Invalid UPI ID");
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2>Payment</h2>
            <div className={styles.toggle}>
                <button
                    className={paymentMethod === "card" ? styles.active : ""}
                    onClick={() => setPaymentMethod("card")}
                >
                    Card
                </button>
                <button
                    className={paymentMethod === "upi" ? styles.active : ""}
                    onClick={() => setPaymentMethod("upi")}
                >
                    UPI
                </button>
            </div>

            <div className={styles.columns}>
                {paymentMethod === "card" && (
                    <div className={styles.left}>
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            maxLength={16}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/, ""))}
                            placeholder="1234567812345678"
                        />

                        <label>Expiry (MM/YY)</label>
                        <input
                            type="text"
                            value={expiry}
                            placeholder="MM/YY"
                            maxLength={5}
                            onChange={(e) => setExpiry(e.target.value)}
                        />

                        <label>CVV</label>
                        <input
                            type="password"
                            value={cvv}
                            maxLength={3}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/, ""))}
                            placeholder="123"
                        />
                    </div>
                )}

                {paymentMethod === "upi" && (
                    <div className={styles.right}>
                        <label>UPI ID</label>
                        <input
                            type="text"
                            value={upiId}
                            placeholder="name@bank"
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <button
                className={styles.payButton}
                disabled={
                    (paymentMethod === "card" && !isCardValid) ||
                    (paymentMethod === "upi" && !isUpiValid)
                }
                onClick={handlePay}
            >
                Pay ₹{totalAmount}
            </button>

            {successMessage && <p className={styles.success}>{successMessage}</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
    );
}
