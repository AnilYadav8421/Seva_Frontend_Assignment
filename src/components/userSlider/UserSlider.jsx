import React from "react";
import styles from "./UserSlider.module.css";

const UserSlider = ({ user, orders, onLogout }) => {
    return (
        <div className={styles.userSlider}>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <h5>Latest Orders:</h5>
            <ul>
                {orders.slice(0, 3).map((order, index) => (
                    <li key={index}>{order}</li>
                ))}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default UserSlider;
