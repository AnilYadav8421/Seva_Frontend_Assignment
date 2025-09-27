import React, { useEffect, useState } from "react";
import SevaCard from "../../components/sevaCard/SevaCard";
import styles from "./LandingPage.module.css";
import mockSevas from "../../mocks/mockSevas.json";

export default function LandingPage() {
    const [sevas, setSevas] = useState([]);
    const [page, setPage] = useState(1);

    // Use mock data directly instead of fetching
    useEffect(() => {
        setSevas(mockSevas);
    }, []);

    const handleViewMore = () => setPage((prev) => prev + 1);

    return (
        <div className={styles.container}>
            <h1>All Sevas</h1>
            <div className={styles.grid}>
                {sevas.slice(0, page * 10).map((seva) => (
                    <SevaCard
                        key={seva.id}
                        title={seva.title}
                        price={seva.Price}
                        image={seva.image}
                    />
                ))}
            </div>
            {page * 10 < sevas.length && (
                <button className={styles.viewMore} onClick={handleViewMore}>
                    View More
                </button>
            )}
        </div>
    );
}
