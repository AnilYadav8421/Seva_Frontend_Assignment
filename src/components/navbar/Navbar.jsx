import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSlider from "../userSlider/UserSlider";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Navbar = () => {
    const [showSlider, setShowSlider] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, orders, isLoggedIn } = useSelector((state) => state.user);
    // const { items } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        setShowSlider(false);
        navigate("/"); // redirect to home after logout
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                {/* Home */}
                <Link to="/">Home</Link>

                {/* Cart with item count */}
                <Link to="/cart"> Cart </Link>

                {/* User */}
                <div className={styles.userSection}>
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setShowSlider(!showSlider)}
                                aria-expanded={showSlider}
                                className={styles.userBtn}
                            >
                                User
                            </button>
                            {showSlider && (
                                <UserSlider
                                    user={user}
                                    orders={orders}
                                    onLogout={handleLogout}
                                />
                            )}
                        </>
                    ) : (
                        <Link to="/login">User</Link> // if not logged in, goes to login page
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
