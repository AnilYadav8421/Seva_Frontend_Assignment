// SevaCard.jsx
import { useState } from "react";
import styles from "./SevaCard.module.css";

export default function SevaCard({ title, description, price, image }) {
    const [inCart, setInCart] = useState(false);

    const toggleCart = () => {
        setInCart((show) => !show);
    };
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.price}>₹{price}</p>

            <button className={`${styles.cartButton} ${inCart ? styles.remove : ""}`} onClick={toggleCart}>
                {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    );
}
