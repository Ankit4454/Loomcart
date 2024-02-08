import React, { useState } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { updateOrder } from '../api';
import { toast } from 'react-toastify';

function OrderCard(props) {
    const { _id, productList, status, statusHistory } = props.order;
    const [saving, setSaving] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(status);
    const [updatedStatusHistory, setUpdatedStatusHistory] = useState(statusHistory);
    const total = productList.reduce((sum, product) => sum + parseInt(product.quantity * product.product.price), 0);

    function formatTimestamp(timestamp) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const date = new Date(timestamp);
        const month = months[date.getMonth()];
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();

        const suffix = dayOfMonth % 10 === 1 && dayOfMonth !== 11 ? 'st' :
            dayOfMonth % 10 === 2 && dayOfMonth !== 12 ? 'nd' :
                dayOfMonth % 10 === 3 && dayOfMonth !== 13 ? 'rd' : 'th';

        return `${dayOfWeek}, ${dayOfMonth}${suffix} ${month}`;
    }

    function addDays(timestamp, daysToAdd) {
        const date = new Date(timestamp);
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString();
    }

    const handleCancelOrder = async () => {
        setSaving(true);
        const response = await updateOrder(_id, 'Cancelled');

        if (response.success) {
            setUpdatedStatus('Cancelled');
            setUpdatedStatusHistory(response.data.order.statusHistory);
            toast.success(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setSaving(false);
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between">
                <span className="font-bold text-2xl text-gray-900 mr-5">Order #{_id.substr(_id.length - 4).toUpperCase()}</span>
                <span className="flex items-center text-gray-900">Total amount <LiaRupeeSignSolid className="ml-2" /> {total}</span>
            </div>

            <div className="flex items-center space-x-6 justify-between mt-6 mx-auto">
                {(updatedStatus === 'Delivered' || updatedStatus === 'Cancelled') && updatedStatusHistory.map((history) => (
                    <div key={history._id} className="relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                            <span className="text-xs font-medium mt-1">{history.status}</span>
                            <div className="w-3 h-3 bg-green-600 border-4 box-content border-slate-50 rounded-full"></div>
                            <span className="text-xs font-medium mt-1">{formatTimestamp(history.timestamp)}</span>
                        </div>
                        {(history.status !== 'Delivered' && history.status !== 'Cancelled') && <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-full border-t border-green-600"></div>}
                        {(history.status !== 'Order Confirmed') && <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 w-full border-t border-green-600"></div>}
                    </div>
                ))}
                {updatedStatus === 'Order Confirmed' && <><div className="relative flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                        <span className="text-xs font-medium mt-1">Order Confirmed</span>
                        <div className="w-3 h-3 bg-green-600 border-4 box-content border-slate-50 rounded-full"></div>
                        <span className="text-xs font-medium mt-1">{formatTimestamp(updatedStatusHistory[0].timestamp)}</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-full border-t border-green-600"></div>
                </div>
                    <div className="relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                            <span className="text-xs font-medium mt-1">Shipped</span>
                            <div className="w-3 h-3 bg-gray-400 border-4 box-content border-slate-50 rounded-full"></div>
                            <span className="text-xs font-medium mt-1">{formatTimestamp(addDays(updatedStatusHistory[0].timestamp, 2))}</span>
                        </div>
                        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
                    </div>
                    <div className="relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                            <span className="text-xs font-medium mt-1">Out For Delivery</span>
                            <div className="w-3 h-3 bg-gray-400 border-4 box-content border-slate-50 rounded-full"></div>
                            <span className="text-xs font-medium mt-1">{formatTimestamp(addDays(updatedStatusHistory[0].timestamp, 4))}</span>
                        </div>
                        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
                    </div>
                    <div className="relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center">
                            <span className="text-xs font-medium mt-1">Delivered</span>
                            <div className="w-3 h-3 bg-gray-400 border-4 box-content border-slate-50 rounded-full"></div>
                            <span className="text-xs font-medium mt-1">{formatTimestamp(addDays(updatedStatusHistory[0].timestamp, 6))}</span>
                        </div>
                        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 w-full border-t border-gray-400"></div>
                    </div>
                </>}
            </div>

            <div className="flex flex-col divide-y divide-gray-200">
                {productList.map((product) => (
                    <div key={product.product._id} className="flex py-6">
                        <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={product.product.picture}
                                alt={product.product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.product.name}</h3>
                                    <p className="ml-4 flex items-center"><LiaRupeeSignSolid /> {product.product.price}</p>
                                </div>
                                <p className="text-md">{product.product.description}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        to={`/products/${product.product._id}`}
                                        className="font-medium text-teal-700 hover:text-teal-800">
                                        View Product
                                    </Link>
                                    <span className="mx-2 text-gray-500">|</span>
                                    {(updatedStatus === 'Delivered' || updatedStatus === 'Cancelled') && <Link
                                        to={`/checkout/${product.product._id}`}
                                        className="font-medium text-teal-700 hover:text-teal-800">
                                        Buy Again
                                    </Link>}
                                    {updatedStatus === 'Order Confirmed' && <button
                                        type="button"
                                        onClick={handleCancelOrder}
                                        disabled={saving}
                                        className="font-medium text-teal-700 hover:text-teal-800">
                                        {saving ? 'Cancelling' : 'Cancel'}
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default OrderCard;