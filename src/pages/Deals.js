import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllProducts } from '../api';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";

function Deals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  const sortProducts = (productList, sortOrder) => {
    if (!sortOrder) {
      return setProducts(productList);
    }

    const sortedProducts = [...productList];
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  const handleSort = (sortOrder) => {
    setSortBy(sortOrder);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllProducts();
        if (response.success) {
          const productList = response.data.products.filter(product => product.discountPrice !== undefined);;
          sortProducts(productList, sortBy);
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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sortBy]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-white backdrop-blur bg-texture bg-cover px-10">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl text-gray-800">Today's Deals</h1>
        <div className="flex items-center justify-end my-4">
          <p className="text-lg text-gray-900 mr-2">Sort by</p>
          <button onClick={() => handleSort('asc')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-3xl mr-2">Price - Low to High <BsSortNumericDown className="ml-2" size={24} /></button>
          <button onClick={() => handleSort('desc')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-3xl">Price - High to Low <BsSortNumericDownAlt className="ml-2" size={24} /></button>
        </div>
      </div>
      <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Deals;