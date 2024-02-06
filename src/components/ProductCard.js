import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Like from './Like';
import { PiPlusThin, PiMinusThin } from "react-icons/pi";

function ProductCard(props) {
  const [avgRating, setAvgRating] = useState('No Reviews');
  const { _id, name, price, picture, ratings } = props.product;

  useEffect(() => {
    if (ratings.length !== 0) {
      const totalStars = ratings.reduce((sum, rating) => sum + parseInt(rating.star), 0);
      const averageStars = totalStars / ratings.length;
      setAvgRating(averageStars.toFixed(1));
    }
  }, [ratings]);

  return (
    <div className="relative group">
      <Link to={"/products/" + _id}>
        <div className="aspect-h-1 aspect-w-1 h-[350px] w-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={picture}
            alt={name}
            className="h-full w-full object-contain object-center mix-blend-multiply group-hover:opacity-75"
          />
        </div>
      </Link>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <Like />
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
          <p className="flex items-center mt-1 text-lg font-medium text-gray-900"><LiaRupeeSignSolid />{price}</p>
          <div className="flex items-center">
            <PiMinusThin className="mr-2 cursor-pointer" size={24} />
            <p className="text-2xl">0</p>
            <PiPlusThin className="ml-2 cursor-pointer" size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;