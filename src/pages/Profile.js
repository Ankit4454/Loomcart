import React, { useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { FcInTransit } from "react-icons/fc";
import { FcPrivacy } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks";

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      heading: 'Login & security',
      info: 'Edit login, name, and mobile number',
      link: '/users/edit',
      icon: <FcPrivacy size={48} />
    },
    {
      id: 2,
      heading: 'Your Orders',
      info: 'Track, return, or buy things again',
      link: '/users/orders',
      icon: <FcInTransit size={48} />
    },
    {
      id: 3,
      heading: 'Your Addresses',
      info: 'Edit addresses for orders',
      link: '/users/addresses',
      icon: <FcAddressBook size={48} />
    },
    {
      id: 4,
      heading: 'Your Wishlist',
      info: 'Edit wishlist, or buy things',
      link: '/users/wishlist',
      icon: <FcLike size={48} />
    }
  ];

  useEffect(() => {
    if (!auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  return (
    <div className="relative min-h-screen bg-lime-50 backdrop-blur flex flex-col items-start bg-texture bg-cover px-10 sm:py-0">
      <h1 className="text-4xl text-gray-800">Your Account</h1>
      <div className="relative w-full flex flex-wrap items-start justify-between">
        {cards.map((card) => (
          <ProfileCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Profile;