import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/address.module.css';
import { HiArrowLongRight } from "react-icons/hi2";
import { MdOutlineEditLocation } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function AddressCard(props) {
    const { _id, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType } = props.address;
    const addressParts = [addressLine1, addressLine2, landmark, city, state];
    const filteredAddressParts = addressParts.filter(part => part !== null && part !== undefined && part !== "");
    const formattedAddress = filteredAddressParts.join(", ") + " - " + pincode;

    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <p className={styles.tag}>{addressType}</p>
                <p className={styles.card_title}>{name}</p>
                <p className={styles.small_desc}>
                    {formattedAddress}
                </p>
                <p className={styles.small_desc}>
                    Mobile number: {mobileNumber}
                </p>
            </div>
            <div className={styles.go_corner}>
                <div className={styles.go_arrow}><HiArrowLongRight /></div>
            </div>
            <div className={styles.action}>
                <Link to={"/users/addresses/edit/" + _id} className={styles.edit}><MdOutlineEditLocation size={24} /></Link>
                |
                <div onClick={() => props.handleDeleteAddress(_id)} className={styles.delete}><MdDeleteForever size={24} /></div>
            </div>
        </div>
    )
}

export default AddressCard;