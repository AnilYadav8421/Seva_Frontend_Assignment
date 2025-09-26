import React from "react";
import styles from "./SevaCard.module.css";

const SevaCard = ({ title, description, image }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default SevaCard;
