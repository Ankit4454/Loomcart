import React from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";

function CheckoutCart(props) {
    const { picture, name, price, discountPrice, qty } = props.cart;

    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={picture}
                    alt={name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{name}</h3>
                        <p className="ml-4 flex items-center"><LiaRupeeSignSolid /> {discountPrice ? discountPrice : price}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                        <PiMinusThin className="mr-2 cursor-pointer" size={16} onClick={props.handleDecreaseQty} />
                        <p className="text-gray-500">{qty}</p>
                        <PiPlusThin className="ml-2 cursor-pointer" size={16} onClick={props.handleIncreaseQty} />
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={props.handleDeleteItem}
                            className="font-medium text-teal-700 hover:text-teal-800"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CheckoutCart;