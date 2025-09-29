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

    const handleLogout = () => {
        dispatch(logout());
        setShowSlider(false);
        navigate("/");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/cart"> Cart </Link>

                <div className={styles.userSection}>
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setShowSlider(!showSlider)}
                                aria-expanded={showSlider}
                                className={styles.userBtn}> User
                            </button>
                            {showSlider && (
                                <UserSlider
                                    user={user}
                                    orders={orders}
                                    onLogout={handleLogout}
                                />
                            )}
                        </>
                    ) : (<Link to="/login">User</Link>)}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
