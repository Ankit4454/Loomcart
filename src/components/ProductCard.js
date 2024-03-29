import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Like from './Like';
import { PiPlusThin, PiMinusThin } from "react-icons/pi";
import CartButton from './CartButton';
import { addCartItem, deleteCartItem, increment, decrement, cartSelector } from '../reducers/cartReducers';
import { useDispatch, useSelector } from 'react-redux';

function ProductCard(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
  const [present, setPresent] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [avgRating, setAvgRating] = useState('No Reviews');
  const { _id, name, price, picture, ratings, discountPrice } = props.product;

  const handleAddCart = () => {
    dispatch(addCartItem({ ...props.product, qty: 1 }));
  }

  const handleIncreaseQty = () => {
    dispatch(increment(_id));
  }

  const handleDecreaseQty = () => {
    dispatch(decrement(_id));
  }

  useEffect(() => {
    setPresent(cartItems.some(cart => cart._id === _id));
    const foundItem = cartItems.find(cart => cart._id === _id);
    if (foundItem) {
      setQuantity(foundItem.qty);
    } else {
      setQuantity(0);
    }

    if (ratings.length !== 0) {
      const totalStars = ratings.reduce((sum, rating) => sum + parseInt(rating.star), 0);
      const averageStars = totalStars / ratings.length;
      setAvgRating(averageStars.toFixed(1));
    }
  }, [cartItems, ratings, _id]);

  return (
    <div className="relative group">
      <Link to={"/products/" + _id}>
        <div className="aspect-h-1 aspect-w-1 h-[350px] w-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={picture}
            alt={name}
            loading="lazy"
            className="h-full w-full object-contain object-center mix-blend-multiply group-hover:opacity-75"
          />
        </div>
      </Link>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <Like product={props.product} />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{avgRating}</span>
          {!isNaN(avgRating) && Array.from({ length: Math.floor(avgRating) }, (_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          {!isNaN(avgRating) && avgRating % 1 !== 0 && (
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient-star">
                  <stop offset={`${(avgRating % 1) * 100}%`} stopColor="#fde047" />
                  <stop offset={`${(1 - (avgRating % 1)) * 100}%`} stopColor="white" />
                </linearGradient>
              </defs>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill={`url(#gradient-star)`}></path>
            </svg>
          )}
        </div>
        <div className="flex items-center justify-between">
          {discountPrice !== undefined ? (
            <div>
              <p className="flex items-center mt-1 text-lg font-medium text-gray-500">
                <LiaRupeeSignSolid />{discountPrice} <del className="text-xs ml-2">{price}</del>
              </p>
            </div>
          ) : (
            <p className="flex items-center mt-1 text-lg font-medium text-gray-900">
              <LiaRupeeSignSolid />{price}
            </p>
          )}

          {!present && <div className="flex items-center"> <CartButton handleAddCart={handleAddCart} /></div>}
          {present && <div className="flex items-center">
            <PiMinusThin className="mr-2 cursor-pointer" size={24} onClick={handleDecreaseQty} />
            <p className="text-xl">{quantity}</p>
            <PiPlusThin className="ml-2 cursor-pointer" size={24} onClick={handleIncreaseQty} />
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard;