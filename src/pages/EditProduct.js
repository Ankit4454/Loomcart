import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../hooks";
import { toast } from 'react-toastify';
import { createProduct, updateProduct, getProduct } from '../api';
import Loader from '../components/Loader';
import { FcAddImage } from "react-icons/fc";
import { TbHttpDelete } from "react-icons/tb";

function EditProduct() {
  const auth = useAuth();
  const [productId, setProductId] = useState();
  const [userId, setUserId] = useState(auth.user?._id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('default');
  const [picture, setPicture] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const categoryOptions = [
    { optValue: 'Electronics', optText: 'Electronics' },
    { optValue: 'Fashion', optText: 'Fashion' },
    { optValue: 'Home and Furniture', optText: 'Home and Furniture' },
    { optValue: 'Beauty and Personal Care', optText: 'Beauty and Personal Care' },
    { optValue: 'Sports and Outdoors', optText: 'Sports and Outdoors' },
    { optValue: 'Books and Stationery', optText: 'Books and Stationery' },
    { optValue: 'Toys and Games', optText: 'Toys and Games' },
    { optValue: 'Health and Wellness', optText: 'Health and Wellness' },
    { optValue: 'Automotive', optText: 'Automotive' },
    { optValue: 'Electrical Appliances', optText: 'Electrical Appliances' },
    { optValue: 'Jewelry and Watches', optText: 'Jewelry and Watches' },
    { optValue: 'Food and Groceries', optText: 'Food and Groceries' },
    { optValue: 'Pet Supplies', optText: 'Pet Supplies' },
    { optValue: 'Art and Craft Supplies', optText: 'Art and Craft Supplies' },
    { optValue: 'Garden and Outdoor Living', optText: 'Garden and Outdoor Living' },
    { optValue: 'Travel and Luggage', optText: 'Travel and Luggage' },
    { optValue: 'Fitness and Sports Equipment', optText: 'Fitness and Sports Equipment' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteImage = () => {
    setPicture(null);
    setImagePreview(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!name || !description || !price || !category || !imagePreview) {
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

    const method = isUpdate ? updateProduct(productId, name, description, price, category, picture) : createProduct(userId, name, description, price, category, picture)
    const response = await method;

    if (response.success) {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setPicture(null);
      navigate('/users/product');
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

  useEffect(() => {
    async function fetchData() {
      try {
        if (auth.user) {
          if (id) {
            setIsUpdate(true);
            const response = await getProduct(id);
            if (response.success) {
              const product = response.data.product;
              setProductId(product._id);
              setName(product.name);
              setDescription(product.description);
              setPrice(product.price);
              setCategory(product.category);

              setImagePreview(product.picture);
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
  }, [auth.user, navigate, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-white backdrop-blur bg-texture bg-cover px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add a new product</h2>
      </div>
      <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit} className="mx-auto mt-4 max-w-xl">
        <input
          type="hidden"
          name="user"
          id="user"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                id="description"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-semibold leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="price"
                id="price"
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2.5">
              <select
                id="category"
                name="category"
                autoComplete="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="default" disabled>Please select</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.optValue} value={cat.optValue}>{cat.optText}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="picture" className="block text-sm font-medium leading-6 text-gray-900">
              Product picture
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-60 mx-auto rounded-lg"
                  />
                  <button
                    className="absolute -top-3 -right-3 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                    onClick={() => handleDeleteImage()}
                  >
                    <TbHttpDelete />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FcAddImage className="mx-auto" size={48} />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="picture"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-teal-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-700 focus-within:ring-offset-2 hover:text-teal-800"
                    >
                      <span>Upload a file</span>
                      <input id="picture" name="picture" type="file" className="sr-only" onChange={handleImageChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={saving}
            className="block w-full rounded-md bg-teal-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
          >
            {saving ? isUpdate ? 'Updating product...' : 'Adding product...' : isUpdate ? 'Update product' : 'Add product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct;