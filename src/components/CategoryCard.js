import React from 'react';
import styles from "../styles/category.module.css";
import { Link } from 'react-router-dom';

function CategoryCard(props) {
    const {name, svg, link} = props.category;
    return (
        <div>
            <Link to={link} className={`${styles.card} ${styles.education}`} >
                <div className={styles.overlay}></div>
                <div className={styles.circle}>
                    {svg}
                </div>
                <p>{name}</p>
            </Link>
        </div >
    )
}

export default CategoryCard;