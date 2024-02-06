import React, { useState, useRef, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";

function CartSidebar(props) {
    const sidebarRef = useRef(null);
    const products = [
        {
            id: 1,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '90',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        },
        {
            id: 2,
            name: 'Medium Stuff Satchel',
            href: '#',
            color: 'Blue',
            price: '32',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
    ];

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
            {products.length === 0 && <div className="text-center p-4">
                <h2 className="text-lg">Your cart is empty!</h2>
                <p className="text-sm">Add item to it.</p>
            </div>}
            <div className="p-4">
                <ul className="-my-6 divide-y divide-gray-200 max-h-[380px] overflow-y-scroll no-scrollbar">
                    {products.map((product) => (
                        <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4 flex items-center"><LiaRupeeSignSolid /> {product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center">
                                        <PiMinusThin className="mr-2 cursor-pointer" size={16} />
                                        <p className="text-gray-500">{product.quantity}</p>
                                        <PiPlusThin className="ml-2 cursor-pointer" size={16} />
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="font-medium text-teal-700 hover:text-teal-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {products.length !== 0 ?
            <div className="border-t border-gray-200 p-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p className="flex items-center"><LiaRupeeSignSolid /> 262.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
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