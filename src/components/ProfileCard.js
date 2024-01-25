import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/profile.module.css';
import { HiArrowLongRight } from "react-icons/hi2";

function ProfileCard(props) {
    const { heading, info, link, icon } = props.card;
    return (
        <div className={styles.card}>
            <Link className={styles.card1} to={link}>
                <div className={styles.icon}>
                    {icon}
                </div>
                <div>
                    <p>{heading}</p>
                    <p className={styles.small}>{info}</p>
                    <div className={styles.go_corner}>
                        <div className={styles.go_arrow}>
                            <HiArrowLongRight />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProfileCard;