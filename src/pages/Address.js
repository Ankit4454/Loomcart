import React, { useEffect, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import AddressCard from '../components/AddressCard';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks";
import { getAddressList, deleteAddress } from '../api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Address() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteAddress = async (addressId) => {
    const response = await deleteAddress(addressId);

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
      setAddressList(addressList => addressList.filter(address => address._id !== addressId));
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
          const response = await getAddressList(auth.user._id);
          if (response.success) {
            setAddressList(response.data.addressList);
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
  }, [auth.user, navigate]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative min-h-screen bg-white backdrop-blur flex flex-col items-start bg-texture bg-cover px-10 sm:py-0">
      <h1 className="text-3xl text-gray-800">Your Addresses</h1>
      <div className="relative w-full flex flex-wrap items-start">
        <Link to="/users/addresses/edit" className="max-w-[320px] min-w-[320px] max-h-[300px] min-h-[300px] flex flex-col bg-lightTeal text-gray-600 items-center justify-center border-2 m-4 border-dashed border-teal-900 rounded-xl">
          <FiPlus size={96} />
          <h1 className="text-3xl">Add address</h1>
        </Link>
        {addressList.map((address) => (
          <AddressCard key={address._id} address={address} handleDeleteAddress={handleDeleteAddress} />
        ))}
      </div>
    </div>
  )
}

export default Address;