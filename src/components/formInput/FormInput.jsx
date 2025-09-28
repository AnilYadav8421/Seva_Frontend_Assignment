import React from "react";
import styles from "./FormInput.module.css";

export default function FormInput({ label, type = "text", value, onChange, placeholder, ...rest }) {
    return (
        <div className={styles.inputGroup}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}
