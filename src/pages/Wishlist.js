import React from 'react';
import { useSelector } from 'react-redux';
import { wishlistSelector } from '../reducers/wishlistReducers';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const wishlist = useSelector(wishlistSelector);

  return (
    <div className="relative min-h-screen bg-white backdrop-blur flex flex-col items-start bg-texture bg-cover px-10 sm:py-0">
      <h1 className="text-3xl text-gray-800">Your Wishlist</h1>
      <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {wishlist.length === 0 && <div className="w-full flex flex-col items-center">
        <span className="text-gray-900 text-2xl">Your wishlist is empty!</span>
        <span className="text-gray-900 text-xl">Add item to it.</span>
      </div>}
    </div>
  )
}

export default Wishlist;