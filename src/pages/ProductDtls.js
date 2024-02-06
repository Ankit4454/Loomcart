import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { createRating, deleteRating, getProduct, updateRating } from '../api';
import { useAuth } from "../hooks";
import Like from '../components/Like';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";

function ProductDtls() {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addReview, setAddReview] = useState(false);
  const [star, setStar] = useState(null);
  const [review, setReview] = useState('');
  const [userId, setUserId] = useState(auth.user?._id);
  const [productId, setProductId] = useState(id);
  const [saving, setSaving] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [ratingId, setRatingId] = useState(null);
  const [ratingList, setRatingList] = useState([]);
  const [avgRating, setAvgRating] = useState('No Reviews');

  const handleStarClick = (value) => {
    setStar(value);
  };

  const handleStarHover = (value) => {
    setStar(value);
  };

  const handleMouseLeave = () => {
    setStar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!star || !review) {
      setSaving(false);
      return toast.error("Please fill mandatory fields", {
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

    const method = isUpdate ? updateRating(ratingId, star, review) : createRating(userId, productId, star, review)
    const response = await method;

    if (response.success) {
      setStar(null);
      setReview('');
      const updatedRatingList = isUpdate
        ? ratingList.map((rating) => (rating._id === ratingId ? { ...response.data.rating, user: auth.user } : rating))
        : [{ ...response.data.rating, user: auth.user }, ...ratingList];
      setRatingList(updatedRatingList);
      setAddReview(false);
      const totalStars = updatedRatingList.reduce((sum, rating) => sum + parseInt(rating.star), 0);
      const averageStars = totalStars / updatedRatingList.length;
      setAvgRating(averageStars.toFixed(1));
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

  const handleUpdateRating = (rating) => {
    setIsUpdate(true);
    setAddReview(true);
    setRatingId(rating._id);
    setStar(rating.star);
    setReview(rating.review);
  }

  const handleDeleteRating = async (ratingIdx) => {
    const response = await deleteRating(ratingIdx);

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
      setRatingList(prevRatingList => {
        const updatedRatingList = prevRatingList.filter((rating) => rating._id !== ratingIdx);
        const totalStars = updatedRatingList.reduce((sum, rating) => sum + parseInt(rating.star), 0);
        if (updatedRatingList.length !== 0) {
          const averageStars = totalStars / updatedRatingList.length;
          setAvgRating(averageStars.toFixed(1));
        } else{
          setAvgRating('No Reviews');
        }
        return updatedRatingList;
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
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await getProduct(id);
          if (response.success) {
            setProduct(response.data.product);
            setRatingList(response.data.product.ratings);
            if (response.data.product.ratings.length !== 0) {
              const totalStars = response.data.product.ratings.reduce((sum, rating) => sum + parseInt(rating.star), 0);
              const averageStars = totalStars / response.data.product.ratings.length;
              setAvgRating(averageStars.toFixed(1));
            }
          } else {
            navigate(-1);
            return toast.error(response.message, {
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
          setUserId(auth.user?._id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [auth.user, id, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-10 mx-auto py-6">
      <div className="relative flex flex-col items-start">
        <img
          alt="Product"
          className="aspect-square object-contain w-full rounded-lg overflow-hidden dark:border-gray-800"
          height={600}
          src={product.picture}
          width={600}
        />
        <div className="absolute top-0 right-0">
          <Like />
        </div>
        <div className="flex w-full my-6">
          <button type="button" className="w-1/2 mr-6 flex items-center justify-center rounded-md border border-transparent bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-800">Add to Cart</button>
          <button type="button" className="w-1/2 flex items-center justify-center rounded-md border border-transparent bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-800">Buy Now</button>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start max-h-[600px] overflow-y-scroll no-scrollbar">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <p>{product.description}</p>
          <div className="mb-2 flex items-center">
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
          <div className="flex items-center text-4xl font-bold"><LiaRupeeSignSolid /> {product.price}</div>
        </div>
        <div className="grid gap-4 md:gap-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">Customer Reviews</h2>
            {auth.user &&
              <button type="button" className="font-medium text-teal-700 hover:text-teal-800" onClick={() => { setAddReview(!addReview); setStar(null); setReview(''); setIsUpdate(false); setRatingId(null); }}>Add a review</button>
            }
          </div>
          {(auth.user && addReview) && <form method="POST" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="user"
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="hidden"
              name="productId"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="star" className="block text-sm font-semibold leading-6 text-gray-900">
                  Rate this product
                </label>
                <div className="mt-2.5 flex items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="star"
                        value={value}
                        checked={star === value}
                        onChange={() => handleStarClick(value)}
                        onMouseEnter={() => handleStarHover(value)}
                        onMouseLeave={handleMouseLeave}
                        className="hidden"
                      />
                      <svg
                        aria-hidden="true"
                        className={`h-8 w-8 hover:text-yellow-300 ${star && star >= value ? 'text-yellow-300' : 'text-gray-300'
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </label>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                  Review this product
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="review"
                    id="review"
                    autoComplete="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => { setAddReview(!addReview); setStar(null); setReview(''); setIsUpdate(false); setRatingId(null); }}
                className="block mr-6 rounded-md bg-teal-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="block rounded-md bg-teal-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                {saving ? isUpdate ? 'Updating...' : 'Submitting...' : isUpdate ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>}
          {isNaN(avgRating) && <div className="flex items-center justify-center">
            <p className="text-teal-700">Be the first to Review this product</p>
          </div>}
          {ratingList.map((rating) => (
            <div key={rating._id} className="flex items-start justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
              <div>
                <h3 className="font-medium">{rating.user.name}</h3>
                <div className="flex items-center">
                  <span className={`flex items-center mr-2 text-white rounded px-2.5 py-0.5 text-xs font-semibold ${rating.star >= 3 ? 'bg-green-700' : rating.star === 2 ? 'bg-orange-500' : 'bg-red-600'}`}>{rating.star}<svg aria-hidden="true" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg></span>
                  <p className="text-sm text-gray-500">{rating.review}</p>
                </div>
              </div>
              {(userId === rating.user._id) &&
                <div className="flex items-center">
                  <CiEdit className="cursor-pointer mr-1" size={20} onClick={() => { handleUpdateRating(rating) }} />
                  |
                  <MdOutlineDeleteForever className="cursor-pointer ml-1" size={20} onClick={() => { handleDeleteRating(rating._id) }} />
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDtls;