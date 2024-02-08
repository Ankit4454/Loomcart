import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../hooks';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUsersOrders } from '../api';

function Order() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (auth.user) {
          const response = await getUsersOrders(auth.user._id);
          if (response.success) {
            setOrders(response.data.orders);
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
      <h1 className="text-3xl text-gray-800">Your Orders</h1>
      <p className="mt-2 text-gray-500">Check the status of recent orders, manage returns, and discover similar products.</p>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-8 gap-x-10 gap-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default Order;