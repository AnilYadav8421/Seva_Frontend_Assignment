import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import styles from "./SevaCard.module.css";

export default function SevaCard({ seva }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems || []);

    // Check if this seva is already in cart
    const inCart = cartItems.some((item) => item.id === seva.id);

    const handleCartToggle = () => {
        if (inCart) {
            dispatch(removeFromCart(seva.id));
        } else {
            dispatch(addToCart(seva));
        }
    };

    const { title, Price, image, description } = seva; // use image

    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <p className={styles.price}>₹{Price}</p>

            <button
                className={`${styles.cartButton} ${inCart ? styles.remove : ""}`}
                onClick={handleCartToggle}
            >
                {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    );
}
