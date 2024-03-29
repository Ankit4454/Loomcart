import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import NewProductCard from '../components/NewProductCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { deleteProduct, getUserProducts } from '../api';
import { BsSortNumericDown, BsSortNumericDownAlt } from "react-icons/bs";

function Product() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  const sortProducts = (productList, sortOrder) => {
    if (!sortOrder) {
      return setProductList(productList);
    }

    const sortedProducts = [...productList];
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProductList(sortedProducts);
  };

  const handleSort = (sortOrder) => {
    setSortBy(sortOrder);
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProduct(productId);

    if (response.success) {
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
      setProductList(productList => productList.filter(product => product._id !== productId));
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
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (auth.user) {
          const response = await getUserProducts(auth.user._id);
          if (response.success) {
            sortProducts(response.data.products, sortBy);
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
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [auth.user, navigate, sortBy]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative min-h-screen bg-white backdrop-blur flex flex-col items-start bg-texture bg-cover px-10 sm:py-0">
      <h1 className="text-3xl text-gray-800">Your Products</h1>
      <div className="relative w-full flex items-center justify-center">
        <Link to='/users/product/edit' className="w-full max-h-[250px] min-h-[250px] flex flex-col bg-lightTeal text-gray-600 items-center justify-center border-2 my-4 border-dashed border-teal-900 rounded-xl">
          <HiOutlineViewGridAdd size={96} />
          <h1 className="text-2xl">Add a new product</h1>
        </Link>
      </div>
      {productList.length !== 0 && <div className="flex items-center justify-end my-4">
        <p className="text-lg text-gray-900 mr-2">Sort by</p>
        <button onClick={() => handleSort('asc')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-3xl mr-2">Price - Low to High <BsSortNumericDown className="ml-2" size={24} /></button>
        <button onClick={() => handleSort('desc')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-3xl">Price - High to Low <BsSortNumericDownAlt className="ml-2" size={24} /></button>
      </div>}
      <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {productList.map((product) => (
          <NewProductCard key={product._id} product={product} handleDeleteProduct={handleDeleteProduct} />
        ))}
      </div>
    </div>
  )
}

export default Product;