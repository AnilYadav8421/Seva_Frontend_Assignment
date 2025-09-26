import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSlider from "./UserSlider";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Navbar = () => {
    const [showSlider, setShowSlider] = useState(false);
    const dispatch = useDispatch();

    const { user, orders, isLoggedIn } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        setShowSlider(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <div>
                    {isLoggedIn && (
                        <>
                            <button onClick={() => setShowSlider(!showSlider)}>User</button>
                            {showSlider && (
                                <UserSlider user={user} orders={orders} onLogout={handleLogout} />
                            )}
                        </>
                    )}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
