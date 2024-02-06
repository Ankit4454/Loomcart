import React from 'react';
import home from '../images/home.jpg';
import CategoryCard from '../components/CategoryCard';
import { FcElectronics, FcBusiness, FcSportsMode   } from "react-icons/fc";
import { SiAirtable } from "react-icons/si";
import { GiClothesline } from "react-icons/gi";

function Home() {
  const category = [
    {
      name: 'Electronic',
      svg: <FcElectronics size={80} />,
      link: '/category/fashion'
    },
    {
      name: 'Travel',
      svg: <FcBusiness  size={80} />,
      link: '/category/fashion'
    },
    {
      name: 'Furniture',
      svg: <SiAirtable size={80} />,
      link: '/category/fashion'
    },
    {
      name: 'Fashion',
      svg: <GiClothesline size={80} />,
      link: '/category/fashion'
    },
    {
      name: 'Sports',
      svg: <FcSportsMode  size={80} />,
      link: '/category/fashion'
    },
    {
      name: 'Beauty',
      svg: <FcElectronics size={80} />,
      link: '/category/fashion'
    },
  ];

  return (
    <div className="relative min-h screen bg-center">
      <div className="relative flex items-center justify-center">
        <img src={home} alt="Home page" className="w-full" />
        <div className="absolute inset-0 flex px-10">
          <div className="relative flex flex-col items-start justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Products</h1>
            <p className="text-lg mb-6">Explore a wide range of products curated just for you.</p>
            <button className="bg-teal-700 text-white py-2 px-6 rounded-3xl hover:bg-teal-800">Learn More</button>
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="flex flex-col">
          <h1 className="pt-10 text-2xl font-bold text-gray-800">Shop Our Top Categories</h1>
          <div className="flex flex-wrap py-6 items-center justify-between gap-5">
            {category.map((cat)=>(
              <CategoryCard key={cat.name} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;