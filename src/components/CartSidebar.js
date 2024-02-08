import React, { useState, useRef, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { cartSelector } from '../reducers/cartReducers';

function CartSidebar(props) {
    const sidebarRef = useRef(null);
    const cartItems = useSelector(cartSelector);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                if (props.open) {
                    props.toggleCartBtn();
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [props]);

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, cart) => {
            return acc + cart.price * cart.qty;
        }, 0);
        setTotal(newTotal);
        // if (!props.open) {
        //     props.toggleCartBtn();
        // }
    }, [cartItems]);

    return (
        <div ref={sidebarRef}
            className={`fixed h-full right-0 w-96 bg-white z-50 overflow-y-auto transform transition-transform ease-in-out duration-300 ${props.open ? 'translate-x-0' : 'translate-x-full'
                }`}>
            <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                    onClick={props.toggleCartBtn}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <IoCloseOutline size={24} />
                </button>
            </div>
            {cartItems.length === 0 && <div className="text-center p-4">
                <h2 className="text-lg">Your cart is empty!</h2>
                <p className="text-sm">Add item to it.</p>
            </div>}
            <div className="p-4">
                <ul className="-my-6 divide-y divide-gray-200 max-h-[380px] overflow-y-scroll no-scrollbar">
                    {cartItems.map((product) => (
                        <Cart key={product._id} cart={product} />
                    ))}
                </ul>
            </div>
            {cartItems.length !== 0 ?
                <div className="border-t border-gray-200 p-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p className="flex items-center"><LiaRupeeSignSolid /> {total}</p>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            onClick={props.toggleCartBtn}
                            className="flex items-center justify-center rounded-md border border-transparent bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-800"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                            <button
                                type="button"
                                className="font-medium text-teal-700 hover:text-teal-800"
                                onClick={props.toggleCartBtn}
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div> :
                <div className="border-t border-gray-200 p-4 sm:px-6">
                    <div className="mt-6">
                        <div
                            onClick={props.toggleCartBtn}
                            className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-800"
                        >
                            Shop now
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default CartSidebar;